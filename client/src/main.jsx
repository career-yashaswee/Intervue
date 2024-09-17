import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./context/GeminiContext.jsx";
import ChatBotFAB from "./components/chatbot/ChatBotFAB.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
      <ChatBotFAB currentPath={window.location.pathname} />;
    </ContextProvider>
  </React.StrictMode>
);
