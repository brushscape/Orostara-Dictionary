/* jshint esversion: 8 */

var pemtaraDict = [];

function clearPage(){
  document.getElementById('notFoundEng').style.display='none';
  document.getElementById('notFoundPem').style.display='none';
  document.getElementById('wordDefContainer').style.display='none';
  document.getElementById('extraWordDefs').innerHTML = "";
}

function setupButtons(){
  $('#searchBar').keyup(function(event) {
      if (event.which == 13) {//if enter key
          translateClicked();
          this.select();
          event.preventDefault();
       }
  });

  $('#langSelect').click(function(event) {
      if(this.innerHTML == 'Pemtara'){
        this.innerHTML = 'English';
      }else{
        this.innerHTML = 'Pemtara';
      }
      document.getElementById('searchBar').select();
  });
}

function translateClicked(){
  var searchedWord = cleanupTextInput(document.getElementById('searchBar').value);
  if(document.getElementById('langSelect').innerHTML == 'Pemtara'){
    pemClick(searchedWord);
  }else{
    engClick(searchedWord);
  }
}

function cleanupTextInput(input){
  //cleanup whitespace as front
  while(input.length > 0 && input.charAt(0) == ' '){
    input = input.substring(1);
  }
  //cleanup whitespace at back
  while(input.length > 0 && input.charAt(input.length-1) == ' '){
    input = input.substring(0,input.length-1);
  }
  return input.toLowerCase();
}

function displayEntryArry(entryArr, searchedTerm){
  displayEntry(entryArr[0], searchedTerm, true);

  if(entryArr.length != 1){
    for(var i=1; i<entryArr.length; i++){
      var originDef = document.getElementById('wordDef');
      var extraContainer = document.getElementById('extraWordDefs');

      var newDef = originDef.cloneNode(true);
      displayEntry(entryArr[i], searchedTerm, false, newDef);
      extraContainer.appendChild(newDef);
    }
  }
}

function displayEntry(entry, searchedTerm, only, el){
  var wordDefEl;
  // in case there's going to be more than one definition displayed
  if(only){
    wordDefEl = document.getElementById('wordDef');
  }else{
    wordDefEl = el;
  }
  var childEl;

  getChildElement(wordDefEl,'word').innerHTML = entry.Pemtara;

  getChildElement(wordDefEl,'etym').innerHTML = 'from&nbsp;'+displayRootWord(entry.RLWord, entry.RootLanguage) +'&nbsp;in '+entry.RootLanguage;

  // display Notes and Other in the same section right under the word definition
  if(entry.Notes + entry.Other == ''){ // skip if no notes or other
    getChildElement(wordDefEl,'def').style.display = 'none';
  }else{
    childEl = getChildElement(wordDefEl,'def');
    console.log()
    if(entry.Notes == ''){
      getChildElement(childEl,'notes').style.display='none';
    }else{
      getChildElement(childEl,'notes').innerHTML='*'+entry.Notes;
      getChildElement(childEl,'notes').style.display='flex';
    }

    if(entry.Other ==''){
      getChildElement(childEl,'other').style.display='none';
    }else{
      getChildElement(childEl,'other').innerHTML = displayWordList(entry.Other, searchedTerm, true);
      getChildElement(childEl,'other').style.display='flex';
    }

    childEl.style.display = 'flex';
  }

  if(entry.Nouns == ''){
    getChildElement(wordDefEl,'nounContain').style.display = 'none';
  }else{
    childEl = getChildElement(wordDefEl,'noun');
    childEl.innerHTML = '<b>'+entry.Pemtara+'a </b>&nbsp;';
    childEl = getChildElement(wordDefEl,'nounFill');
    childEl.innerHTML = '&nbsp;&nbsp;'+displayWordList(entry.Nouns, searchedTerm, true);
    getChildElement(wordDefEl,'nounContain').style.display = 'flex';
  }

  if(entry.Verbs == ''){
    getChildElement(wordDefEl,'verbContain').style.display = 'none';
  }else{
    childEl = getChildElement(wordDefEl,'verb');
    childEl.innerHTML = '<b>'+entry.Pemtara+'o </b>&nbsp;';
    childEl = getChildElement(wordDefEl,'verbFill');
    childEl.innerHTML = '&nbsp;&nbsp;'+displayWordList(entry.Verbs, searchedTerm, true);
    getChildElement(wordDefEl,'verbContain').style.display = 'flex';
  }

  if(entry.Descriptors == ''){
    getChildElement(wordDefEl,'desContain').style.display = 'none';
  }else{
    childEl = getChildElement(wordDefEl,'des');
    childEl.innerHTML = '<b>'+entry.Pemtara+'i / '+entry.Pemtara+'e </b>&nbsp;';
    childEl = getChildElement(wordDefEl,'desFill');
    childEl.innerHTML = '&nbsp;&nbsp;'+displayWordList(entry.Descriptors, searchedTerm, true);
    getChildElement(wordDefEl,'desContain').style.display = 'flex';
  }

  document.getElementById('wordDefContainer').style.display='flex';
}

function displayRootWord(word, lang){
  var italics = ["English", "Spanish", "French", "Italian", "Portuguese", "Javanese", "Vietnamese", "German"];

  if(italics.indexOf(lang) != -1){
    return "<i>"+word.toLowerCase()+"</i>";
  }else if (lang == "Pemtara"){
    var word1 = cleanupTextInput(word);
    if(word1.indexOf(' ') == -1){
      //only one word
      return returnLink(word1,1);
    }else {
      var word1 = cleanupTextInput(word);
      var words = word1.split(' ');
      return returnLink(words[0],1)+"&nbsp;and&nbsp;"+returnLink(words[1],2);
    }
  }else{
    return word.toLowerCase();
  }

}

function gotoWord1(){
  gotoWord(document.getElementById('1').innerHTML);
}

function gotoWord2(){
  gotoWord(document.getElementById('2').innerHTML);
}
function gotoWord(word){
  var entry = searchPemtara(word);
  displayEntry(entry,'',true);
  incMemory('Pemtara',word);
}

function returnLink(word,num){
  if(searchPemtara(word) != 0){
    return "<u><div class='pemLinkWord' id='"+num+"' onclick='gotoWord"+num+"()'>"+word+"</div></u>";
  }
  else if(word == '' || word == 'N,A'){
    return '?';
  }else{
    return word;
  }
}

//given an array and the English searched word if applicable
//commaSeparated is a true false so that this function can recurse
function displayWordList(list1, searched, commaSeparated){
  var j, multiDef, newString;

  var list = list1;
  if(!Array.isArray(list1)){
    list = [list1];
  }

  var stringList = '';
  for(var i=0; i<list.length; i++){
    //element in list matches searched english term
    if(list[i] == searched){
      stringList += '<u>'+ list[i] + '</u>';
    }
    //element in list has more than one word
    else if(list[i].indexOf(' ') != -1){
      stringList += displayWordList(list[i].split(' '),searched,false);
    }
    //element doesn't match and is only one word
    else{
      stringList += list[i];
    }

    //spacing for next entry if applicable
    if(i<list.length-1){
      if(commaSeparated){
        stringList+=',&nbsp;';
      }else{
        stringList+='&nbsp;';
      }
    }
  }
  return stringList;
}

function getChildElement(el, id){
  for(var i=0; i<el.children.length; i++){
    if(el.children[i].children.length != 0){
      var found = getChildElement(el.children[i],id);
      if(found != -1){
        return found;
      }
    }
    if(el.children[i].id == id){
      return el.children[i];
    }
  }
  return -1;
}
