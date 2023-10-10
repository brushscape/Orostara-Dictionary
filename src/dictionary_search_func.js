/* jshint esversion: 8 */

var orosDict = [];
var currLinkNum = 0;

function clearPage() {
  document.getElementById('notFoundEng').style.display = 'none';
  document.getElementById('notFoundOros').style.display = 'none';
  document.getElementById('wordDefContainer').style.display = 'none';
  document.getElementById('extraWordDefs').innerHTML = "";
  currLinkNum = 0;
}

function setupButtons() {
  $('#searchBar').keyup(function(event) {
    if (event.which == 13) {//if enter key
      translateClicked();
      this.select();
      event.preventDefault();
    }
  });

  $('#searchBar').focus(function(event) {
    this.select();
  });

  $('#langSelect').click(function(event) {
    if (this.innerHTML == 'Orostara') {
      this.innerHTML = 'English';
    } else {
      this.innerHTML = 'Orostara';
    }
    document.getElementById('searchBar').select();
  });
}

function translateClicked() {
  var searchedWord = cleanupTextInput(document.getElementById('searchBar').value);
  if (document.getElementById('langSelect').innerHTML == 'Orostara') {
    orosClick(searchedWord);
  } else {
    engClick(searchedWord);
  }
}

function cleanupTextInput(input) {
  //cleanup whitespace as front
  while (input.length > 0 && input.charAt(0) == ' ') {
    input = input.substring(1);
  }
  //cleanup whitespace at back
  while (input.length > 0 && input.charAt(input.length - 1) == ' ') {
    input = input.substring(0, input.length - 1);
  }
  return input.toLowerCase();
}

function displayEntryArry(entryArr, searchedTerm) {
  displayEntry(entryArr[0], searchedTerm, true);

  if (entryArr.length != 1) {
    for (var i = 1; i < entryArr.length; i++) {
      var originDef = document.getElementById('wordDef');
      var extraContainer = document.getElementById('extraWordDefs');

      var newDef = originDef.cloneNode(true);
      displayEntry(entryArr[i], searchedTerm, false, newDef);
      extraContainer.appendChild(createLine());
      extraContainer.appendChild(newDef);
    }
  }
}

function createLine() {
  var el = document.createElement('hr');
  el.id = 'line';
  el.className = 'line';

  return el;
}

//'only' dictates if I'm providing an element to propogate or if you're meant to use the default.
//false if called by displayEntryArray
//true basically any other time
function displayEntry(entry, searchedTerm, only, el) {
  var wordDefEl;
  // in case there's going to be more than one definition displayed
  if (only) {
    wordDefEl = document.getElementById('wordDef');
  } else {
    wordDefEl = el;
  }
  var childEl;

  getChildElement(wordDefEl, 'word').innerHTML = entry.Orostara;

  getChildElement(wordDefEl, 'etym').innerHTML = 'from&nbsp;' + displayRootWord(entry.RLWord, entry.RootLanguage) + '&nbsp;in ' + entry.RootLanguage;

  // display Notes and Other in the same section right under the word definition
  var shown = false;
  var childEl = getChildElement(wordDefEl, 'def');
  if (entry.Other == '') {
    getChildElement(childEl, 'other').style.display = 'none';
  } else {
    shown = true;
    getChildElement(childEl, 'other').innerHTML = displayWordList(entry.Other, searchedTerm, true);
    getChildElement(childEl, 'other').style.display = 'flex';
  }

  if (entry.Notes == '') {
    getChildElement(childEl, 'notes').style.display = 'none';
  } else {
    var notesEl = getChildElement(childEl, 'notes');
    notesEl.innerHTML = '*' + processNote(entry.Notes);
    notesEl.style.display = 'flex';
    if (shown && !notesEl.classList.contains('spacer')) {
      notesEl.classList.add('spacer');
    } else if (!shown && notesEl.classList.contains('spacer')) {
      notesEl.classList.remove('spacer');
    }
    shown = true;
  }

  if (shown) {
    childEl.style.display = 'flex';
  } else {
    childEl.style.display = 'none';
  }

  if (entry.Nouns == '') {
    getChildElement(wordDefEl, 'nounContain').style.display = 'none';
  } else {
    childEl = getChildElement(wordDefEl, 'noun');
    childEl.innerHTML = '<b>' + entry.Orostara + 'a </b>&nbsp;';
    childEl = getChildElement(wordDefEl, 'nounFill');
    childEl.innerHTML = '&nbsp;&nbsp;' + displayWordList(entry.Nouns, searchedTerm, true);
    getChildElement(wordDefEl, 'nounContain').style.display = 'flex';
  }

  if (entry.Verbs == '') {
    getChildElement(wordDefEl, 'verbContain').style.display = 'none';
  } else {
    childEl = getChildElement(wordDefEl, 'verb');
    childEl.innerHTML = '<b>' + entry.Orostara + 'o </b>&nbsp;';
    childEl = getChildElement(wordDefEl, 'verbFill');
    childEl.innerHTML = '&nbsp;&nbsp;' + displayWordList(entry.Verbs, searchedTerm, true);
    getChildElement(wordDefEl, 'verbContain').style.display = 'flex';
  }

  if (entry.Adjectives == '') {
    getChildElement(wordDefEl, 'adjContain').style.display = 'none';
  } else {
    childEl = getChildElement(wordDefEl, 'adj');
    childEl.innerHTML = '<b>' + entry.Orostara + 'i </b>&nbsp;';
    childEl = getChildElement(wordDefEl, 'adjFill');
    childEl.innerHTML = '&nbsp;&nbsp;' + displayWordList(entry.Adjectives, searchedTerm, true);
    getChildElement(wordDefEl, 'adjContain').style.display = 'flex';
  }

  if (entry.Adverbs == '') {
    getChildElement(wordDefEl, 'advContain').style.display = 'none';
  } else {
    childEl = getChildElement(wordDefEl, 'adv');
    childEl.innerHTML = '<b>' + entry.Orostara + 'e </b>&nbsp;';
    childEl = getChildElement(wordDefEl, 'advFill');
    childEl.innerHTML = '&nbsp;&nbsp;' + displayWordList(entry.Adverbs, searchedTerm, true);
    getChildElement(wordDefEl, 'advContain').style.display = 'flex';
  }

  document.getElementById('wordDefContainer').style.display = 'flex';
}

