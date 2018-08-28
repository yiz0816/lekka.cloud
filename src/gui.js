function loadGUI() {
  // create the GUI
  gui =  {};
  
  createAddScreenButton();
  //createP5GUI();
  createAttributePanel();
  createLoader();
}

function onFileChosen(file) {
  doc.loadFile(file);

}
function createP5GUI() {
  gui = createGui('Main');
  //gui.addGlobals('file');
  gui = QuickSettings.create(0, 0, " ")
    .addFileChooser("Load Scene", "pick an JSON file...", "application/json", onFileChosen);
    console.log(this);
}

function createAttributePanel(){
  gui.ap = createDiv("attribute-panel")
  .style("background-color", colors.white)
  .id("attribute-panel");
}

function createAddScreenButton() {
  var addScreenButtomn = createDiv("Add Screen")
  .id("floatingActionButton")
  .style(`background-color`, colors.highlight)
  .mouseClicked(function () { new Screen() });
}

function createLoader(){
  input = createFileInput(doc.loadFile);
  input.position(0, 0);
}