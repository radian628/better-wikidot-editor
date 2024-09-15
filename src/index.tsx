/*!
// ==UserScript==
// @name        Better Wikidot Editor 
// @match       *://*.wikidot.com/*
// @grant       none
// @version     1.0
// @author      radian628
// @description A better wikidot editor.
// ==/UserScript==
*/
import { createRoot } from "react-dom";
import { BetterWikidotEditor } from "./BetterWikidotEditor";
import React from "react";
import { save } from "./save/save";

const root = document.createElement("div");

document.body.appendChild(root);

const reactRoot = createRoot(root);

reactRoot.render(<BetterWikidotEditor></BetterWikidotEditor>);

const editorStylesheet = document.createElement("link");
editorStylesheet.rel = "stylesheet";
editorStylesheet.href =
  "https://radian628.github.io/better-wikidot-editor/build/index.css";

document.head.appendChild(editorStylesheet);

//@ts-ignore
window.wikidotSaveTest = save;
