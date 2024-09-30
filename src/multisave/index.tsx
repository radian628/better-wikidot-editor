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
  const filesClick = WIKIDOT?.page?.listeners?.filesClick;

  console.log("a");
  if (filesClick as any) {
    console.log("b");
    WIKIDOT.page.listeners.filesClick = (...args) => {
      console.log(args);
    };
    clearInterval(interval);
  }
}, 0);
