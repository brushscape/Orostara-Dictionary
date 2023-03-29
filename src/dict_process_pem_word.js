/* jshint esversion: 8 */

function pemClick(searchedWord){
  clearPage();
  var lastChar = searchedWord.charAt(searchedWord.length-1);
  var endList = ['a', 'e', 'o', 'i', 'u'];
  var specialCases = ['na', 'nihao', 'mira', 'hera', 'meta', 'para', 'suta', 'jusa', 'esta', 'arsa', 'koka', 'jina'];
  var otherWord = '';
  if(specialCases.indexOf(searchedWord) == -1 && endList.indexOf(lastChar) != -1){
    searchedWord = searchedWord.substring(0, searchedWord.length-1);
  }
  if(searchedWord.length>3 && searchedWord.substring(searchedWord.length-2) == 'an'){
    otherWord = searchedWord.substring(0, searchedWord.length-2);
  }

  var found = pemEntry(searchedWord, otherWord);
  if(found == 1){
    incMemory('Pemtara',searchedWord);
  }else if(found == 2){
    incMemory('Pemtara',otherWord);
  }else if(found == 3){
    incMemory('Pemtara2',[searchedWord,otherWord]);
  }
}

function pemEntry(searchedWord, otherWord){
  var entry1 = searchPemtara(searchedWord);
  var entry2 = 0;
  if(otherWord != ''){
    entry2 = searchPemtara(otherWord);
  }
  if(entry1 == 0 && entry2 == 0){
    document.getElementById('notFoundPem').style.display='flex';
    return 0;
  }else if(entry1 == 0 || entry2 == 0){
    if(entry1 == 0){
      displayEntry(entry2,'',true);
      return 2;
    }else{
      displayEntry(entry1,'',true);
      return 1;
    }
  }else{
    displayEntryArry([entry1,entry2],'');
    return 3;
  }
}

function searchPemtara(word){
  for(var i=0; i<pemtaraDict.length; i++){
    if(pemtaraDict[i].Pemtara == word){
      return pemtaraDict[i];
    }
  }
  return 0;
}
