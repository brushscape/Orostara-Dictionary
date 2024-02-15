/* jshint esversion: 8 */

function orosClick(searchedWord) {
  clearPage();
  var lastChar = searchedWord.charAt(searchedWord.length - 1);
  var endList = ["a", "e", "o", "i", "u"];
  var specialCases = [
    "ni",
    "mi",
    "ki",
    "ha",
    "na",
    "o",
    "ma",
    "ko",
    "tu",
    "axa",
    "anti",
    "xu",
    "haha",
    "hihi",
  ];

  //not a special case and DOES end in a vowel
  if (
    specialCases.indexOf(searchedWord) == -1 &&
    endList.indexOf(lastChar) != -1
  ) {
    //chop off last letter (vowel)
    searchedWord = searchedWord.substring(0, searchedWord.length - 1);
  }

  var found = orosEntry(searchedWord);
  if (found == 1) {
    incMemory("Orostara", searchedWord);
  }
}

function orosEntry(searchedWord) {
  var entry1 = searchOros(searchedWord);
  if (entry1.length == 0) {
    document.getElementById("notFoundOros").style.display = "flex";
    return 0;
  } else {
    displayEntryArry(entry1, "");
    if (entry1.length != 0) {
      return 1;
    } else {
      return 2;
    }
  }
}

function searchOros(word1) {
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
