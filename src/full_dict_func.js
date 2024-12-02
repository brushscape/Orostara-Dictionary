//TODO add popup dict entries if you click on a row
//TODO Add loading icon

var prev = "full";
var currDict = "full";

function onDropHover() {
  $(".menuItem").hover(function (event) {});
}

function fillTable() {
  document.getElementById("loading").style.display = "flex";
  var containerEl = document.getElementById("fullDictTable");
  var baseEl = document.getElementById("dictDataRow");
  for (var i = 0; i < orosDict.length; i++) {
    var rowObj = orosDict[i];
    var wordTypes;
    if (Array.isArray(rowObj.Type)) {
      wordTypes = rowObj.Type;
      if (rowObj.Type.indexOf("basic") == -1) {
        wordTypes.push("construct");
      }
    } else if (rowObj.Type == "") {
      wordTypes = ["construct"];
    } else {
      wordTypes = [rowObj.Type];
    }

    var row = baseEl.cloneNode(true);
    row.id = rowObj.Orostara;
    row.classList.add(...wordTypes);
    row.children[0].innerHTML = rowObj.Orostara;
    row.children[1].innerHTML = simpleListDisplay(rowObj.Nouns);
    row.children[2].innerHTML = simpleListDisplay(rowObj.Verbs);
    row.children[3].innerHTML = simpleListDisplay(rowObj.Adjectives);
    row.children[4].innerHTML = simpleListDisplay(rowObj.Adverbs);
    row.children[5].innerHTML = simpleListDisplay(rowObj.Other);
    row.children[6].innerHTML = simpleListDisplay(rowObj.Notes);
    row.style.display = "inlineBlock";
    containerEl.appendChild(row);
  }

  baseEl.style.display = "none";
  document.getElementById("numWords").innerHTML = orosDict.length;
  showOnly(currDict);
}

function showOnly(type) {
  if (type == prev) {
    showLoadedDict();
    return;
  }
  currDict = type;
  var fullTable = document.getElementById("fullDictTable");
  var counter = 0;

  for (var i = 1; i < fullTable.children.length; i++) {
    var el = fullTable.children[i];
    if (el.classList.contains(type) || type == "full") {
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

  var but = document.getElementById("dropbtn");
  var string = "";
  switch (type) {
    case "basic":
      string += "Basic Words";
      break;
    case "construct":
      string += "Constructed Words";
      break;
    case "swear":
      string += "Swear Words";
      break;
    case "slang":
      string += "Slang Words";
      break;
    case "full":
      string += "Full Dictionary";
      break;
    case "proper":
      string += "Proper Nouns";
      break;
    default:
      string += "Help";
      break;
  }
  string += "&nbsp;<span style='font-size: var(--midSize);'>&#9660</span>"; // arrow
  but.innerHTML = string;

  document.getElementById("drop" + type).setAttribute("disabled", "");
  document.getElementById("drop" + prev).removeAttribute("disabled");
  prev = type;

  document.getElementById("numWords").innerHTML = counter;
  showLoadedDict();
}

function showLoadedDict() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("fullDict").style.display = "flex";
}
