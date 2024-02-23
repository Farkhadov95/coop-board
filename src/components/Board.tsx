import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

type BoardProp = {
  currentSize: number;
  currentColor: string;
  clearBoardKey: number;
};

const Board = ({ currentColor, currentSize, clearBoardKey }: BoardProp) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    const newSocket = io("https://coop-board-server.adaptable.app");
    console.log(newSocket, "Connected to socket");
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (socket) {
      // Event listener for receiving canvas data from the socket
      socket.on("canvasImage", (data) => {
        // Create an image object from the data URL
        const image = new Image();
        image.src = data;

        const canvas = canvasRef.current;

        const ctx = canvas?.getContext("2d");
        // Draw the image onto the canvas
        image.onload = () => {
          ctx?.drawImage(image, 0, 0);
        };
      });
    }
  }, [socket]);

  useEffect(() => {
    // Variables to store drawing state
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e: { offsetX: number; offsetY: number }) => {
      isDrawing = true;

      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    // Function to draw
    const draw = (e: { offsetX: number; offsetY: number }) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }

      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    // Function to end drawing
    const endDrawing = () => {
      const canvas = canvasRef.current;
      const dataURL = canvas?.toDataURL(); // Get the data URL of the canvas content

      // Send the dataURL or image data to the socket
      // console.log('drawing ended')
      if (socket) {
        socket.emit("canvasImage", dataURL);
        console.log("drawing ended");
      }
      isDrawing = false;
    };

    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const ctx = canvasRef.current?.getContext("2d");

    // Set initial drawing styles
    if (ctx) {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = currentSize;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
    // Event listeners for drawing
    canvas?.addEventListener("mousedown", startDrawing);
    canvas?.addEventListener("mousemove", draw);
    canvas?.addEventListener("mouseup", endDrawing);
    canvas?.addEventListener("mouseout", endDrawing);

    return () => {
      // Clean up event listeners when component unmounts
      canvas?.removeEventListener("mousedown", startDrawing);
      canvas?.removeEventListener("mousemove", draw);
      canvas?.removeEventListener("mouseup", endDrawing);
      canvas?.removeEventListener("mouseout", endDrawing);
    };
  }, [currentColor, currentSize, socket]);

  useEffect(() => {
    if (clearBoardKey) {
      console.log("works");
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
    }
  }, [clearBoardKey]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ backgroundColor: "white", width: "100%", height: "95vh" }}
    />
  );
};

export default Board;
