var currLinkNum = 0;

function rhymeClearPage() {
  document.getElementById("notFoundOros").style.display = "none";
  document.getElementById("perfectRhymes").style.display = "none";
  document.getElementById("nearRhymes").style.display = "none";

  document.getElementById("1SyllPerf").innerHTML = "";
  document.getElementById("2SyllPerf").innerHTML = "";
  document.getElementById("3SyllPerf").innerHTML = "";
  document.getElementById("4SyllPerf").innerHTML = "";
  document.getElementById("1SyllNear").innerHTML = "";
  document.getElementById("2SyllNear").innerHTML = "";
  document.getElementById("3SyllNear").innerHTML = "";
  document.getElementById("4SyllNear").innerHTML = "";
  currLinkNum = 0;
}

function displayRhymeEntryArry(
  matches,
  matchKeys,
  searchedTerm,
  searchedSyllNum,
) {
  var arePerfectRhymes = false;
  var areNearRhymes = false;
  var templateDef = document.getElementById("wordDef");

  for (var i = 0; i < matchKeys.length; i++) {
    if (matchKeys[i] <= searchedSyllNum) {
      arePerfectRhymes = true;
      processMatchArray(matches[matchKeys[i]], templateDef, true);
    } else {
      areNearRhymes = true;
      processMatchArray(matches[matchKeys[i]], templateDef, false);
    }
  }

  cleanDisplay();
  if (!arePerfectRhymes) {
    document.getElementById("perfectRhymes").style.display = "none";
  } else {
    document.getElementById("perfectRhymes").style.display = "flex";
  }
  if (!areNearRhymes) {
    document.getElementById("nearRhymes").style.display = "none";
  } else {
    document.getElementById("nearRhymes").style.display = "flex";
  }
}

function processMatchArray(matchArr, tempDef, perf) {
  var newDef;
  var syllContain;
  for (var i = 0; i < matchArr.length; i++) {
    var word = matchArr[i].Orostara;
    var numSyll = getSyllables(word);
    var id;
    if (perf) {
      if (numSyll.length < 4) {
        id = numSyll.length + "SyllPerf";
      } else {
        id = "4SyllPerf";
      }
    } else {
      if (numSyll.length < 4) {
        id = numSyll.length + "SyllNear";
      } else {
        id = "4SyllNear";
      }
    }

    syllContain = document.getElementById(id);
    newDef = tempDef.cloneNode(true);
    newDef.id = word;
    displayEntry(matchArr[i], "findingRhyme", false, newDef);
    syllContain.appendChild(createLine());
    syllContain.appendChild(newDef);
  }
}

function cleanDisplay() {
  if (document.getElementById("1SyllPerf").innerHTML == "") {
    document.getElementById("1SyllPerfCon").style.display = "none";
  } else {
    document.getElementById("1SyllPerfCon").style.display = "flex";
  }
  if (document.getElementById("2SyllPerf").innerHTML == "") {
    document.getElementById("2SyllPerfCon").style.display = "none";
  } else {
    document.getElementById("2SyllPerfCon").style.display = "flex";
  }
  if (document.getElementById("3SyllPerf").innerHTML == "") {
    document.getElementById("3SyllPerfCon").style.display = "none";
  } else {
    document.getElementById("3SyllPerfCon").style.display = "flex";
  }
  if (document.getElementById("4SyllPerf").innerHTML == "") {
    document.getElementById("4SyllPerfCon").style.display = "none";
  } else {
    document.getElementById("4SyllPerfCon").style.display = "flex";
  }

  if (document.getElementById("1SyllNear").innerHTML == "") {
    document.getElementById("1SyllNearCon").style.display = "none";
  } else {
    document.getElementById("1SyllNearCon").style.display = "flex";
  }
  if (document.getElementById("2SyllNear").innerHTML == "") {
    document.getElementById("2SyllNearCon").style.display = "none";
  } else {
    document.getElementById("2SyllNearCon").style.display = "flex";
  }
  if (document.getElementById("3SyllNear").innerHTML == "") {
    document.getElementById("3SyllNearCon").style.display = "none";
  } else {
    document.getElementById("3SyllNearCon").style.display = "flex";
  }
  if (document.getElementById("4SyllNear").innerHTML == "") {
    document.getElementById("4SyllNearCon").style.display = "none";
  } else {
    document.getElementById("4SyllNearCon").style.display = "flex";
  }
}

function createLine() {
  var el = document.createElement("hr");
  el.id = "line";
  el.className = "line";

  return el;
}

function rhymeOros(word1) {
  var matches = {}; //makes bin by number of syllables
  var matchKeys = []; //keeps track of which bins there are for iterating later
  var matchesFound = false;
  var forConsole = [];
  var word = word1.toLowerCase();

  for (var i = 0; i < orosDict.length; i++) {
    var checkWord = orosDict[i].Orostara.toLowerCase();
    if (checkWord == word) {
      continue;
    }

    var match = 0;
    for (var j = 0; j < word.length && j < checkWord.length; j++) {
      if (
        word.charAt(word.length - 1 - j) ==
        checkWord.charAt(checkWord.length - 1 - j)
      ) {
        match++;
      } else {
        break;
      }
    }

    if (match > 1) {
      forConsole.push(checkWord);
      matchesFound = true;
      var syllNum = getSyllables(checkWord).length;
      if (matches.hasOwnProperty(syllNum)) {
        matches[syllNum].push(orosDict[i]);
      } else {
        matches[syllNum] = [orosDict[i]];
        matchKeys.push(syllNum);
      }
    }
  }
  return [matchesFound, matches, matchKeys];
}

//returns array of syllables. example, given banana, it would return ['ba','na','na']
function getSyllables(word) {
  // syllable options are cvc, vc, v, cv
  var vowels = ["a", "e", "o", "i", "u"];

  if (word.length == 0) {
    return [];
  } else if (word.length == 1) {
    //v
    return [word];
  } else if (word.length == 2) {
    //cv, vc, or vv (need to weed out vv)
    if (vowels.includes(word.charAt(0))) {
      //vc or vv
      if (!vowels.includes(word.charAt(1))) {
        //vc
        return [word];
      }
    } else {
      //vc
      return [word];
    }
  }

  //length is at least 2 (3 if not vv)
  var sylls = [];
  if (vowels.includes(word.charAt(word.length - 1))) {
    // if last character is vowel
    if (vowels.includes(word.charAt(word.length - 2))) {
      //last 2 vv
      var front = word.substring(0, word.length - 1);
      sylls = getSyllables(front);
      sylls.push(word.charAt(word.length - 1));
      return sylls;
    } else {
      //last 2 cv
      var front = word.substring(0, word.length - 2);
      sylls = getSyllables(front);
      sylls.push(word.substring(word.length - 2));
      return sylls;
    }
  } else {
    //last character is consonant AND at least 3 characters
    if (vowels.includes(word.charAt(word.length - 3))) {
      //last 3 vvc
      var front = word.substring(0, word.length - 2);
      sylls = getSyllables(front);
      sylls.push(word.substring(word.length - 2));
      return sylls;
    } else {
      //last 3 cvc
      if (word.length == 3) {
        return [word];
      } else {
        // at least 4 characters
        if (vowels.includes(word.charAt(word.length - 4))) {
          //last 4 vcvc
          var front = word.substring(0, word.length - 2);
          sylls = getSyllables(front);
          sylls.push(word.substring(word.length - 2));
          return sylls;
        } else {
          //last 4 ccvc
          var front = word.substring(0, word.length - 3);
          sylls = getSyllables(front);
          sylls.push(word.substring(word.length - 3));
          return sylls;
        }
      }
    }
  }
}
