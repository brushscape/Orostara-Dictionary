//TODO

//cute little encouragement every 10? in a row?
//confetti on the streak????

//put all the words in

var vocab = [
  ["akax", "peix", "pak", "oros", "tahik", "yem"], //lesson 1
  ["pien", "op", "tar", "tesat", "pasir", "puah"], //lesson 2
  ["tis", "rek", "xan", "hos", "xok", "pax"], //lesson 3
  ["nis", "armas", "hon", "kep", "sis", "huah"], //lesson 4
  ["kux", "satakat", "rey", "yep", "xuey", "yet"], //lesson 5
  ["xor", "tam", "nien", "miy", "pap", "en"], //lesson 6
  ["ney", "kapes", "tokar", "har", "satan", "rep"], //lesson7
  ["xiyen", "manrak", "maux", "apeh", "ip", "er"], //lesson 8
  ["xis", "panin", "paxit", "mes", "tux", "kamar"], //lesson 9
  ["atit", "men", "net", "pam", "us", "tok"], //lesson 10
  ["rakax", "hanam", "yon"], //other
];
var activeSets = [1];
var activePrevAll = [1];
var currSet = [];
var tempSet = [];

var language = 3; //1 for Orostara, 2 for English, 3 for both
var currLang; //1 for Orostara, 2 for English

var wordEntry; //orosDict entry for current word pick
var options = []; //parts of speech available for that word
var pos; //part of speech chosen 1-5 (noun, verb, adj, adv, other)
var currWord = "";
var currAnswer = "";

var givenAns = "";

function evalSet(num) {
  if (num == 12) {
    // all button
    if (document.getElementById("allButt").classList.contains("lessSelect")) {
      // toggling on; activate all
      toggleActive("allButt");

      activePrevAll = activeSets;
      activeSets = [];
      for (var i = 1; i < 12; i++) {
        //1-11
        activeSets.push(i);
        toggleActive("less" + i + "Butt", true);
      }
    } else {
      //toggling off; return to previous state
      toggleActive("allButt");

      activeSets = activePrevAll;
      for (var i = 1; i < 12; i++) {
        if (!activeSets.includes(i)) {
          toggleActive("less" + i + "Butt");
        }
      }
    }
  } else {
    var isThere = -1;
    for (var i = 0; i < activeSets.length; i++) {
      if (activeSets[i] == num) {
        isThere = i;
        break;
      }
    }

    if (isThere == -1) {
      //toggle on
      activeSets.push(num);
      toggleActive("less" + num + "Butt");
    } else {
      //toggle off
      //take it out
      activeSets.splice(isThere, 1);
      toggleActive("less" + num + "Butt");

      if (document.getElementById("allButt").classList.contains("activeLess")) {
        toggleActive("allButt");
      }
    }

    if (activeSets.length == 0) {
      //ALWAYS default to at least lesson 1 active
      activeSets = [1];
      toggleActive("less1Butt");
    }
  }
  setSets();
}

function setSets() {
  currSet = [];
  for (var i = 0; i < activeSets.length; i++) {
    currSet = currSet.concat(vocab[activeSets[i] - 1]);
  }
  tempSet = [];
}

function selectFlashLang(num) {
  switch (language) {
    case 1:
      toggleActive("orosButt");
      break;
    case 2:
      toggleActive("engButt");
      break;
    case 3:
      toggleActive("bothButt");
      break;
    default:
      break;
  }

  switch (num) {
    case 1:
      toggleActive("orosButt");
      break;
    case 2:
      toggleActive("engButt");
      break;
    case 3:
      toggleActive("bothButt");
      break;
    default:
      break;
  }

  language = num;
}

function toggleActive(id, forceActive) {
  if (forceActive) {
    document.getElementById(id).classList.remove("lessSelect");
    document.getElementById(id).classList.add("activeLess");
  } else {
    if (document.getElementById(id).classList.contains("activeLess")) {
      document.getElementById(id).classList.add("lessSelect");
      document.getElementById(id).classList.remove("activeLess");
    } else {
      document.getElementById(id).classList.remove("lessSelect");
      document.getElementById(id).classList.add("activeLess");
    }
  }
}

