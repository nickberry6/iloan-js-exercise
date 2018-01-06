'use strict';

var files = [];
var totalSize = 0;

activate();

function activate() {
  document.getElementById('files').addEventListener('change', addFile, false);
  renderList();
}

function addFile(ev) {
  files.push(ev.target.files[0]);
  totalSize += ev.target.files[0].size;
  renderList();
}

function removeFile(ev) {
  var idxOfDel = ev.target.id;
  totalSize -= files[idxOfDel].size;
  files.splice(idxOfDel, 1);
  renderList();
}

function renderList() {
  var list = [];
  for(var i = 0; i < files.length; i++) {
    var buttonHTML = '<br><button onclick="removeFile(event)" class="delete" id="' + i + '">Delete</button>',
        detailHTML = '<span>Name: </span>' + files[i].name + '<br>' +
                     '<span>File type: </span>' + files[i].type + '<br>' +
                     '<span>File size: </span>' + files[i].size + ' bytes';
    var tileHTML = '<div class="tile">' + detailHTML + buttonHTML + '</div>';
    list.push(tileHTML);
  }
  document.getElementById('list').innerHTML = list.join(" ");
  document.getElementById('total').innerHTML = 'Total file size: ' + totalSize + ' bytes';
}

