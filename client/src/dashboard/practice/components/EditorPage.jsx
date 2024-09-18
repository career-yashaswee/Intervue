import React, { useEffect, useRef } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import ACTIONS from "@/shared/Actions";

const MonacoEditor = ({ socketRef, roomId, onCodeChange, userId }) => {
  const editorRef = useRef(null); // Reference to store Monaco editor instance
  const monaco = useMonaco(); // Access to the Monaco instance

  // Define cursor colors for different users
  const userCursorColors = {
    user1: "red",
    user2: "blue",
    user3: "green",
    // Add more users and colors as needed
  };

  useEffect(() => {
    if (monaco) {
      console.log("Monaco instance is ready");

      // Set custom theme if needed
      // monaco.editor.defineTheme("myCustomTheme", { ... });
      // monaco.editor.setTheme("myCustomTheme");
    }
  }, [monaco]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor; // Store the editor instance
    console.log("Editor instance mounted:", editor);

    // Handle changes in the editor
    editor.onDidChangeModelContent((event) => {
      const code = editor.getValue();
      onCodeChange(code); // Notify parent component of the code change

      // Emit the code change to other users via socket
      if (socketRef.current) {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code,
        });
      }
    });
  };

  useEffect(() => {
    const handleCodeChange = ({ code, userId, cursorPosition }) => {
      console.log(code);
      if (code !== null && editorRef.current) {
        // Update the editor content without triggering the change event again
        const currentValue = editorRef.current.getValue();
        console.log(currentValue);
        if (currentValue !== code) {
          editorRef.current.setValue(code);
        }
      }

      // Update cursor position and color
      if (editorRef.current && cursorPosition) {
        const color = userCursorColors[userId] || "black"; // Default color if user ID not found
        const model = editorRef.current.getModel();
        const position = new monaco.Position(
          cursorPosition.lineNumber,
          cursorPosition.column
        );
        const range = new monaco.Range(
          cursorPosition.lineNumber,
          cursorPosition.column,
          cursorPosition.lineNumber,
          cursorPosition.column
        );

        editorRef.current.deltaDecorations(
          [],
          [
            {
              range: range,
              options: {
                isWholeLine: false,
                className: `cursor-${color}`,
              },
            },
          ]
        );
      }
    };

    if (socketRef.current) {
      // Listen for changes from other users
      socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);
    }

    return () => {
      // Cleanup the socket listener on unmount
      if (socketRef?.current) {
        socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
      }
    };
  }, [socketRef, roomId, monaco]); // Add monaco as a dependency

  return (
    <div className="h-screen w-full">
      <Editor
        height="100%"
        width="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        onMount={handleEditorDidMount} // Capture the editor instance on mount
      />
    </div>
  );
};

export default MonacoEditor;
