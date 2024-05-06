/**------------------------------------------- Function is runed when get HTTP GET request -------------------------------------------**/
function doGet(e) {
  var message;
  var date = new Date();

  main();
  try {
    // Get data from url
    var temperature = [e.parameter.maxTemp, e.parameter.minTemp];
    var humidity = [e.parameter.maxHumidity, e.parameter.minHumidity];
    var ammonia = [e.parameter.maxAmmonia, e.parameter.minAmmonia];
    var egg = e.parameter.egg;

    // Check if every data for url is not undefined type
    if (!ifUndifined(temperature) && !ifUndifined(humidity) && !ifUndifined(ammonia) && typeof egg !== 'undefined') {
      // Append data to google sheet
      sheetTools.addData([
        date, temperature[0], temperature[1],
        humidity[0], humidity[1], ammonia[0], ammonia[1], egg
      ], variableHolder.buffer[1], variableHolder.buffer[2]);

      message = `
      [Add data successfully]:
        (Data) [
          ${date}, ${temperature[0]}, ${temperature[1]},
          ${humidity[0]}, ${humidity[1]}, ${ammonia[0]}, ${ammonia[1]}, ${egg}
        ]
        (Sheet name) ${variableHolder.buffer[1]}
        (Spreadsheet URL) ${variableHolder.buffer[2]}
      `;
    } else {
      message = "[Error]: Some variable is not define";
    }
    console.log(message);
    return ContentService.createTextOutput(message);

  } catch(error) {
    console.log(error);
    return ContentService.createTextOutput("[Error]: (Try-Catch) " + error.message);
  }
}


/**----------------------------------------------- Run main function to setup project -----------------------------------------------**/
function main() {
  // Create main data collection folder
  var folderId = fileTools.createFolder("Chicken Farm Data Collection");
  // Create new spreadsheet
  var spreadsheetUrl = fileTools.createSpreadsheetNSheet(folderId);
  variableHolder.addBuffer(spreadsheetUrl);
}


/**------------------------------------- Function to check if element in array is undefined type -------------------------------------**/
function ifUndifined(array) {
  array.every(element => typeof element === 'undefined')
}
