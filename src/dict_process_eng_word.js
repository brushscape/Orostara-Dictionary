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
  var perfectArr = [];
  var nearArr = [];
  var entryArr = [];

  //go through every dictionary entry

  for (var i = 0; i < orosDict.length; i++) {
    var entriesToCheck = [orosDict[i].Nouns, orosDict[i].Verbs, orosDict[i].Adjectives, orosDict[i].Adverbs, orosDict[i].Other];

    var add = false; //word is contained in entry
    var perfect = false; // word is a perfect match to an entry
    for (var j = 0; j < entriesToCheck.length; j++) { //check ALL of the entries, even if found, in case there is a perfect match so that can be displayed first
      //search each entry option
      var array = entriesToCheck[j];
      if (!Array.isArray(array)) {
        if (array == '') { //skip if entry is empty
          continue;
        }
        //make an array if only one entry
        array = [entriesToCheck[j]];
      }
      var result = arrayHasWord(array, word);
      add = result[0] || add;
      perfect = result[1] || perfect;
    }

    if (add) {
      if (orosDict[i].RootLanguage != 'Orosfara') { //basic word
        // add to the front of the array
        if (perfect) {
          perfectArr.unshift(orosDict[i]);
        } else {
          nearArr.unshift(orosDict[i]);
        }
      } else { //constructed word
        //add to the back of the array
        if (perfect) {
          perfectArr.push(orosDict[i]);
        } else {
          nearArr.push(orosDict[i]);
        }
      }
    }
  }
  //always show the basic words first
  entryArr = perfectArr.concat(nearArr);
  return entryArr;
}

function arrayHasWord(arr, word1) {
  var word = word1.toLowerCase();
  //search through array
  for (var j = 0; j < arr.length; j++) {

    //cleanup
    var check = arr[j];
    if (check.charAt(0) == '(') {
      var index = 1;
      //find end of paranthetical
      while (check.charAt(index) != ')' && index < check.length) {
        index++;
      }

      var newCheck = check.substring(index + 1);

      //take away space between parathentical and word if there
      if (newCheck.charAt(0) == ' ' && newCheck.length > 1) {
        check = newCheck.substring(1);
      } else {
        check = newCheck;
      }
    }

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
