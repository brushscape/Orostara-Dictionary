/* jshint esversion: 8 */

function pemClick(searchedWord){
  clearPage();
  var lastChar = searchedWord.charAt(searchedWord.length-1);
  var endList = ['a', 'e', 'o', 'i', 'u'];
  var specialCases = ['siki','naki','ki','ha','ye','je','na', 'mira', 'hera', 'meta', 'para', 'suta', 'jusa', 'esta', 'arsa', 'koka', 'kina'];
  var otherWord = '';
  if(specialCases.indexOf(searchedWord) == -1 && endList.indexOf(lastChar) != -1){
    searchedWord = searchedWord.substring(0, searchedWord.length-1);
  }else if(searchedWord.length>3 && searchedWord.substring(searchedWord.length-2) == 'an'){
    otherWord = searchedWord.substring(0, searchedWord.length-2);
  }
  if(searchedWord == 'yen'){
    searchedWord = 'ye';
  }
  if(searchedWord == 'jen'){
    searchedWord = 'je';
  }

  var found = pemEntry(searchedWord, otherWord);
  if(found == 1){
    incMemory('Pemtara',searchedWord);
  }else if(found == 2){
    incMemory('Pemtara',otherWord);
  }else if(found == 3){ // incase they search a word like 'kanan' which could be 'kanan' without an ending or 'kan' with an ending
    incMemory('Pemtara2',[searchedWord,otherWord]);
  }
}

function pemEntry(searchedWord, otherWord){
  var entry1 = searchPemtara(searchedWord);
  var entry2 = [];
  if(otherWord != ''){
    entry2 = searchPemtara(otherWord);
  }
  if(entry1.length == 0 && entry2.length == 0){
    document.getElementById('notFoundPem').style.display='flex';
    return 0;
  }else{
    var full = pushArray(entry1,entry2);
    displayEntryArry(full,'');
    if(entry1.length != 0){
      if(entry2.length !=0){
        return 3;
      }else{
        return 1;
      }
    }else{
      return 2;
    }
  }
}

function searchPemtara(word1){
  var entryArr = [];
  var word = word1.toLowerCase();
  //check every word in case there's more than one (rare but not unheardof)
  for(var i=0; i<pemtaraDict.length; i++){
    var checkWord = pemtaraDict[i].Pemtara.toLowerCase();
    if(checkWord == word){
      entryArr.push(pemtaraDict[i]);
    }
  }
  return entryArr;
}

function pushArray(base, add){
  var newArr = base;
  for(var i=0;i<add.length;i++){
    newArr.push(add[i]);
  }
  return newArr;
}
