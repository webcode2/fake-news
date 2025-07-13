import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import ChatInterface from "./pages/chatInterface";
import DefaultScreen from "./pages/layout/DefaultScreen";
// import { siteUrl } from "./store/BaseData";



let router = createBrowserRouter([
  {
    path: "/", element: <DefaultScreen />, children: [{ index: true, element: <ChatInterface /> },]
  },


]);

export default router;
