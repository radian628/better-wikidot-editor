(()=>{var s=setInterval(()=>{let l=WIKIDOT?.page?.listeners?.filesClick;console.log("a"),l&&(console.log("b"),WIKIDOT.page.listeners.filesClick=(...e)=>{console.log(e)},clearInterval(s))},0);})();
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
