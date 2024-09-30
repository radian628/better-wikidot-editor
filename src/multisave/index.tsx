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

  WIKIDOT.page.listeners.filesClick = (...args) => {
    console.log(args);
  };

  if (filesClick as any) clearInterval(interval);
}, 0);
