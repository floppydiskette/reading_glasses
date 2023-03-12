// ==UserScript==
// @name        reading_glasses
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      floppydiskette
// @description 3/12/2023, 12:26:40 AM
// ==/UserScript==

function boldenLetters(tag) {
  const elements = document.getElementsByTagName(tag);

  for (let i = 0; i < elements.length; i++) {
    let words = elements[i].innerHTML.split(" ");
    let tag_mode = 0;

      for (let j = 0; j < words.length; j++) {
        if (words[j].startsWith("&")) {
          continue;
        }

        if (words[j].startsWith("<") && tag_mode === 0) {
          tag_mode = 1;
        }
        if (words[j].startsWith("</") && tag_mode === 1) {
          tag_mode = 2;
        }
        if ((words[j].endsWith(">") && tag_mode === 2) || (words[j].includes("</") && words[j].includes(">"))) {
          tag_mode = 0;
          continue;
        }

        if (tag_mode === 0) {
          let bolden = words[j].length / 2;
            words[j] = "<b>" + words[j].substring(0, bolden) + "</b>" + words[j].substring(bolden);
        }
      }
      elements[i].innerHTML = words.join(" ");

  }
}

function idLike() {
  boldenLetters("p");
  // boldenLetters("div"); // untested but should work!
}

window.onload = idLike;
