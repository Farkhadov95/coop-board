import { createBrowserRouter } from "react-router-dom";
import Gallery from "../pages/Gallery";
import BoardPage from "../pages/BoardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Gallery />,
  },
  {
    path: "/board/:id",
    element: <BoardPage />,
  },
]);

export default router;
