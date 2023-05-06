/* jshint esversion: 8 */

function engClick(searchedWord) {
  clearPage();
  var found = engEntry(searchedWord);
  if (found) {
    incMemory('English', searchedWord);
  }
}

function engEntry(searchedWord) {
  if (searchedWord.length == 0) {
    document.getElementById('notFoundEng').style.display = 'flex';
    return false;
  }
  var entryArr = searchEnglish(searchedWord);
  if (entryArr.length == 0) {
    document.getElementById('notFoundEng').style.display = 'flex';
    return false;
  } else {
    displayEntryArry(entryArr, searchedWord);
    return true;
  }
}

function searchEnglish(word) {
  var entryArr = [];

  //go through every dictionary entry

  for (var i = 0; i < orosDict.length; i++) {
    var entriesToCheck = [orosDict[i].Nouns, orosDict[i].Verbs, orosDict[i].Adjectives, orosDict[i].Adverbs, orosDict[i].Other];

    var add = false;
    var perfect = false;
    for (var j = 0; j < entriesToCheck.length; j++) { //check ALL of the entries, even if found, in case there is a perfect match so that can be displayed first
      //search each entry option
      var array = entriesToCheck[j];
      if (!Array.isArray(array)) {
        if (array == '') { //skip if entry is empty
          continue;
        }
        array = [entriesToCheck[j]];
      }
      var result = arrayHasWord(array, word);
      add = result[0] || add;
      perfect = result[1] || perfect;
    }

    if (add) {
      if (perfect) {
        entryArr.unshift(orosDict[i]);
      } else {
        entryArr.push(orosDict[i]);
      }
    }
  }
  return entryArr;
}

function arrayHasWord(arr, word1) {
  var word = word1.toLowerCase();
  //search through array
  for (var j = 0; j < arr.length; j++) {

    //cleanup
    var check = arr[j];

    //check for a match
    if (check.toLowerCase() == word) {
      return [true, true];
    }

    //if array element is more than one word
    if (check.indexOf(' ') != -1) {
      //make array with both words
      var multiDef = check.split(' ');
      //recurse
      if (arrayHasWord(multiDef, word)[0]) {
        return [true, false];
      }
    }
  }
  return [false, false];
}
