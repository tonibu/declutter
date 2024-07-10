import React from "react";
import ReactDOM from "react-dom/client";
import App from "./containers/App";
import auth from "./lib/auth";

try {
  await auth.init();
} catch (error) {
  // fatal error
  console.error(error);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
