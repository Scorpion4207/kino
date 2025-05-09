import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Kinopoisk } from "./kinopoisk.tsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Данный элемент отсутсвует");
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Kinopoisk />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
