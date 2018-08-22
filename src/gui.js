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
