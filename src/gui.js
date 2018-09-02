function loadGUI() {
  // create the GUI
  gui = {};

  createAddScreenButton();
  //createP5GUI();
  createAttributePanel();
  createLoader();
  createImageReplaceButton();
  createDeleteButton();
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

function createAttributePanel() {
  gui.ap = createDiv("attribute-panel")
    .style("background-color", colors.white)
    .id("attribute-panel")
    .class("ap");
}

function createAddScreenButton() {
  var addScreenButtomn = createDiv("Add")
    .id("floatingActionButton")
    .style(`background-color`, colors.highlight)
    .mouseClicked(function () { new Screen(- doc.scene.offset.x + width / 2 -300, -doc.scene.offset.y + height / 2 - 300) });
}

function createLoader() {
  gui.file = createFileInput(doc.loadFile);
  gui.file.position(0, 0);
}

var createImageReplaceButton = function (x = 0, y = 0) {
  gui.replaceButton = createFileInput(replaceImageFunc);
  gui.replaceButton.position(x, y);
}

var createDeleteButton = function (x = 0, y = 0) {
  gui.deleteButton = createButton("Remove");
  gui.deleteButton.position(x, y);
  gui.deleteButton.mousePressed(removeScreens);
}

var setButtonPosition = function (button = NaN, x = 0, y = 0) {
  if (button === NaN) {
    console.log("Error: input is not a button");
  } else {
    //console.log(button);
    gui[button].position(x, y);
  }
}

function replaceImageFunc(image) {
  if (image.type === "image") {
    var screen = NaN;
    console.log("replace image");
    console.log(image);
    for (var k in doc.selection) {
      screen = doc.selection[k];
      console.log(screen);
      screen.imageStorage = image;
      screen.updateImage();
    }
  } else {
    console.log("not an image was loaded");
  }
}

function removeScreens() {
  for (var k in doc.selection) {
    console.log("delete Screen: " + doc.selection[k].ID);
    var s = getScreenByID(doc.selection[k].ID)
    console.log(s);
    s.delete();
  }
}