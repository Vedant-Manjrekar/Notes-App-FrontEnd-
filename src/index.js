import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import updateSlice from "./features/updateSlice";
import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./features/themeSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore({
  reducer: {
    update: updateSlice,
    theme: themeSlice,
  },
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
