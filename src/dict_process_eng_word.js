/* jshint esversion: 8 */

function engClick(){
  clearPage();
  var searchedWord = cleanupTextInput(document.getElementById('engSearchBar').value);
  var found = engEntry(searchedWord);
  if(found){
    incMemory('English',searchedWord);
  }
}

function engEntry(searchedWord){
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
    var j;

    //search nouns in an entry first
    var array = pemtaraDict[i].Nouns;
    if(!Array.isArray(array)){
      array = [pemtaraDict[i].Nouns];
    }
    if(arrayHasWord(array, word)){
      //word found in this entry. skip to next entry
      entryArr.push(pemtaraDict[i]);
      continue;
    }

    //now verbs
    array = pemtaraDict[i].Verbs;
    if(!Array.isArray(array)){
      array = [pemtaraDict[i].Verbs];
    }
    if(arrayHasWord(array, word)){
      //word found in this entry. skip to next entry
      entryArr.push(pemtaraDict[i]);
      continue;
    }

    //descriptors
    array = pemtaraDict[i].Descriptors;
    if(!Array.isArray(array)){
      array = [pemtaraDict[i].Descriptors];
    }
    if(arrayHasWord(array, word)){
      //word found in this entry. skip to next entry
      entryArr.push(pemtaraDict[i]);
      continue;
    }

    //other
    array = pemtaraDict[i].Other;
    if(!Array.isArray(array)){
      array = [pemtaraDict[i].Other];
    }
    if(arrayHasWord(array, word)){
      //word found in this entry. skip to next entry
      entryArr.push(pemtaraDict[i]);
      continue;
    }

  }
  return entryArr;
}

function arrayHasWord(arr, word){
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
