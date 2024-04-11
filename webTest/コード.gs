function myFunction() {
  
}

function doGet() {
  var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
  htmlOutput
    .setTitle('テストサイト')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  return htmlOutput;
}

function getSpreadsheetValues(){
  var spreadsheet = getSheetFromFolder_();
  return spreadsheet.getDataRange().getValues();
}

function getSheetFromFolder_() {
  // GoogleDriveのフォルダーID
  var FOLDER_ID = "1bzrJejQXzg8QGVog412_l63RwrE-HhRx"
  var folder = DriveApp.getFolderById(FOLDER_ID)
  // var folder = DriveApp.getRootFolder() // root dirの場合
  // var files = folder.getFiles()
  // while (files.hasNext()) {
  //   var file = files.next();
  //   // スプレッドシートのみ抽出
  //   // Logger.log(file.getMimeType());
  //   // if (file.getMimeType() == "application/vnd.google-apps.spreadsheet") {      
  //   //   var spreadsheet = SpreadsheetApp.openById(file.getId());
  //   //   // var str = spreadsheet.getSheetByName("シート1").getRange("A1").getValue();
  //   //   // Logger.log(str);
  //   //   return spreadsheet.getSheetByName("シート1");
  //   // }
  // }

  // スプレッドシートからデータを取得
  var spreadsheet = SpreadsheetApp.openById("1Lg-HcaaBg7On4Da3JKvnAeSgvLUDM25VEoDY45hRFIY");
  return spreadsheet.getSheetByName("webテスト");

}

