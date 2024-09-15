import React, { useState } from "react";
import { Editor } from "./editor/Editor";
import "./BetterWikidotEditor.less";

export function BetterWikidotEditor() {
  const [text, setText] = useState("asdf");
  return (
    <div className="better-wikidot-editor-container">
      <div className="editor-container">
        <Editor text={text} setText={setText}></Editor>
      </div>
      <div className="preview-container"></div>
    </div>
  );
}
