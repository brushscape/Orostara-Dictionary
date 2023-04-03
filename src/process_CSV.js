/* jshint esversion: 8 */

//var localFilePath = 'files/Pemtara_Eng_Dictionary.csv';
var filePath = 'https://raw.githubusercontent.com/brushscape/Pemtara-Dictionary/main/files/Pemtara_Eng_Dictionary.csv';
var langBreakdown = [];
var numWords = 0;

function readCSVFile(){
  $.get(filePath, function (csvdata) {
      var rowData = csvdata.split('\n');
      var colHeaders = rowData[0].split(',');


      for (var row = 1; row < rowData.length; row++) {
        var rowColData = rowData[row].split(',');
        var rowObj = {};
        for (var col = 0; col < rowColData.length-1; col++) {
          if(rowColData[col].search('/') != -1){
            rowObj[colHeaders[col].replace(/\s/g, "")] = rowColData[col].split('/');
          }else{
            rowObj[colHeaders[col].replace(/\s/g, "")] = rowColData[col];
          }
        }
        pemtaraDict.push(rowObj);

        if(rowObj.RootLanguage != 'Pemtara'){
          numWords++;
        }

        var el = getCorrectLang(rowObj.RootLanguage);
        if(el!=-1){
          var count = langBreakdown[el].Count;
          count++;
          langBreakdown[el].Count = count;
          langBreakdown[el].Percent = (count/numWords)*100;
        }else{
          var newEl = {Lang: rowObj.RootLanguage, Count: 1, Percent: (1/numWords)*100};
          langBreakdown.push(newEl);
        }


      }
      fillTable();
      console.log(langBreakdown);
  });
}

function getCorrectLang(lang){
  for(var i=0; i<langBreakdown.length; i++){
    if(langBreakdown[i].Lang == lang){
      return i;
    }
  }
  return -1;
}
