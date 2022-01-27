/** helper functions: use func defined in HTMLTableElement */
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
    img.src = 'https://img.icons8.com/material-outlined/30/000000/file.png';
    imgCell.appendChild(img);

    for (key in element) {
      if (key ==="Children"){
        // let hiddenRow = table.insertRow();
        // hiddenRow.appendChild(document.createTextNode(element[key]));
        continue;
      }
      let cell = row.insertCell();
      // console.log(element[key])
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
  return tbody;
}

/** Path bar */
function pathAppend(navBar, folderName) {
  let innerDiv0 = document.createElement('div');
  // The variable iDiv is still good... Just append to it.
  innerDiv0.appendChild(createTextNode('/'))
  navBar.appendChild(innerDiv0);
  let innerDiv = document.createElement('div');
  // The variable iDiv is still good... Just append to it.
  innerDiv.appendChild(createTextNode(folderName))
  navBar.appendChild(innerDiv);
}

/* Row onCLick Handler */
function addRowHandlers(table, data, oldBody) {
  let rows = table.getElementsByTagName("tr");
  for (let i = 1; i < rows.length; i++) {
    row = table.rows[i];
    row.onclick = function(){
                        var cell = this.getElementsByTagName("tr")[i];
                        var id = i;

                        //alert("id:" + id);
                        // pathAppend(pathBar, 'ranName')
                        //TODO: onclick change table content
                        let newData = data[i-1]['Children'];
                        console.log(newData);
                        
                        let newBody = generateTable(table, newData);
                        table.replaceChild(newBody, oldBody)
                    };
  }
}

/* Table creation starts here */
function createTable( table, data) {
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
  addRowHandlers(table, tableData, newBody);
}