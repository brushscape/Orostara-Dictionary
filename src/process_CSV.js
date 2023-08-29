/* jshint esversion: 8 */

//var localFilePath = 'files/Oros_Eng_Dictionary.csv';
var filePath = 'https://raw.githubusercontent.com/brushscape/Orostara-Dictionary/main/files/Oros_Eng_Dictionary.csv';
var langBreakdown = [];
var numWords = 0;
var properNouns = [];
var idealBreakdown = { 'Mandarin Chinese': 22.28, 'Spanish': 11.5, 'English': 9.03, 'Hindi': 5.67, 'Bangla': 5.67, 'Portuguese': 5.62, 'Russian': 3.73, 'Japanese': 3.03, 'Cantonese': 2.06, 'Vietnamese': 2.05, 'Marathi': 2.01, 'Telugu': 2, 'Turkish': 1.99, 'Shanghainese': 1.98, 'Korean': 1.98, 'French': 1.93, 'Tamil': 1.9, 'German': 1.83, 'Arabic': 1.81, 'Urdu': 1.7, 'Javanese': 1.65, 'Punjabi': 1.61, 'Italian': 1.57, 'Gujarati': 1.38, 'Persian': 1.37 };
var alph = ['i', 'e', 'a', 'o', 'u', 'm', 'n', 'p', 't', 'k', 'j', 's', 'f', 'h', 'r', 'y'];

function readCSVFile() {
  $.get(filePath, function(csvdata) {
    var rowData = csvdata.split('\n');
    var colHeaders = rowData[0].split(',');


    for (var row = 1; row < rowData.length; row++) {
      var rowColData = rowData[row].split(',');
      var rowObj = {};
      for (var col = 0; col < rowColData.length - 1; col++) {
        if (rowColData[col].search('/') != -1) {
          rowObj[colHeaders[col].replace(/\s/g, "")] = rowColData[col].split('/');
        } else {
          rowObj[colHeaders[col].replace(/\s/g, "")] = rowColData[col];
        }
      }

      //alphabetize as we go
      var placed = false;
      for (var i = 0; i < orosDict.length; i++) {
        if (isAlphOrdered(rowObj.Orostara.toLowerCase(), orosDict[i].Orostara.toLowerCase())) {
          orosDict.splice(i, 0, rowObj);
          placed = true;
          break;
        }
      }
      if (!placed) {
        orosDict.push(rowObj);
      }


      if (rowObj.Type == 'proper') {
        properNouns.push(rowObj.Orostara);
      }

      //just to show the language breakdown in the console
      if (rowObj.RootLanguage != 'Orostara' && rowObj.Type != 'proper') {
        numWords++;
        var el = getCorrectLang(rowObj.RootLanguage);
        if (el != -1) {
          var count = langBreakdown[el].Count;
          count++;
          langBreakdown[el].Count = count;
          var num = (count / numWords) * 100;
          langBreakdown[el].Percent = num.toFixed(2);
        } else {
          var newEl = { Lang: rowObj.RootLanguage, Count: 1, Percent: (1 / numWords) * 100 };
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
    if (idealBreakdown.hasOwnProperty(el.Lang)) {
      var diff = el.Percent - idealBreakdown[el.Lang];
      el.Diff = diff.toFixed(2);
    }
    if (el.Diff >= 0) {
      //console.log(el.Count + " " + el.Lang + ": " + el.Percent + " (" + el.Diff + " too much)");
    } else {
      console.log(el.Count + " " + el.Lang + ": " + el.Percent + " (Add " + (el.Diff * (-1)) + ")");
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
  } else { //length is greater than 2
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
    if (alph.indexOf(el1Let) == alph.indexOf(el2Let)) {
      continue;
    } else if (alph.indexOf(el1Let) > alph.indexOf(el2Let)) {
      return false;
    } else {//2 is definitely after 1
      return true;
    }
  }

  //definitely identical to a point, but one may be longer than the other
  return el1.length <= el2.length; // put the longer one after
}
