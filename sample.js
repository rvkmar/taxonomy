// STEPS MUST FOLLOW:
/*
* PUBLISH THE SPREADSHEET TO ANYONE ON WEB
** DEPLOY APPS-SCRIPT's CONTENT OF : doGet, doPost TO ANYONE ON WEB
*** USE /EXEC URL (ENDPOINT) OF THE CURRENT_DEPLOYMENT_ID
*/

// BACK-END (*GOOGLE APPS-SCRIPT IDE):
  
function doGet(e){

    try {
      const db = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // get active **Google Sheets | this is similar to document.getElementsById
      // const data = db.getRange("a1notation").getValues(); /* – this is an alternative accessor (reference) to range */
      const data = db.getRange(db.getLastRow(),1).getValues(); // get range of the last field (row) on **GS
      const jsonData = JSON.stringify(Object.assign({}, data.flat() )); // [[]] –> {} | /* otherwise do sth like that : JSON.stringify({accessHandler: e}); */
      Logger.log(jsonData); // to debug on *GAS IDE side
      return ContentService.createTextOutput(jsonData).setMimeType(ContentService.MimeType.JSON); // DO GET DATA to external app (localhost) if successful
    }
  
    catch(e){
        const error = {"error": e}; // define error object for catch{} statement
        const jsonError = JSON.stringify(error); // stringify error be ready to be passed via Network
        return ContentService.createTextOutput(jsonError).setMimeType(ContentService.MimeType.JSON); // THROW ERROR if not successful
    }
    
  }
  
  function doPost(e) {
    const body = e.postData.contents; // IN CHARGE TO ACCEPT DATA TRANSMISSION AS JSON BODY via Network
    const bodyJSON = JSON.parse(body); // Convert JSON to JavaScript object in order to understand "the content"
    const db = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // reference to the data on **GS
    db.getRange("A1:A20").setNumberFormat("@"); // implicitly set type format to TEXT
    db.appendRow([bodyJSON.coords]); // DO POST DATA to the **GS
    // db.appendRow([bodyJSON._sameNameHandler]); /* _sameNameHandler as within external app FETCH API POST request */
  }
  
  
  // FRONT-END:
  
    // Push data in Google Sheets from external app :
    const request_url = "https://script.google.com/macros/s/CURRENT_DEPLOYMENT_ID/exec";
  
    fetch(request_url, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
      'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify(/* { _sameNameHandler: `${ Your external app dataVariable be processed via doPost(e) */)
    });
  
    // Pull data out (GET DATA) of Google Sheets to external app :
    fetch(request_url).then(response => response.json()).then(response => console.log(response));
  
  
    