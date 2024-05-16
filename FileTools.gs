var FileTools = class FileTools {
  /**--------------------------------------------------------- Create Folder ---------------------------------------------------------**/
  createFolder(folderName) {
    var folderId;
    var folderList = DriveApp.getFoldersByName(folderName);

    // Check if folder name has already exist.
    if (folderList.hasNext()) {
      folderId = folderList.next().getId();
      console.log("[This folder has already exist]: (Folder-ID) " + folderId);
    } else {
      folderId = DriveApp.createFolder(folderName).getId();
      console.log("[Folder has created]: (Folder-ID) " + folderId);
    }

    return folderId;
  }


  /**------------------------------------------------------ Create Spreadsheet ------------------------------------------------------**/
  createSpreadsheetNSheet(folderIdToSave) {
    var spreadsheetUrl;

    // Spreadsheet name depend on month
    var spreadsheetName = timeTools.getNameOf(new Date().getMonth(), "month");
    // Add spreadsheet name to global variable
    variableHolder.addBuffer(spreadsheetName);

    // Get current day of the month
    var day = timeTools.getCurrentNumberOf('dd')
    var sheetName = "Day-" + day.toString();
    // Add sheet name to global variable
    variableHolder.addBuffer(sheetName);

    var fileList = DriveApp.getFilesByName(spreadsheetName);
    // Check if Spreadsheet has already exist.
    if (fileList.hasNext()) {
      var spreadsheetFile = fileList.next();
      spreadsheetUrl = spreadsheetFile.getUrl();

      // Check sheet name
      var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
      var activeSheetList = spreadsheet.getSheets();

      if (activeSheetList.every(sheet => sheet.getName() != sheetName)) {
        // Create a new sheet (For a new day)
        spreadsheet.insertSheet(sheetName);

        // Write default title to new sheet
        sheetTools.addData([
          "Date & Time", "Max-Temperature", "Min-Temperature", "Max-Humidity", "Min-Humidity",
          "Max-Ammonia", "Min-Ammonia", "Egg"
        ], sheetName, spreadsheetUrl);

        console.log("[New sheet has created]");
      }

      console.log("[This Spreadsheet has already exist]: (Spreadsheet-URL) " + spreadsheetUrl.toString());
    } else {
      // Create new Spreadsheet
      var spreadsheet = SpreadsheetApp.create(spreadsheetName);
      spreadsheetUrl = spreadsheet.getUrl();

      // Move file to the specified folder
      var spreadsheetFile = DriveApp.getFileById(spreadsheet.getId());
      var folderToSave = DriveApp.getFolderById(folderIdToSave);
      spreadsheetFile.moveTo(folderToSave);

      // Change sheet name
      var sheet = spreadsheet.getSheetByName("Sheet1");
      sheet.setName(sheetName);

      // Write default title to new sheet
      sheetTools.addData([
        "Date & Time", "Max-Temperature", "Min-Temperature", "Max-Humidity", "Min-Humidity",
        "Max-Ammonia", "Min-Ammonia", "Egg"
      ], sheetName, spreadsheetUrl);

      console.log("[Spreadsheet has created]: (Spreadsheet-URL) " + spreadsheetUrl.toString());
    }
    
    return spreadsheetUrl;
  }
}

var fileTools = new FileTools();
