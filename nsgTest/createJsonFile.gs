function myFunction() {
  
}

function createJsonFileFromSpreadsheet() {
  // スプレッドシートのデータを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  var ssid = "1k3QIyghNAPQwOdBnwUgk2ffoBkbcgiw7t8SeGWV28Wk";
  var sheetName = "当番表";
  var mst = Library.open(SpreadsheetApp.getActiveSpreadsheet(), SpreadsheetApp.getActiveSpreadsheet().getActiveSheet());
  // 表データ取得
  var lists = mst.select(['NSG名','タスク','ルール名','説明','宛先アドレスプレフィックス','宛先ポート','プロトコル','許可/拒否','優先度','受信/送信','ソースアドレスプレフィックス','ソースポート']).result();

  // 変数定義
  let nsgName = "";
  let taskValue = "";
  let ruleName = "";
  let description = "";
  let destination_address_prefix = "";
  let destination_port_range = "";
  let protocol = "";
  let access = "";
  let priority = "";
  let direction = "";
  let source_address_prefix = "";
  let source_port_range = "";
  
  // Json始まり
  var jsonText = '{"nsg_list":[';

  // データ処理
  for (let i=0;i<lists.length;i++) { 
    if (lists[i]['NSG名'].isBlank() == false) {
      nsgName = lists[i]['NSG名'];
    }

    jsonText = jsonText & '{"NSG":"' & nsgName & '","TASK":"add","rules":['

    let obj = {};
    

  }


  // JSON形式に変換
  var jsonData = convertDataToJson(data);
  
  // JSONファイルを作成
  createJsonFile(jsonData);
}

function convertDataToJson(data) {
  var headers = data[0];
  var jsonData = [];
  
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var rowData = {};
    for (var j = 0; j < headers.length; j++) {
      rowData[headers[j]] = row[j];
    }
    jsonData.push(rowData);
  }
  
  return JSON.stringify(jsonData, null, 2);
}

function createJsonFile(jsonData) {
  var fileName = 'output.json';
  var folderId = 'my-drive'; // フォルダのIDを指定
  // var folder = DriveApp.getFolderById(folderId);
  var folder = DriveApp.getRootFolder(); // ルートディレクトリ
  var file = folder.createFile(fileName, jsonData);
}

function createJsonFile(_jsonData, _fileName) {
  var fileName = _fileName;
  var folderId = 'my-drive'; // フォルダのIDを指定
  // var folder = DriveApp.getFolderById(folderId);
  var folder = DriveApp.getRootFolder(); // ルートディレクトリ
  var file = folder.createFile(fileName, _jsonData);
}

