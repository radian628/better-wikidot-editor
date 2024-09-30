import { createRoot } from "react-dom/client";
import { MultisaveDialog } from "./multisave";
import React from "react";

/*!
// ==UserScript==
// @name        Wikidot File Multisave 
// @match       *://*.wikidot.com/*
// @grant       none
// @version     1.0
// @author      radian628
// @description Upload multiple files to wikidot at once. 
// ==/UserScript==
*/

const interval = setInterval(() => {
  // get the file button
  const filesButton = document.getElementById("files-button") as HTMLElement;
  if (!filesButton || filesButton.dataset.isClone) return;

  // replace files button with a clone with no listeners attached to it
  const buttonClone = filesButton.cloneNode(true) as HTMLElement;
  buttonClone.dataset.isClone = "true";
  filesButton.parentElement?.insertBefore(buttonClone, filesButton);
  filesButton.parentElement?.removeChild(filesButton);

  // add listener that will open the custom file dialog
  buttonClone.addEventListener("click", () => {
    const root = document.createElement("div");
    document.body.appendChild(root);
    createRoot(root).render(
      <MultisaveDialog
        exit={() => {
          document.body.removeChild(root);
        }}
      ></MultisaveDialog>
    );
  });
}, 0);
