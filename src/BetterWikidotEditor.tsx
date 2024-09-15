import React, { useState } from "react";
import { Editor } from "./editor/Editor";

export function BetterWikidotEditor() {
  const [text, setText] = useState("asdf");
  return <Editor text={text} setText={setText}></Editor>;
}
