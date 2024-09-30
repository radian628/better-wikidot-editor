(()=>{var n=setInterval(()=>{let e=document.getElementById("files-button");if(!e||e.dataset.isClone)return;let t=e.cloneNode(!0);t.dataset.isClone="true",e.parentElement?.insertBefore(t,e),e.parentElement?.removeChild(e),t.addEventListener("click",()=>{console.log(" do stuff here ")})},0);})();
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
