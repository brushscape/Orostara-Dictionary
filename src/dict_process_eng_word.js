/* jshint esversion: 8 */

function engClick(searchedWord){
  clearPage();
  var found = engEntry(searchedWord);
  if(found){
    incMemory('English',searchedWord);
  }
}

function engEntry(searchedWord){
  if(searchedWord.length == 0){
    document.getElementById('notFoundEng').style.display='flex';
    return false;
  }
  var entryArr = searchEnglish(searchedWord);
  if(entryArr.length == 0){
    document.getElementById('notFoundEng').style.display='flex';
    return false;
  }else{
    displayEntryArry(entryArr,searchedWord);
    return true;
  }
}

function searchEnglish(word){
  var entryArr = [];

  //go through every dictionary entry
  for(var i=0; i<pemtaraDict.length; i++){
    var entriesToCheck = [pemtaraDict[i].Nouns,pemtaraDict[i].Verbs,pemtaraDict[i].Adjectives,pemtaraDict[i].Adverbs,pemtaraDict[i].Other];

    for(var j=0; j<entriesToCheck.length; j++){
      //search each entry option
      var array = entriesToCheck[j];
      if(!Array.isArray(array)){
        if(array == ''){ //skip if entry is empty
          continue;
        }
        array = [entriesToCheck[j]];
      }
      if(arrayHasWord(array, word)){
        //word found in this entry. skip to next entry
        entryArr.push(pemtaraDict[i]);
        break;
      }
    }
  }
  return entryArr;
}

function arrayHasWord(arr, word1){
  var word = word1.toLowerCase();
  //search through array
  for(var j=0; j<arr.length; j++){

    //cleanup
    var check = arr[j];

    //check for a match
    if(check.toLowerCase() == word){
      return true;
    }

    //if array element is more than one word
    if(check.indexOf(' ') != -1){
      //make array with both words
      var multiDef = check.split(' ');
      //recurse
      if(arrayHasWord(multiDef,word)){
        return true;
      }
    }
  }
  return false;
}
