function loadGUI() {
  // create the GUI
  gui = createGui('Main');
  //gui.addGlobals('file');
  gui = QuickSettings.create(0, 0, " ")
    .addFileChooser("file chooser", "pick an image...", "application/json", onFileChosen);


  gui.ap = createDiv("attribute-panel")
  .style("background-color", colors.white)
  .id("attribute-panel");

}



function onFileChosen(file) {
  doc.load(file);
}

function createAddScreenButton() {
  var addScreenButtomn = createDiv("Add Screen")
  .id("floatingActionButton")
  .style(`background-color`, colors.highlight)
  .mouseClicked(function () { new Screen() });
}