function startFlash() {
  if (document.getElementById("startBut").innerHTML == "Start") {
    document.getElementById("game").style.display = "flex";
    document.getElementById("startBut").innerHTML = "Restart";

    $("#flashAnswerBar").focus(function (event) {
      document.getElementById("checkBut").disabled = false;
    });
    $("#flashAnswerBar").focusout(function (event) {
      if (document.getElementById("flashAnswerBar").value == "") {
        document.getElementById("checkBut").disabled = true;
      }
    });
    $("#flashAnswerBar").keyup(function (event) {
      if (event.which == 13) {
        //if enter key
        if (document.getElementById("flashAnswerBar").value != "") {
          checkAnswer();
          document.getElementById("skipBut").focus();
        }
        //this.select();
        event.preventDefault();
      }
    });
    document.getElementById("flashAnswerBar").focus();
  }

  document.getElementById("correctCount").innerHTML = 0;
  document.getElementById("missedCount").innerHTML = 0;
  document.getElementById("skippedCount").innerHTML = 0;
  document.getElementById("streakCount").innerHTML = 0;
  document.getElementById("skippedMax").innerHTML = " • • • ";

  setSets();
  resetElements();
  pickWord();
}

function pickWord() {
  if (currSet.length == 0) {
    currSet = tempSet;
    tempSet = [];
  } //start over when empty
  var index = Math.floor(Math.random() * currSet.length);
  var word = currSet.splice(index, 1)[0];
  tempSet.push(word);
  //remove option so no repeats

  wordEntry = searchOros(word)[0];

  if (wordEntry == undefined) {
    return;
  }

  options = [];
  if (wordEntry.Nouns != "") {
    options.push(1);
  }
  if (wordEntry.Verbs != "") {
    options.push(2);
  }
  if (wordEntry.Adjectives != "") {
    options.push(3);
  }
  if (wordEntry.Adverbs != "") {
    options.push(4);
  }
  if (wordEntry.Other != "") {
    options.push(5);
  }
  var typeIndex = Math.floor(Math.random() * options.length);
  pos = options[typeIndex];

  currLang = language;
  if (language == 3) {
    currLang = Math.floor(Math.random() * 2 + 1);
  }

  if (currLang == 1) {
    //orostara
    switch (pos) {
      case 1:
        currWord = wordEntry.Orostara + "a";
        currAnswer = wordEntry.Nouns;
        break;
      case 2:
        currWord = wordEntry.Orostara + "o";
        currAnswer = wordEntry.Verbs;
        break;
      case 3:
        currWord = wordEntry.Orostara + "i";
        currAnswer = wordEntry.Adjectives;
        break;
      case 4:
        currWord = wordEntry.Orostara + "e";
        currAnswer = wordEntry.Adverbs;
        break;
      case 5:
        currWord = wordEntry.Orostara;
        currAnswer = wordEntry.Other;
        break;
      default:
        currWord = "Error: No Definitions Found";
    }
    document.getElementById("flashWord").innerHTML = currWord;
  } else {
    //english
    switch (pos) {
      case 1:
        currAnswer = wordEntry.Orostara + "a";
        currWord = wordEntry.Nouns;
        break;
      case 2:
        currAnswer = wordEntry.Orostara + "o";
        currWord = wordEntry.Verbs;
        break;
      case 3:
        currAnswer = wordEntry.Orostara + "i";
        currWord = wordEntry.Adjectives;
        break;
      case 4:
        currAnswer = wordEntry.Orostara + "e";
        currWord = wordEntry.Adverbs;
        break;
      case 5:
        currAnswer = wordEntry.Orostara;
        currWord = wordEntry.Other;
        break;
      default:
        currWord = "Error: No Definitions Found";
    }
    document.getElementById("flashWord").innerHTML = displayWordList(
      currWord,
      "",
      true,
    );
  }
}

function skipCard() {
  flipCard();
  feedback("skipped");
}

function flipCard() {
  document.getElementById("checkBut").style.display = "none";
  document.getElementById("skipBut").innerHTML = "Next";
  document.getElementById("skipBut").onclick = nextCard;
  document.getElementById("flashAnswer").style.display = "flex";
  if (currLang == 1) {
    //answer is in english
    document.getElementById("flashAnswer").innerHTML = displayWordList(
      currAnswer,
      givenAns,
      true,
    );
  } else {
    //answer is in orostara
    document.getElementById("flashAnswer").innerHTML = currAnswer;
  }
  document.getElementById("flashAnswerBar").disabled = true;
  document.getElementById("flashAnswer").classList.add("shiftOverAnim");
}

