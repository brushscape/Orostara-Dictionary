/* jshint esversion: 8 */

var memory = [];
var memoryIndex = 0;

function goback() {
  if (memoryIndex > 0) {
    memoryIndex--;
    clearPage();
    var word = memory[memoryIndex];
    if (word[0] == 'English') {
      engEntry(word[1]);
    } else if (word[0] == 'Orostara') {
      orosEntry(word[1], '');
    } else { //Orostara2
      orosEntry(word[1][0], word[1][1]);
    }
  }

  updateForBackButtons();
}

function goforward() {
  if (memoryIndex < memory.length - 1) {
    memoryIndex++;
    clearPage();
    var word = memory[memoryIndex];
    if (word[0] == 'English') {
      engEntry(word[1]);
    } else if (word[0] == 'Orostara') {
      orosEntry(word[1], '');
    } else { //Orostara2
      orosEntry(word[1][0], word[1][1]);
    }
  }

  updateForBackButtons();
}

// 3 options are
// English, word; Orostara, word; Orostara2, [word,word]
function incMemory(lang, word) {
  //don't add repeats in a row
  if (memory.length > 0 && compareElements(word, memory[memoryIndex][1])) {
    return;
  }

  //delete forward memory if you search again
  if (memoryIndex < memory.length - 1) {
    memory.splice(memoryIndex + 1);
  }

  //add to memory
  memory.push([lang, word]);
  if (memory.length <= 1) {
    memoryIndex = 0;
  } else {
    memoryIndex++;
  }

  //only keep a memory of max 50 words
  if (memory.length > 50) {
    memory.shift();
  }

  updateForBackButtons();
}

function compareElements(ar1, ar2) {
  if (Array.isArray(ar1) != Array.isArray(ar2)) {
    return false;
  }
  if (Array.isArray(ar1)) {
    return ar1[0] == ar2[0] && ar1[1] == ar2[1];
  }
  return ar1 == ar2;
}

function updateForBackButtons() {
  document.getElementById('backBut').disabled = memoryIndex <= 0;
  document.getElementById('forBut').disabled = memoryIndex >= memory.length - 1;
}
