/* jshint esversion: 8 */

//var localFilePath = 'files/Pemtara_Eng_Dictionary.csv';
var filePath = 'https://raw.githubusercontent.com/brushscape/Pemtara-Dictionary/main/files/Pemtara_Eng_Dictionary.csv';
var basicWords = 0;
var constructWords = 0;

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
      }
      fillTable();
  });
}