function checkAnswer() {
  flipCard();
  givenAns = document.getElementById("flashAnswerBar").value.toLowerCase();
  //TODO autofail if answer is 'colloquially' or 'temporally' or any of those other tags

  if (
    //this is cheating. Don't cheat
    givenAns == "colloquially" ||
    givenAns == "(colloquially)" ||
    givenAns == "(temporally)" ||
    givenAns == "honorific" ||
    givenAns == "(honorific)" ||
    givenAns == "(spacially)" ||
    givenAns == "slang" ||
    givenAns == "(slang)"
  ) {
    feedback("missed");
    return;
  }

  if (givenAns == "temporally") {
    if (currWord == "seke") {
      feedback("perfect");
    } else if (wordEntry.Orostara == "sek") {
      feedback("correct");
    } else {
      feedback("missed");
    }
  }

  if (givenAns == "spacially") {
    if (currWord == "make") {
      feedback("perfect");
    } else if (wordEntry.Orostara == "mak") {
      feedback("correct");
    } else {
      feedback("missed");
    }
  }

  //rare case with English! common with Orostara
  if (givenAns == currAnswer) {
    //Completely Correct!!
    feedback("perfect");
    return;
  }

  if (currLang == 1) {
    // Orostara, answer in english
    if (Array.isArray(currAnswer)) {
      var result = arrayHasWord(currAnswer, givenAns);

      //TODO give partial credit for giving an answer for the wrong part of speech
      if (result[0] || result[1]) {
        // word is an match to an entry of correct part of speech
        feedback("perfect");
      } else {
        var result2 = false;
        var temp;
        for (var i = 0; i < options.length; i++) {
          switch (options[i]) {
            case 1:
              if (Array.isArray(wordEntry.Nouns)) {
                temp = arrayHasWord(wordEntry.Nouns, givenAns);
                result2 = result2 || temp[0] || temp[1];
              } else {
                result2 = result2 || wordEntry.Nouns == givenAns;
              }
              break;
            case 2:
              if (Array.isArray(wordEntry.Verbs)) {
                temp = arrayHasWord(wordEntry.Verbs, givenAns);
                result2 = result2 || temp[0] || temp[1];
              } else {
                result2 = result2 || wordEntry.Verbs == givenAns;
              }
              break;
            case 3:
              if (Array.isArray(wordEntry.Adjectives)) {
                temp = arrayHasWord(wordEntry.Adjectives, givenAns);
                result2 = result2 || temp[0] || temp[1];
              } else {
                result2 = result2 || wordEntry.Adjectives == givenAns;
              }
              break;
            case 4:
              if (Array.isArray(wordEntry.Adverbs)) {
                temp = arrayHasWord(wordEntry.Adverbs, givenAns);
                result2 = result2 || temp[0] || temp[1];
              } else {
                result2 = result2 || wordEntry.Adverbs == givenAns;
              }
              break;
            case 5:
              if (Array.isArray(wordEntry.Other)) {
                temp = arrayHasWord(wordEntry.Other, givenAns);
                result2 = result2 || temp[0] || temp[1];
              } else {
                result2 = result2 || wordEntry.Other == givenAns;
              }
              break;
            default:
              currWord = "Error: No Definitions Found";
          }
          if (result2) {
            feedback("correct");
            return;
          }
        }
        feedback("missed");
      }
    } else {
      //already know they're not a perfect match, so if not array, then not correct
      feedback("missed");
    }
  } else {
    //English, answer in Orostara AND not perfect match

    var giv = givenAns;
    var ans = currAnswer;
    if (endList.indexOf(givenAns.charAt(givenAns.length - 1)) != -1) {
      giv = givenAns.substring(0, givenAns.length - 1);
    }
    if (endList.indexOf(currAnswer.charAt(currAnswer.length - 1)) != -1) {
      ans = currAnswer.substring(0, currAnswer.length - 1);
    }
    if (giv == ans) {
      //part of speach is wrong but word is correct
      feedback("correct");
    } else {
      //answer is wrong
      feedback("missed");
    }
  }
}

