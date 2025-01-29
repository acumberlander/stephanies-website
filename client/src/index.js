import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ErrorBoundary } from "react-error-boundary";

import App from "./App";
import { ErrorPage } from "./components";
import { StrictMode } from "react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ErrorBoundary fallback={<ErrorPage />}>
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </ErrorBoundary>
);
