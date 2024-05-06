var TimeTools = class TimeTools {
  /**-------------------------------------------------------- Set constructor --------------------------------------------------------**/
  constructor() {
    // Get time zone
    this.timeZone = Session.getScriptTimeZone();
    this.monthString = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNI", "JULY", "AUG", "SEP", "OKT", "NOV", "DEC"];
    this.daysString = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  }


  /**--------------------------------------------------- Get current nuber of ... ---------------------------------------------------**/
  getCurrentNumberOf(format) {
    return Utilities.formatDate(new Date(), this.timeZone, format);
  }


  /**----------------------------------------------------- Get name of Day/Month -----------------------------------------------------**/
  getNameOf(toGetName, type) {
    if (type == "day") {
      return this.daysString[toGetName];
    } else if (type == "month") {
      return this.monthString[toGetName];
    } 
    
    return null;
  }
}

var timeTools = new TimeTools();
