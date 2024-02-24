import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { BoardType } from "../pages/Gallery";

type BoardProp = {
  currentSize: number;
  currentColor: string;
  clearBoardKey: number;
  boardData: BoardType | null;
};

const Board = ({
  currentColor,
  currentSize,
  clearBoardKey,
  boardData,
}: BoardProp) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    const newSocket = io("https://coop-board-server.adaptable.app");
    console.log(newSocket, "Connected to socket");
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (boardData && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Clear the canvas before drawing the new image
      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      const image = new Image();
      image.onload = () => {
        // Draw the image on the canvas
        ctx?.drawImage(image, 0, 0);
      };

      // Set the image source to the data URL
      image.src = boardData.content;
    }
  }, [boardData]);

  useEffect(() => {
    if (socket) {
      socket.on("canvasImage", (data) => {
        const image = new Image();
        image.src = data;

        console.log("canvasImage");

        const canvas = canvasRef.current;

        const ctx = canvas?.getContext("2d");
        image.onload = () => {
          ctx?.drawImage(image, 0, 0);
        };
      });

      socket.on("clearCanvas", () => {
        console.log("clearCanvas");
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
      });
    }
  }, [socket]);

  useEffect(() => {
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e: { offsetX: number; offsetY: number }) => {
      isDrawing = true;

      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

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

    const endDrawing = () => {
      const canvas = canvasRef.current;
      const dataURL = canvas?.toDataURL();

      if (socket && boardData) {
        socket.emit("canvasImage", { boardId: boardData._id, data: dataURL });
        console.log("drawing ended");
      }
      isDrawing = false;
    };

    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const ctx = canvasRef.current?.getContext("2d");

    if (ctx) {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = currentSize;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }

    canvas?.addEventListener("mousedown", startDrawing);
    canvas?.addEventListener("mousemove", draw);
    canvas?.addEventListener("mouseup", endDrawing);
    canvas?.addEventListener("mouseout", endDrawing);

    return () => {
      canvas?.removeEventListener("mousedown", startDrawing);
      canvas?.removeEventListener("mousemove", draw);
      canvas?.removeEventListener("mouseup", endDrawing);
      canvas?.removeEventListener("mouseout", endDrawing);
    };
  }, [currentColor, currentSize, socket]);

  useEffect(() => {
    if (clearBoardKey) {
      if (socket) {
        socket.emit("clearCanvas");
      }

      const canvas: HTMLCanvasElement | null = canvasRef.current;
      const ctx = canvasRef.current?.getContext("2d");

      setTimeout(() => {
        ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
        const dataURL = canvas?.toDataURL();

        if (socket) {
          socket.emit("canvasImage", dataURL);
          console.log("Cleared board and emitted canvasImage");
        }
      }, 500);
    }
  }, [clearBoardKey, socket]);

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
