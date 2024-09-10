import React, { useEffect, useRef, useState } from "react";
import SideBar from "./SideBar";
import EditorPage from "./EditorPage";
import {
  useParams,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { initSocket } from "@/helpers/socket";
import ACTIONS from "@/shared/Actions";
import { toast } from "sonner";
import io from "socket.io-client";
function EditorPageLayout() {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      // socketRef.current?.disconnect();
      // socketRef.current?.off(ACTIONS.JOINED);
      // socketRef.current?.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }

  function leaveRoom() {
    reactNavigator("/dashboard");
  }

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-cols">
      <SideBar
        clients={clients}
        copyRoomId={copyRoomId}
        leaveRoom={leaveRoom}
      />
      <EditorPage
        socketRef={socketRef}
        roomId={roomId}
        onCodeChange={(code) => {
          codeRef.current = code;
        }}
      />
    </div>
  );
}

export default EditorPageLayout;
