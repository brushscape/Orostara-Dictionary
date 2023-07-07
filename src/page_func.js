/* jshint esversion: 8 */

var currPage = 'translator';
var quickPage = 'partsOfSpeech';

function load() {
  readCSVFile();
  setupMenuButtons();
  setupDictionarySearch();
}

function setupDictionarySearch() {
  updateForBackButtons();
  setupButtons();
}

function setupMenuButtons() {
  document.getElementById('quickMenu').style.display = 'none';
  $('.menuItem').click(function(event) {
    var page;
    var str = this.innerHTML.substring(0, 4).toLowerCase();
    var quick = false;
    switch (str) {
      case 'tran':
        page = 'translator';
        break;
      case 'quic':
        page = quickPage;
        quick = true;
        break;
      case 'part':
        page = 'partsOfSpeech';
        quickPage = 'partsOfSpeech';
        quick = true;
        break;
      case 'comm':
        page = 'prefixSuffix';
        quickPage = 'prefixSuffix';
        quick = true;
        break;
      case 'hono':
        page = 'honorifics';
        quickPage = 'honorifics';
        quick = true;
        break;
      case 'link':
        page = 'links';
        break;
      case 'full':
        page = 'fullDict';
        break;
      case 'cate':
        page = 'category';
        break;
      default:
        page = '';
    }

    if (!quick) {
      document.getElementById('quickMenu').style.display = 'none';
      document.getElementById('quickStartPg').classList.remove('activeSpecial');
    } else {
      document.getElementById('quickStartPg').classList.add('activeSpecial');
      document.getElementById('quickMenu').style.display = 'flex';
    }

    if (currPage != page) {
      document.getElementById(currPage).style.display = 'none';
      document.getElementById(page).style.display = 'flex';

      var tab = document.getElementById(currPage + 'Pg');
      if (tab.classList.contains('quickItem')) { //reset colors
        tab.classList.remove('quickActive');
      } else {
        tab.classList.remove('active');
      }

      tab = document.getElementById(page + 'Pg');
      if (tab.classList.contains('quickItem')) { //select colors
        tab.classList.add('quickActive');
      } else {
        tab.classList.add('active');
      }
      currPage = page;
    }
  });

}
