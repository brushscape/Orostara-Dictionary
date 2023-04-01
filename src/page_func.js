/* jshint esversion: 8 */

var currPage = 'translator';
var quickPage = 'partsOfSpeech';

function load(){
  readCSVFile();
  setupMenuButtons();
  setupDictionarySearch();
}

function setupDictionarySearch(){
  updateForBackButtons();
  setupButtons();
}

function setupMenuButtons(){
  document.getElementById('translatorPg').style.borderColor = 'var(--white)';
  document.getElementById('quickMenu').style.display = 'none';
  $('.menuItem').click(function(event) {
      var page;
      var str = this.innerHTML.substring(0,4).toLowerCase();
      var quick = false;
      switch(str){
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
        default:
          page = '';
      }

      if(!quick){
        document.getElementById('quickMenu').style.display = 'none';
        document.getElementById('quickStartPg').style.borderColor = 'var(--dark)';
      }else{
        document.getElementById('quickStartPg').style.borderColor = 'var(--white)';
        document.getElementById('quickMenu').style.display = 'flex';
        document.getElementById(quickPage+'Pg').style.borderColor = 'var(--white)';
      }

      if(currPage != page){
        document.getElementById(currPage).style.display = 'none';
        document.getElementById(page).style.display = 'flex';
        document.getElementById(currPage+'Pg').style.borderColor = 'var(--dark)';
        this.style.borderColor = 'var(--white)';
        currPage = page;
      }
  });

}
