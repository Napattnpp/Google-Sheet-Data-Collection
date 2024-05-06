var SheetTools = class SheetTools {
  /**------------------------------------------------------- Add data to sheet -------------------------------------------------------**/
  addData(data, sheetName, spreadsheetUrl) {
    var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
    var sheet = spreadsheet.getSheetByName(sheetName);

    sheet.appendRow(data);
  }
}

var sheetTools = new SheetTools();
