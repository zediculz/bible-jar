import React from "react"
import ReactDOM from "react-dom/client"
import "./css/app.css"

import AppContextProvider from "./ctx"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import HomeLayout from "./app/index";
import SettingLayout from "./app/settings"
import AboutLayout from "./app/about"
import BookmarkLayout from "./app/bookmarks"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },

  {
    path: "/settings",
    element: <SettingLayout />,
  },

  {
    path: "/bookmark",
    element: <BookmarkLayout />,
  },
  {
    path: "/about",
    element: <AboutLayout />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>,
);
