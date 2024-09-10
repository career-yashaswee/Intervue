import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./context/GeminiContext.jsx";
import ChatBotFAB from "./components/chatbot/ChatBotFAB.jsx";

const currentPath = window.location.pathname;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
      <ChatBotFAB currentPath={currentPath} />;
    </ContextProvider>
  </React.StrictMode>
);
