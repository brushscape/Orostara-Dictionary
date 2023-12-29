/* jshint esversion: 8 */

//var localFilePath = 'files/Oros_Eng_Dictionary.csv';
var filePath =
  "https://raw.githubusercontent.com/brushscape/Orostara-Dictionary/main/files/Oros_Eng_Dictionary.csv";
var langBreakdown = [];
var numWords = 0;
var properNouns = [];
var idealBreakdownNum = {
  "Mandarin Chinese": 113,
  Spanish: 58,
  English: 46,
  Hindi: 42,
  Bangla: 28,
  Portuguese: 28,
  Russian: 18,
  Japanese: 15,
  Cantonese: 10,
  Vietnamese: 10,
  Marathi: 10,
  Telugu: 10,
  Turkish: 10,
  "Wu Chinese": 10,
  Korean: 10,
  French: 10,
  Tamil: 9,
  German: 8,
  Arabic: 9,
  Urdu: 8,
  Javanese: 8,
  Punjabi: 8,
  Italian: 8,
  Gujarati: 7,
  Farsi: 7,
};

var alph = [
  "i",
  "e",
  "a",
  "o",
  "u",
  "m",
  "n",
  "p",
  "t",
  "k",
  "f",
  "s",
  "x",
  "h",
  "r",
  "y",
];

function readCSVFile() {
  $.get(filePath, function (csvdata) {
    var rowData = csvdata.split("\n");
    var colHeaders = rowData[0].split(",");

    for (var row = 1; row < rowData.length; row++) {
      var rowColData = rowData[row].split(",");
      var rowObj = {};
      for (var col = 0; col < rowColData.length - 1; col++) {
        if (rowColData[col].search("/") != -1) {
          rowObj[colHeaders[col].replace(/\s/g, "")] =
            rowColData[col].split("/");
        } else {
          rowObj[colHeaders[col].replace(/\s/g, "")] = rowColData[col];
        }
      }

      //alphabetize as we go
      var placed = false;
      for (var i = 0; i < orosDict.length; i++) {
        if (
          isAlphOrdered(
            rowObj.Orostara.toLowerCase(),
            orosDict[i].Orostara.toLowerCase(),
          )
        ) {
          orosDict.splice(i, 0, rowObj);
          placed = true;
          break;
        }
      }
      if (!placed) {
        orosDict.push(rowObj);
      }

      if (rowObj.Type == "proper") {
        properNouns.push(rowObj.Orostara);
      }

      //just to show the language breakdown in the console
      if (rowObj.RootLanguage != "Orostara" && rowObj.Type != "proper") {
        numWords++;
        var el = getCorrectLang(rowObj.RootLanguage);
        if (el != -1) {
          var count = langBreakdown[el].Count;
          count++;
          langBreakdown[el].Count = count;
          var num = (count / numWords) * 100;
          langBreakdown[el].Percent = num.toFixed(2);
        } else {
          var newEl = {
            Lang: rowObj.RootLanguage,
            Count: 1,
            Percent: (1 / numWords) * 100,
          };
          langBreakdown.push(newEl);
        }
      }
    }
    fillTable();
    cfillTable();
    //langAnalysis();
  });
}

function langAnalysis() {
  for (var i = 0; i < langBreakdown.length; i++) {
    var el = langBreakdown[i];
    if (idealBreakdownNum.hasOwnProperty(el.Lang)) {
      el.Diff = idealBreakdownNum[el.Lang] - el.Count;
    }
    if (el.Diff >= 0) {
      console.log(
        el.Count +
          "/" +
          idealBreakdownNum[el.Lang] +
          " " +
          el.Lang +
          " ( ADD " +
          el.Diff +
          " )",
      );
    } else {
      console.log(
        el.Count +
          "/" +
          idealBreakdownNum[el.Lang] +
          " " +
          el.Lang +
          " ( SUB " +
          el.Diff * -1 +
          " )",
      );
    }
  }
}

function getCorrectLang(lang) {
  for (var i = 0; i < langBreakdown.length; i++) {
    if (langBreakdown[i].Lang == lang) {
      return i;
    }
  }
  return -1;
}

//Unused. Just here if I need it
function alphabetizeArr(arr) {
  if (arr.length < 2) {
    return arr;
  } else if (arr.length == 2) {
    if (isAlphOrdered(arr[0].toLowerCase(), arr[1].toLowerCase())) {
      return arr;
    } else {
      return [arr[1], arr[0]];
    }
  } else {
    //length is greater than 2
    var first = arr.shift();
    var sorted = alphabetizeArr(arr);
    for (var i = 0; i < sorted.length; i++) {
      if (isAlphOrdered(first.toLowerCase(), sorted[i].toLowerCase())) {
        sorted.splice(i, 0, first);
        return sorted;
      }
    }
    //never placed
    sorted.push(first);
    return sorted;
  }
}

//alphabetically
function isAlphOrdered(el1, el2) {
  var maxLength = el1.length > el2.length ? el2.length : el1.length;
  for (var i = 0; i < maxLength; i++) {
    var el1Let = el1.charAt(i);
    var el2Let = el2.charAt(i);
    if (alph.indexOf(el1Let) != alph.indexOf(el2Let)) {
      return alph.indexOf(el1Let) < alph.indexOf(el2Let);
    } //else keep checking
  }

  //definitely identical to a point, but one may be longer than the other
  return el1.length <= el2.length; // put the longer one after
}