function feedback(type) {
  //perfect,correct, missed, skipped
  var text;
  if (type == "perfect") {
    var num = document.getElementById("correctCount").innerHTML;
    document.getElementById("correctCount").innerHTML = parseFloat(num) + 1;
    num = document.getElementById("streakCount").innerHTML;
    document.getElementById("streakCount").innerHTML = parseInt(num) + 1;
    document.getElementById("feedback").innerHTML = "PERFECT!";
    document.getElementById("feedback").style.color = "limegreen";
    document.getElementById("feedback").style.opacity = 1;
    //document.getElementById("flashAnswer").style.borderColor = "limegreen";
    document.getElementById("cardContain").style.boxShadow =
      "0px 0px 18px rgba(50, 205, 50, 1)";
    document.getElementById("cardContain").classList.add("greenGlowAnim");
    text = true;
  } else if (type == "correct") {
    var num = document.getElementById("correctCount").innerHTML;
    document.getElementById("correctCount").innerHTML = parseFloat(num) + 0.5;
    document.getElementById("feedback").innerHTML =
      "Very Close! Partial Credit";
    document.getElementById("feedback").style.color = "limegreen";
    document.getElementById("feedback").style.opacity = 1;
    //document.getElementById("flashAnswer").style.borderColor = "limegreen";
    document.getElementById("cardContain").style.boxShadow =
      "0px 0px 18px rgba(50, 205, 50, 1)";
    document.getElementById("cardContain").classList.add("greenGlowAnim");
    text = true;
  } else if (type == "missed") {
    var num = document.getElementById("missedCount").innerHTML;
    document.getElementById("missedCount").innerHTML = parseInt(num) + 1;
    document.getElementById("streakCount").innerHTML = 0;
    document.getElementById("feedback").innerHTML = "Try Again...";
    document.getElementById("feedback").style.color = "firebrick";
    document.getElementById("feedback").style.opacity = 1;
    //document.getElementById("flashAnswer").style.borderColor = "firebrick";
    document.getElementById("cardContain").style.boxShadow =
      "0px 0px 18px rgba(178, 34, 34, 1)";
    document.getElementById("cardContain").classList.add("redGlowAnim");
    text = true;
  } else if (type == "skipped") {
    var currSkipped = parseInt(
      document.getElementById("skippedCount").innerHTML,
    );
    document.getElementById("skippedCount").innerHTML = currSkipped + 1;

    var currStreak = parseInt(document.getElementById("streakCount").innerHTML);
    if (currStreak > 0) {
      if (document.getElementById("skippedMax").innerHTML == " • • • ") {
        document.getElementById("skippedMax").innerHTML = " • •   ";
      } else if (document.getElementById("skippedMax").innerHTML == " • •   ") {
        document.getElementById("skippedMax").innerHTML = " •     ";
      } else if (document.getElementById("skippedMax").innerHTML == " •     ") {
        document.getElementById("skippedMax").innerHTML = "       ";
      } else {
        document.getElementById("skippedMax").innerHTML = " • • • ";

        document.getElementById("streakCount").innerHTML = "0";
        document.getElementById("feedback").innerHTML =
          "Streak Lost (Skip limit: 3)";
        document.getElementById("feedback").style.opacity = 1;
        text = true;
      }
    }
  } else {
    console.log("invalid feedback type");
  }

  if (text) {
    document.getElementById("feedback").classList.add("fadeOutAnim");
  }
}

function nextCard() {
  givenAns = "";

  pickWord();
  resetElements();
}

function resetElements() {
  document.getElementById("skipBut").innerHTML = "Skip";
  document.getElementById("skipBut").onclick = skipCard;
  document.getElementById("checkBut").style.display = "flex";
  document.getElementById("checkBut").disabled = true;

  document.getElementById("flashAnswerBar").value = "";
  document.getElementById("flashAnswerBar").disabled = false;
  document.getElementById("flashAnswerBar").focus();

  document.getElementById("cardContain").classList.remove("greenGlowAnim");
  document.getElementById("cardContain").classList.remove("redGlowAnim");
  document.getElementById("cardContain").style.boxShadow = "none";

  document.getElementById("flashAnswer").style.display = "none";
  document.getElementById("flashAnswer").classList.remove("shiftOverAnim");

  document.getElementById("feedback").style.opacity = 0;
  document.getElementById("feedback").innerHTML = "Skipped";
  document.getElementById("feedback").style.color = "black";
  document.getElementById("feedback").classList.remove("fadeOutAnim");
}
