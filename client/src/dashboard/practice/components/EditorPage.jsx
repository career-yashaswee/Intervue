import React, { useEffect, useRef } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import ACTIONS from "@/shared/Actions";

const MonacoEditor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null); // Reference to store Monaco editor instance
  const monaco = useMonaco(); // Access to the Monaco instance

  useEffect(() => {
    if (monaco) {
      console.log("Monaco instance is ready");

      // Define a custom theme if needed
      // monaco.editor.defineTheme("myCustomTheme", {
      //   base: "vs-dark",
      //   inherit: true,
      //   rules: [
      //     { background: "1E1E1E" },
      //     { token: "comment", foreground: "6A9955" },
      //     { token: "keyword", foreground: "569CD6" },
      //   ],
      //   colors: {
      //     "editor.background": "#1E1E1E",
      //   },
      // });

      // Set the theme
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
      if (socketRef?.current) {
        socketRef?.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code,
        });
      }
    });
  };

  useEffect(() => {
    if (socketRef?.current) {
      // Listen for changes from other users
      socketRef?.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        console.log(code);
        if (code !== null && editorRef.current) {
          // Update the editor content without triggering the change event again
          const currentValue = editorRef.current.getValue();
          console.log(currentValue);
          if (currentValue !== code) {
            editorRef.current.setValue(code);
          }
        }
      });
    }

    return () => {
      // Cleanup the socket listener on unmount
      // socketRef?.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef?.current]);

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
