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
      orosEntry(word[1]);
    } else {
      console.log("error in back command, invalid language");
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
      orosEntry(word[1]);
    } else {
      console.log("error in back command, invalid language");
    }
  }

  updateForBackButtons();
}

// 2 options are
// English, word; Orostara, word
function incMemory(lang, word) {
  //don't add repeats in a row
  if (memory.length > 0 && word == memory[memoryIndex][1]) {
    return;
  }

  //delete forward memory if you search again
  if (memoryIndex < memory.length - 1) {
    memory.splice(memoryIndex + 1);
  }

  //add to memory
  memory.push([lang, word]);

  //only keep a memory of max 50 words
  if (memory.length > 50) {
    memory.shift();
  }

  memoryIndex = memory.length - 1;

  updateForBackButtons();
}

function printArray(arr) {
  if (arr.length == 0) {
    console.log("empty array");
    return;
  }
  var str = '[' + arr[0] + ']';
  for (var i = 1; i < arr.length; i++) {
    str += ',  [' + arr[i] + ']';
  }
  console.log(str);
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
