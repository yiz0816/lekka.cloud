var file = "";

function loadGUI(){
  // create the GUI
    //gui = createGui('Main');
    //gui.addGlobals('file');
    gui = QuickSettings.create(0, 0, " ")
    .addFileChooser("file chooser", "pick an image...", "application/json", onFileChosen)
    ;
}
function onFileChosen(file){
  doc.load(file);
}

function createAddScreenButton(){
  var addScreenButtomn = createDiv("Add Screen");
  addScreenButtomn.position(80,height-80-80);
  addScreenButtomn.size(80,80);
  addScreenButtomn.style(`background-color` , colors.highlight);
  addScreenButtomn.style(`border-radius`, "100px");
  addScreenButtomn.style(`box-shadow`, "0px 4px  6px rgba(0,0,0,0.2");
  addScreenButtomn.style("text-align", "center");
  addScreenButtomn.style("line-height", "80px");
  addScreenButtomn.style("user-select", "none");
  addScreenButtomn.mouseClicked(createNewScreen);
} 