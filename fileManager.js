'use strict';

var files = [];
var totalSize = 0;
var showList = false;

activate();

function activate() {
  document.getElementById('files').addEventListener('change', addFile, false);
  document.getElementById('switcher').addEventListener('click', toggleView, false);
  document.getElementById('switcher').innerHTML = 'Show List View';
  render();
}

function addFile(ev) {
  files.push(ev.target.files[0]);
  totalSize += ev.target.files[0].size;
  render();
}

function removeFile(ev) {
  var idxOfDel = ev.target.id;
  totalSize -= files[idxOfDel].size;
  files.splice(idxOfDel, 1);
  render();
}

function render() {
  document.getElementById('total').innerHTML = 'Total file size: ' + (totalSize/1000) + ' KB';
  showList ? renderList() : renderTiles();
}

function renderList() {
  var rows = '';
  for(var i = 0; i < files.length; i++) {
    var rowHTML = '<tr><td>' + files[i].name + '</td><td>' + files[i].type +
    '</td><td>' + files[i].size + '</td><td><button onclick="removeFile(event)" class="delete" id="' +
     i + '">x</button></td></tr>';
    rows += rowHTML;
  }
  
  var tableHead = '<tr><th>Name</th><th>File type</th><th>File size</th><th>Delete</th></tr>',
      tableHTML = '<table class="list">' + tableHead + rows + '</table>';  
  document.getElementById('tiles').innerHTML = '';
  document.getElementById('list').innerHTML = tableHTML;
}

function renderTiles() {
  var list = [];
  for(var i = 0; i < files.length; i++) {
    var buttonHTML = '<br><button onclick="removeFile(event)" class="delete" id="' + i + '">Delete</button>',
        detailHTML = '<div class="details"><span><b>Name:</b> </span>' + files[i].name + '<br>' +
                     '<span><b>File type: </b></span>' + files[i].type + '<br>' +
                     '<span><b>File size: </b></span>' + files[i].size + ' bytes</div>';
    var tileHTML = '<div class="tile">' + detailHTML + buttonHTML + '</div>';
    list.push(tileHTML);
  }
  document.getElementById('list').innerHTML = '';
  document.getElementById('tiles').innerHTML = list.join(" ");
}

function toggleView() {
  showList = !showList;
  
  if(showList) {
    renderList();
    document.getElementById('switcher').innerHTML = 'Show Tile View';
  } else {
    renderTiles();
    document.getElementById('switcher').innerHTML = 'Show List View';
  }
}

