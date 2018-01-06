'use strict';

var files = [];
var totalSize = 0;

activate();

function activate() {
  document.getElementById('files').addEventListener('change', addFile, false);
  renderList();
}

function addFile(evt) {
  files.push(evt.target.files[0]);
  totalSize += evt.target.files[0].size;
  renderList();
}

function removeFile(evt) {
  var idxOfDel = evt.target.id;
  totalSize -= files[idxOfDel].size;
  files.splice(idxOfDel, 1);
  renderList();
}

function renderList() {
  var list = [];
  for(var i = 0; i < files.length; i++) {
    var buttonHTML = '<br><button onclick="removeFile(event)" id="' + i + '">Delete</button>';
    var itemHTML = '<div class="tile">' + files[i].name + '<br>' + files[i].type + 
        '<br>' + files[i].size + buttonHTML + '</div>';
    list.push(itemHTML);
  }
  document.getElementById('list').innerHTML = list.join(" ");
  document.getElementById('total').innerHTML = 'Total file size: ' + totalSize + ' bytes';
}

