import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.scss";

const root = document.getElementById("root");
root &&
  ReactDOM.createRoot(root).render(
    <React.Suspense>
      <BrowserRouter>
        <MantineProvider
          theme={{
            colors: {
              brand: [
                "#fbf5e8",
                "#efe6df",
                "#d7ccc4",
                "#bfb0a5",
                "#aa988b",
                "#9d897a",
                "#988170",
                "#856f5e",
                "#776251",
                "#6a5341",
              ],
            },
            primaryColor: "brand",
          }}
        >
          <App />
        </MantineProvider>
      </BrowserRouter>
    </React.Suspense>,
  );
