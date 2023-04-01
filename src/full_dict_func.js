var prev = 'full';

function fillTable(){
  var containerEl = document.getElementById('fullDictTable');
  var baseEl = document.getElementById('dictDataRow');

  for(var i=0; i<pemtaraDict.length; i++){
    var rowObj = pemtaraDict[i];

    var wordTypes;
    if(Array.isArray(rowObj.Type)){
      wordTypes = rowObj.Type;
      if(rowObj.Type.indexOf('basic') == -1){
        wordTypes.push('construct');
      }else{
        basicWords++;
      }
    }
    else if(rowObj.Type == ''){
      wordTypes = ['construct'];
    }
    else{
      wordTypes = [rowObj.Type];
    }

    if(wordTypes.indexOf('basic') != -1){
      basicWords++;
    }else{
      constructWords++;
    }

    var row = baseEl.cloneNode(true);
    row.id = rowObj.Pemtara;
    row.classList.add(...wordTypes)
    row.children[0].innerHTML = rowObj.Pemtara;
    row.children[1].innerHTML = simpleListDisplay(rowObj.Nouns);
    row.children[2].innerHTML = simpleListDisplay(rowObj.Verbs);
    row.children[3].innerHTML = simpleListDisplay(rowObj.Descriptors);
    row.children[4].innerHTML = simpleListDisplay(rowObj.Other);
    row.children[5].innerHTML = simpleListDisplay(rowObj.Notes);
    row.style.display = 'inlineBlock';
    containerEl.appendChild(row);
  }

  baseEl.style.display = 'none';
  document.getElementById('numWords').innerHTML = pemtaraDict.length;

}

function simpleListDisplay(array){
  if(!Array.isArray(array)){
    return array.toLowerCase();
  }
  var string='';
  for(i=0; i<array.length; i++){
    if(i < array.length-1){
      string += array[i] + ', ';
    }else{
      string += array[i];
    }
  }
  return string.toLowerCase();
}


function showOnly(type){
  if(type==prev){
    return;
  }

  var fullTable = document.getElementById('fullDictTable');
  var counter = 0;

  for(var i=1;i<fullTable.children.length;i++){
    var el = fullTable.children[i];
    if(el.classList.contains(type) || type == 'full'){
      el.style.display = 'table-row';
      console.log('why');
      if(counter%2 == 0){
        el.style.backgroundColor = 'var(--grey)';
      }else{
        el.style.backgroundColor = 'white';
      }
      counter++;
    }else{
      el.style.display = 'none';
    }
  }

  var but = document.getElementById('dropbtn');
  switch(type){
    case 'basic':
      but.innerHTML = 'Basic Words';
      break;
    case 'construct':
      but.innerHTML = 'Constructed Words';
      break;
    case 'swear':
      but.innerHTML = 'Swear Words';
      break;
    case 'slang':
      but.innerHTML = 'Slang Words';
      break;
    case 'full':
      but.innerHTML = 'Full Dictionary';
      break;
    default:
      but.innerHTML = 'Help';
      break;
  }
  document.getElementById('drop'+type).style.display = 'none';
  document.getElementById('drop'+prev).style.display = 'block';
  prev = type;

  document.getElementById('numWords').innerHTML = counter;
}
