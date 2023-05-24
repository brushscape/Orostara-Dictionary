/* jshint esversion: 8 */

//var localFilePath = 'files/Oros_Eng_Dictionary.csv';
var filePath = 'https://raw.githubusercontent.com/brushscape/Orostara-Dictionary/main/files/Oros_Eng_Dictionary.csv';
var langBreakdown = [];
var numWords = 0;
var properNouns = [];
var idealBreakdown = { 'Mandarin Chinese': 22.28, 'Spanish': 11.5, 'English': 9.03, 'Hindi': 5.67, 'Bangla': 5.67, 'Portuguese': 5.62, 'Russian': 3.73, 'Japanese': 3.03, 'Cantonese': 2.06, 'Vietnamese': 2.05, 'Marathi': 2.01, 'Telugu': 2, 'Turkish': 1.99, 'Shanghainese': 1.98, 'Korean': 1.98, 'French': 1.93, 'Tamil': 1.9, 'German': 1.83, 'Arabic': 1.81, 'Urdu': 1.7, 'Javanese': 1.65, 'Punjabi': 1.61, 'Italian': 1.57, 'Gujarati': 1.38, 'Persian': 1.37 };

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
      orosDict.push(rowObj);

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
