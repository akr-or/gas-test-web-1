function myFunction() {
  
}

function Get_RestAPI_NoParam() {
  //HTTP GET(パラメータなし)の通信
  let responseDataGET = UrlFetchApp.fetch("https://auto-worker.com/blog/").getContentText();
  console.log(responseDataGET);

  //HTTP GET(パラメータ付き)の通信(amazonの「googleappsscript」の検索結果ページ)
  let responseDataGET2 = UrlFetchApp.fetch("https://www.amazon.co.jp/s?k=googleappsscript").getContentText();
  console.log(responseDataGET2);
  
  //HTTP POSTのAPI通信(リクルートのA3RTのAPI)
  let apiURL = "https://api.a3rt.recruit-tech.co.jp/image_influence/v1/meat_score";
  let apiKey = PropertiesService.getScriptProperties().getProperty("APIKEY");
  //リクルートのAPIに採点してもらう肉画像をGoogleドライブから取得する
  let meetImage = DriveApp.getFileById("1hmjS_6exIiogs_iWU1_vEt7CGOBWIyu5").getBlob();
  //APIのリクエストでPOSTデータするパラメーターを設定する
  let payload = {
    'apikey': apiKey,
    'predict':'1',
    'imagefile': meetImage,
  };
  //HTTP POSTで前述で設定したパラメーターをオプションで設定する。
  let options = {
    'method' : 'post',
    'payload' : payload
  };
  //APIにリクエストし、結果をログ出力する
  let responseDataPOST = UrlFetchApp.fetch(apiURL,options).getContentText();
}

function Get_RestAPI_Param() {
  //HTTP GET(パラメータ付き)の通信(amazonの「googleappsscript」の検索結果ページ)
  let responseDataGET2 = UrlFetchApp.fetch("https://www.amazon.co.jp/s?k=googleappsscript").getContentText();
  console.log(responseDataGET2);
}

function Post_RestAPI() {
  //HTTP POSTのAPI通信(リクルートのA3RTのAPI)
  let apiURL = "https://api.a3rt.recruit-tech.co.jp/image_influence/v1/meat_score";
  let apiKey = PropertiesService.getScriptProperties().getProperty("APIKEY");
  //リクルートのAPIに採点してもらう肉画像をGoogleドライブから取得する
  let meetImage = DriveApp.getFileById("1hmjS_6exIiogs_iWU1_vEt7CGOBWIyu5").getBlob();
  //APIのリクエストでPOSTデータするパラメーターを設定する
  let payload = {
    'apikey': apiKey,
    'predict':'1',
    'imagefile': meetImage,
  };
  //HTTP POSTで前述で設定したパラメーターをオプションで設定する。
  let options = {
    'method' : 'post',
    'payload' : payload
  };
  //APIにリクエストし、結果をログ出力する
  let responseDataPOST = UrlFetchApp.fetch(apiURL,options).getContentText();
}

function postMessage() {
  const url = 'https://api.line.me/v2/bot/message/push';
  const token = PropertiesService.getScriptProperties().getProperty("line_chanel_access_token"); //チャネルアクセストークン

  const payload = {
    to: PropertiesService.getScriptProperties().getProperty("line_chanel_userid"), //ユーザーID
    messages: [
      { type: 'text', text: 'Hello, world!' }
    ]
  };

  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token
    },
    payload: JSON.stringify(payload)
  };
  // HTTPリクエストでLineAPIを呼び出す
  let result = UrlFetchApp.fetch(url, params);
  let resultcode = result.getResponseCode();
  if (resultcode == 200){
    let res = JSON.parse(result.getContentText());
    console.info(res);
  } else {
    console.error(result.getContentText())
  }

  // スプレッドシートに書き込み
  let spreadsheet = SpreadsheetApp.openById('1TvsakHswxm14j00F55-oSDVI8yWziVQ2pOItL0TmyUQ')
  let sheet = spreadsheet.getSheetByName("シート1");

  // スプレッドシートに挿入
  let startRow = sheet.getLastRow()+1;
  let row = 1; // 配列の行、配列数
  let col = 3; // 配列の行、要素数
  let addRange = sheet.getRange(startRow, 1, row, col);

  // 上記は応用、下が単純に一つのデータ挿入
  let data = [Date(),resultcode,result.getContentText()];
  sheet.appendRow(data);

  return resultcode;
}

function sendDemo(){
  postMessage2("test");
}
function postMessage2(_textdate) {
  const url = 'https://api.line.me/v2/bot/message/push';
  const token = PropertiesService.getScriptProperties().getProperty("line_chanel_access_token"); //チャネルアクセストークン

  const payload = {
    to: PropertiesService.getScriptProperties().getProperty("line_chanel_userid"), //ユーザーID
    messages: [
      { type: 'text', text: _textdate }
    ]
  };

  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };
  // HTTPリクエストでLineAPIを呼び出す
  try{
    let result = UrlFetchApp.fetch(url, params);
    let resultcode = result.getResponseCode();
    if (resultcode == 200){
      let res = JSON.parse(result.getContentText());
      console.info(res);
    } else {
      console.error(result.getContentText())
    }

    // スプレッドシートに書き込み
    let spreadsheet = SpreadsheetApp.openById('1TvsakHswxm14j00F55-oSDVI8yWziVQ2pOItL0TmyUQ')
    let sheet = spreadsheet.getSheetByName("シート1");

    // スプレッドシートに挿入
    let startRow = sheet.getLastRow()+1;
    let row = 1; // 配列の行、配列数
    let col = 3; // 配列の行、要素数
    let addRange = sheet.getRange(startRow, 1, row, col);

    // 上記は応用、下が単純に一つのデータ挿入
    let data = [Date(),resultcode,result.getContentText()];
    sheet.appendRow(data);

    let res = "成功 : " + resultcode.toString() + " " + Date().toString();

    return res;
  }catch(e){
    console.log(e)
    return e.toString();
  }
  // let result = UrlFetchApp.fetch(url, params);
  // let resultcode = result.getResponseCode();
  // if (resultcode == 200){
  //   let res = JSON.parse(result.getContentText());
  //   console.info(res);
  // } else {
  //   console.error(result.getContentText())
  // }

  // // スプレッドシートに書き込み
  // let spreadsheet = SpreadsheetApp.openById('1TvsakHswxm14j00F55-oSDVI8yWziVQ2pOItL0TmyUQ')
  // let sheet = spreadsheet.getSheetByName("シート1");

  // // スプレッドシートに挿入
  // let startRow = sheet.getLastRow()+1;
  // let row = 1; // 配列の行、配列数
  // let col = 3; // 配列の行、要素数
  // let addRange = sheet.getRange(startRow, 1, row, col);

  // // 上記は応用、下が単純に一つのデータ挿入
  // let data = [Date(),resultcode,result.getContentText()];
  // sheet.appendRow(data);

}
