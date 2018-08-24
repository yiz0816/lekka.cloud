class Document {
  constructor() {
    this.scene = new Scene();
    this.settings = { "option1": "placeholder", "option2": "myColor", "option3": "myAngle" };
    this.version = random(10);
    this.screens = [];
    this.selection = [];
    this.canvas = function () { createCanvas(windowWidth, windowHeight) };
  }
}

Document.prototype.save = function () {
  var file = {};

  file.settings = {};
  for (var key in doc.settings) {
    // skip loop if the property is from prototype
    if (!doc.settings.hasOwnProperty(key)) continue;
    file.settings[key] = doc.settings[key];
  }

  file.version = doc.version;

  file.scene = {};
  for (var key in doc.scene) {

    // skip loop if the property is from prototype
    if (doc.scene.hasOwnProperty(key)) {

      // Write String files to data file
      if (typeof doc.scene[key] === "string") {
        file.scene[key] = doc.scene[key];
      } else {
        // Create object to store next nevel hierachy
        file.scene[key] = {};
      }

      // One level deeper
      for (var subkey in doc.scene[key]) {
        if (doc.scene[key].hasOwnProperty(subkey)) {

          // Create Object to store values
          if (typeof doc.scene[key][subkey] === "number") {
            file.scene[key][subkey] = doc.scene[key][subkey];
          }
        }
      }
    }
  }

  file.screens = {};
  for (var key in doc.screens) {

    // skip loop if the property is from prototype
    if (doc.screens.hasOwnProperty(key)) {

      // Create object to store next nevel hierachy
      file.screens[key] = {};

      // One level deeper
      for (var subkey in doc.screens[key]) {
        if (doc.screens[key].hasOwnProperty(subkey)) {

          // Create Object to store values
          file.screens[key][subkey] = doc.screens[key][subkey];
        }
      }
    }
  }


  console.log(file);
  saveJSON(file, "config.json");
};

Document.prototype.loadFile = function () {
  var file = "./data/config.json";
  console.log("loading " + file);
  json = loadJSON(file), this.jsonLoaded(file);
};


Document.prototype.jsonLoaded = function (uri) {
  //console.log(uri);
  var name = uri.split("/");
  name = name[name.length - 1];
  console.log("" + name + "' loaded");
  console.log("File contains: " + json);
  this.updateFile();
}

Document.prototype.updateFile = function () {
  console.log("updating sceen");

  if (typeof json === "undefined") {
    console.log("error");
    break;
  }

  //Map values
  this.version = json.version;
  this.scene.mode = "clicking";

  for (var key in json.settings) {
    // skip loop if the property is from prototype
    if (!json.settings.hasOwnProperty(key)) continue;
    this.settings[key] = json.settings[key];
  }

  for (var key in json.scene) {
    // skip loop if the property is from prototype
    if (!json.scene.hasOwnProperty(key)) continue;
    this.scene[key] = json.scene[key];
  }
}