import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import BrewContext from "./store/brew-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrewContext.Provider
      value={{
        query: "",
        page: 1,
        favorites: [],
      }}
    >
      <App />
    </BrewContext.Provider>
  </React.StrictMode>
);
