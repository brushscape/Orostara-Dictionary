/* jshint esversion: 8 */

var filePath = 'files/Pemtara_Eng_Dictionary.csv';
var testPath = 'files/test.csv';

function readCSVFile(){
  $.get(filePath, function (data) {
        //var file = document.getElementById("csvFile").files[0];

        var reader = new FileReader();
        reader.readAsText(data);

        reader.onload = function(event) {
          var csvdata = event.target.result;
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
        };
    });

  console.log('done');
}
