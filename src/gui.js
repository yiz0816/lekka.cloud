function loadGUI() {
  // create the GUI
  gui = {};


  //createP5GUI();
  createAttributePanel();

  // Tool Bar
  createToolBar();
  createAddScreenButton();
  createSaveButton()
  createPrintButton();
  createLoadButton();

  createImageReplaceButton();
  createDeleteButton();
  createKeyField("test", "Start");
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

function createToolBar() {
  gui.tb = createDiv()
    .style("background-color", colors.brightGrey)
    .id("tool-bar")
    .class("tb");
}

function createAttributePanel() {
  gui.ap = createDiv("attribute-panel")
    .style("background-color", colors.white)
    .id("attribute-panel")
    .class("ap");
    gui.ap.fields = {};
}

function createAddScreenButton() {
  var addScreenButtomn = createDiv("Add Screen")
    .parent("tool-bar")
    .class("button icon plus")
    .mouseClicked(function () {
      var id = createID();
      new Screen(-doc.scene.offset.x + width / 2 - 300, -doc.scene.offset.y + height / 2 - 300, id);
      ga('send', 'event', "Product", "Create Screen from Button", id);
    });
}

function createSaveButton() {
  var addScreenButtomn = createDiv("Save")
    .parent("tool-bar")
    .class("button icon save")
    .mouseClicked(function () {
      doc.save();
      ga('send', 'event', "Product", "Save Layout", doc.fileName,);
    });
}

function createPrintButton() {
  var addScreenButtomn = createDiv("Print")
    .parent("tool-bar")
    .class("button icon print")
    .mouseClicked(function () {
      doc.printLayout();
      ga('send', 'event', "Product", "Print Layout", doc.fileName);
    });
}

function createLoadButton() {
  var addScreenButtomn = createFileInput(doc.loadFile)
    .parent("tool-bar")
    .class("button icon upload")
    .mouseClicked(function () {
      ga('send', 'event', "Product", "Load Layout");
    });
}

function createKeyField(name, value, target) {
  gui.ap.fields[name] = createInput(value).parent("attribute-panel").input(testKeyField).id(name).class("plain-input");
  gui.ap.fields[name].field = target; 
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

function testKeyField(){
  console.log(this.value());
}