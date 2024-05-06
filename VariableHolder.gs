var VariableHolder = class VariableHolder {
  /**-------------------------------------------------------- Set constructor --------------------------------------------------------**/
  constructor() {
    this.buffer = [];
  }

  /**--------------------------------------------------- Add data to global buffer ---------------------------------------------------**/
  addBuffer(toAdd) {
    this.buffer.push(toAdd)
  }
}

var variableHolder = new VariableHolder()
