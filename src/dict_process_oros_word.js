/* jshint esversion: 8 */

function orosClick(searchedWord) {
  clearPage();
  var lastChar = searchedWord.charAt(searchedWord.length - 1);
  var endList = ['a', 'e', 'o', 'i', 'u'];
  var specialCases = ['naki', 'amki', 'ki', 'ha', 'na', 'a', 'o'];
  var otherWord = '';
  if (specialCases.indexOf(searchedWord) == -1 && endList.indexOf(lastChar) != -1) {
    if (properNouns.indexOf(searchedWord) == -1) {
      otherWord = searchedWord;
    }
    searchedWord = searchedWord.substring(0, searchedWord.length - 1);

  }

  var found = orosEntry(searchedWord, otherWord);
  if (found == 1) {
    incMemory('Orostara', searchedWord);
  } else if (found == 2) {
    incMemory('Orostara', otherWord);
  } else if (found == 3) { // incase they search a word like 'kanan' which could be 'kanan' without an ending or 'kan' with an ending
    incMemory('Orostara2', [searchedWord, otherWord]);
  }
}

function orosEntry(searchedWord, otherWord) {
  var entry1 = searchOrostara(searchedWord);
  var entry2 = [];
  if (otherWord != '') {
    entry2 = searchOrostara(otherWord);
  }
  if (entry1.length == 0 && entry2.length == 0) {
    document.getElementById('notFoundOros').style.display = 'flex';
    return 0;
  } else {
    var full = pushArray(entry1, entry2);
    displayEntryArry(full, '');
    if (entry1.length != 0) {
      if (entry2.length != 0) {
        return 3;
      } else {
        return 1;
      }
    } else {
      return 2;
    }
  }
}

function searchOrostara(word1) {
  var entryArr = [];
  var word = word1.toLowerCase();
  //check every word in case there's more than one (rare but not unheardof)
  for (var i = 0; i < orosDict.length; i++) {
    var checkWord = orosDict[i].Orostara.toLowerCase();
    if (checkWord == word) {
      entryArr.push(orosDict[i]);
    }
  }
  return entryArr;
}

function pushArray(base, add) {
  var newArr = base;
  for (var i = 0; i < add.length; i++) {
    newArr.push(add[i]);
  }
  return newArr;
}
