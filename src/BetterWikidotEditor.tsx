import React, { useEffect, useState } from "react";
import { Editor } from "./editor/Editor";
import "./BetterWikidotEditor.less";

export function BetterWikidotEditor() {
  const [text, setText] = useState("asdf");
  const [doesEditorExist, setDoesEditorExist] = useState(false);

  useEffect(() => {
    if (doesEditorExist) return;

    const interval = setInterval(() => {
      const textarea = document.querySelector(
        "textarea#edit-page-textarea"
      ) as HTMLTextAreaElement | null;

      if (textarea) {
        setDoesEditorExist(true);
        setText(textarea.value);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [doesEditorExist]);

  if (!doesEditorExist) return <></>;

  return (
    <div className="better-wikidot-editor-container">
      <div className="editor-container">
        <Editor text={text} setText={setText}></Editor>
      </div>
      <div className="preview-container">
        <iframe className="page-preview" src={window.location.href}></iframe>
      </div>
    </div>
  );
}
