import { createBrowserRouter } from "react-router-dom";
import Gallery from "../pages/Gallery";
import Drawing from "../pages/Drawing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Gallery />,
  },
  {
    path: "/board",
    element: <Drawing />,
  },
]);

export default router;