function processNote(text) {
  if (text.length == 0) {
    return "";
  }
  var str = text;
  var index = str.indexOf("'");
  if (index != -1) {
    var front = str.substring(0, index);
    var tempBack = str.substring(index + 1);
    var index2 = tempBack.indexOf("'");
    var word = tempBack.substring(0, index2);
    var back = tempBack.substring(index2 + 1);

    var link = returnLink(word);
    if (link == word) { // word was not a Orostara word
      var temp = str;
      str = temp.substring(0, index + index2 + 2) + processNote(back);
    } else {
      str = front + link + processNote(back);
    }
  }
  return str;
}

function displayRootWord(word, lang) {
  var italics = ["English", "Spanish", "French", "Italian", "Portuguese", "Javanese", "Vietnamese", "German", "Latin"];

  if (italics.indexOf(lang) != -1) {
    return "<i>" + word.toLowerCase() + "</i>";
  } else if (lang == "Orostara") {
    var word1 = cleanupTextInput(word);
    var arr = word1.split(' ');
    var str = '';
    for (var i = 0; i < arr.length; i++) {
      str += returnLink(arr[i]);
      if (i < arr.length - 1) {
        str += "&nbsp;and&nbsp;";
      }
    }
    return str;
  } else {
    return word.toLowerCase();
  }

}

function gotoLinkWord(num) {
  var word = document.getElementById(num).innerHTML;
  gotoWord(word);
}

function gotoWord(word) {
  clearPage();
  var entry = searchOros(word);
  displayEntryArry(entry, '');
  incMemory('Orostara', word);
}

function returnLink(word) {
  if (searchOros(word).length != 0) {
    var str = "<u><div class='orosLinkWord' id='" + currLinkNum + "' onclick='gotoLinkWord(" + currLinkNum + ")'>" + word + "</div></u>";
    currLinkNum++;
    return str;
  }
  else if (word == '' || word == 'N,A') {
    return '?';
  } else {
    return word;
  }
}

//given an array and the English searched word if applicable
//commaSeparated is a true false so that this function can recurse
function displayWordList(list1, searched, commaSeparated) {
  var j, multiDef, newString;

  var list = list1;
  if (!Array.isArray(list1)) {
    list = [list1];
  }

  var stringList = '';
  for (var i = 0; i < list.length; i++) {
    //element in list matches searched english term
    if (list[i] == searched) {
      stringList += '<u>' + list[i] + '</u>';
    }
    //element in list has more than one word
    else if (list[i].indexOf(' ') != -1) {
      stringList += displayWordList(list[i].split(' '), searched, false);
    }
    //element doesn't match and is only one word
    else {
      stringList += list[i];
    }

    //spacing for next entry if applicable
    if (i < list.length - 1) {
      if (commaSeparated) {
        stringList += ',&nbsp;';
      } else {
        stringList += '&nbsp;';
      }
    }
  }
  return stringList;
}

function getChildElement(el, id) {
  for (var i = 0; i < el.children.length; i++) {
    if (el.children[i].children.length != 0) {
      var found = getChildElement(el.children[i], id);
      if (found != -1) {
        return found;
      }
    }
    if (el.children[i].id == id) {
      return el.children[i];
    }
  }
  return -1;
}
