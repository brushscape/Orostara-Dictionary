/* jshint esversion: 8 */

var currPage = 'translator';

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
  $('.menuItem').click(function(event) {
      var page;
      var str = this.innerHTML.substring(0,4).toLowerCase();
      switch(str){
        case 'tran':
          page = 'translator';
          break;
        case 'part':
          page = 'partsOfSpeech';
          break;
        case 'comm':
          page = 'prefixSuffix';
          break;
        case 'hono':
          page = 'honorifics';
          break;
        default:
          page = '';
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
