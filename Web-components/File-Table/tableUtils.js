
/** Initialize directory bar, called by document.html */
function createPathBar(pathBar, rootDir, rootData, table){
  let curDir = document.createElement("p");
  curDir.appendChild(document.createTextNode(rootDir));
  curDir.className = "dir last-dir";
  curDir.onclick = function(){
    // regenerate table using dirData
    
    let tableData = rootData['data']
    let tableKey = Object.keys(tableData[0])
    let newData = [...tableData];
    let newBody = generateTable(table, newData);
    let old = table.childNodes[1];
    table.removeChild(old)
    table.appendChild(newBody)
    // if curDIr style does not contain last-dir, remove last two p in bar
  }
  pathBar.appendChild(curDir);
}

/** change directory path when folder choosen */
function pathAppend(pathBar, dirName, dirData, table){
  // remove parent dir bold style
  let nodeCnt = pathBar.childNodes.length;
  pathBar.childNodes[nodeCnt-1].className = "dir";
  // add divider
  let divider = document.createElement("p");
  divider.appendChild(document.createTextNode(">>"));
  divider.className = "dir";
  pathBar.appendChild(divider);
  // add new path name
  let curDir = document.createElement("p");
  let curText = document.createTextNode(dirName);
  curDir.appendChild(curText);
  curDir.className = "dir last-dir";
  // add new path onclick
  curDir.onclick = function(){
    // regenerate table using dirData
    let newData = dirData;
    let newBody = generateTable(table, newData);
    let old = table.childNodes[1];
    table.removeChild(old)
    table.appendChild(newBody)
    // if curDIr style does not contain last-dir, remove last two p in bar
  }
  pathBar.appendChild(curDir);
}


/* Generate table header by header data size */
function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  let checkBox = document.createElement("th");
  row.appendChild(checkBox);
  let icon = document.createElement("th");
  icon.appendChild(document.createTextNode('Type'));
  row.appendChild(icon);
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

/* Generate table row by data size */
// https://img.icons8.com/emoji/48/000000/file-folder-emoji.png
// https://img.icons8.com/material-outlined/40/000000/file.png
function generateTable(table, data) {
  console.log(data.length);
  let tbody = document.createElement("tbody");
  for (let i=0; i < data.length; i++) {
    let element = data[i];
    let row = tbody.insertRow();
    // add circle checkbox per row
    let checkCell = row.insertCell();
    let inputBox = document.createElement("INPUT");
    inputBox.setAttribute('type', 'checkbox');
    checkCell.appendChild(inputBox);
    // add file/folder icon per row
    let imgCell = row.insertCell();
    let img = document.createElement('img');
    img.src = 'https://img.icons8.com/material-outlined/30/000000/file.png'; // hardcode for now
    imgCell.appendChild(img);

    for (key in element) {
      if (key ==="Children") continue;
      let cell = row.insertCell();
      // console.log(element[key])
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
  return tbody;
}

/* Row onCLick Handler */
function addRowHandlers(table,dirBar, data) {
  let rows = table.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) {
    row = table.rows[i];
    let titleCell = row.getElementsByTagName("td")[2]
    titleCell.onclick = function(){
      
      // onclick replace table content
      try{
        let newData = data[i-1]['Children'];
        let newBody = generateTable(table, newData);
        // onclick change path directory
        pathAppend(dirBar, data[i-1]['Title'], newData, table);
        let old = table.childNodes[1];
        table.removeChild(old)
        table.appendChild(newBody)
      } catch (e) {
        alert('Not a folder');
      }
    };
  }
}

/* Table creation starts here */
function createTable(table, dirBar, data) {
  // Get header from data obj
  let fieldsData = data['fields'];
  const header = []
  for (let i = 0; i < fieldsData.length; i++) {
    header.push(fieldsData[i]['label'])
  }
  generateTableHead(table, header);
  // Get data for table content
  let tableData = data['data']
  let tableKey = Object.keys(tableData[0])
  let newBody = generateTable(table, tableData);
  table.appendChild(newBody);
  addRowHandlers(table, dirBar, tableData);
}