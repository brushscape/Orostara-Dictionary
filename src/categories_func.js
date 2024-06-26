var cprev = "na";

// function onDropHover() {
//   $('.menuItem').hover(function(event) {

//   });
// }

function cfillTable() {
  var containerEl = document.getElementById("categoryDictTable");
  var baseEl = document.getElementById("categoryDataRow");

  var orderedEl = [];
  for (var i = 0; i < orosDict.length; i++) {
    // iterate through entire dictionary
    var rowObj = orosDict[i];

    var wordTypes;
    if (rowObj.Category == "" || rowObj.Category == " ") {
      wordTypes = [];
      continue;
    } else if (Array.isArray(rowObj.Category)) {
      wordTypes = rowObj.Category;
    } else {
      wordTypes = [rowObj.Category];
    }

    var row = baseEl.cloneNode(true);
    row.id = rowObj.Orostara;
    row.classList.add(...wordTypes);

    if (rowObj.CatRel == "verb") {
      row.children[0].innerHTML = rowObj.Orostara + "o";
      row.children[1].innerHTML = simpleListDisplay(rowObj.Verbs);
    } else if (rowObj.CatRel == "adj") {
      row.children[0].innerHTML = rowObj.Orostara + "i";
      row.children[1].innerHTML = simpleListDisplay(rowObj.Adjectives);
    } else if (rowObj.CatRel == "adv") {
      row.children[0].innerHTML = rowObj.Orostara + "e";
      row.children[1].innerHTML = simpleListDisplay(rowObj.Adverbs);
    } else if (rowObj.CatRel == "oth") {
      row.children[0].innerHTML = rowObj.Orostara;
      row.children[1].innerHTML = simpleListDisplay(rowObj.Other);
    } else {
      row.children[0].innerHTML = rowObj.Orostara + "a";
      row.children[1].innerHTML = simpleListDisplay(rowObj.Nouns);
    }

    if (rowObj.CatOrder != "") {
      orderedEl.push({ el: row, order: parseInt(rowObj.CatOrder, 10) });
    } else {
      containerEl.appendChild(row);
    }

    //sort array
    var arr = orderedEl;
    orderedEl = sortArray(arr);

    //insert at top
    for (var j = 0; j < orderedEl.length; j++) {
      containerEl.insertBefore(
        orderedEl[orderedEl.length - 1 - j].el,
        containerEl.childNodes[2],
      );
    }
  }

  cShowOnly("color");
  baseEl.style.display = "none";
}

//array element has 2 properties, el and order
//order is an integer and the only number that matters in this case
//not the prettiest I know but it works
function sortArray(arr) {
  if (arr.length < 2) {
    return arr;
  }
  var lastEl = arr.pop();
  var newArray = sortArray(arr);
  var added = false;
  for (var i = 0; i < newArray.length; i++) {
    if (newArray[i].order > lastEl.order) {
      newArray.splice(i, 0, lastEl);
      added = true;
      break;
    }
  }
  if (!added) {
    newArray.push(lastEl);
  }
  return newArray;
}

function cShowOnly(type) {
  if (type == cprev) {
    return;
  }

  var fullTable = document.getElementById("categoryDictTable");

  var counter = 0;
  for (var i = 1; i < fullTable.children.length; i++) {
    var el = fullTable.children[i];
    if (el.classList.contains(type)) {
      el.style.display = "table-row";
      if (counter % 2 == 1) {
        el.style.backgroundColor = "var(--lightlight2)";
      } else {
        el.style.backgroundColor = "white";
      }
      counter++;
    } else {
      el.style.display = "none";
    }
  }

  var but = document.getElementById("cdropbtn");
  var string = "";
  switch (type) {
    case "color":
      string += "Colors";
      break;
    case "number":
      string += "Numbers";
      break;
    case "food":
      string += "Food";
      break;
    case "animal":
      string += "Animals";
      break;
    case "plant":
      string += "Plants";
      break;
    case "interjection":
      string += "Interjections";
      break;
    case "nature":
      string += "Nature";
      break;
    case "fantasy":
      string += "Fantasy";
      break;
    case "space":
      string += "Outer Space";
      break;
    case "body":
      string += "Anatomy";
      break;
    case "measurement":
      string += "Measurements";
      break;
    case "direction":
      string += "Directions";
      break;
    case "language":
      string += "Languages";
      break;
    case "country":
      string += "Countries";
      break;
    case "continent":
      string += "Continents";
      break;
    case "economy":
      string += "Economy";
      break;
    case "week":
      string += "Days of the Week";
      break;
    case "month":
      string += "Months of the Year";
      break;
    case "value":
      string += "Values";
      break;
    default:
      string += "Help";
      break;
  }
  string += "&nbsp;<span style='font-size: var(--midSize);'>&#9660</span>"; // arrow
  but.innerHTML = string;

  document.getElementById("cdrop" + type).setAttribute("disabled", "");
  if (cprev != "na") {
    document.getElementById("cdrop" + cprev).removeAttribute("disabled");
    //document.getElementById("cdropdown").style.display = "none";
  }
  cprev = type;

  // document.getElementById('numWords').innerHTML = counter;
}
