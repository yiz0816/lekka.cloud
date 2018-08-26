class Document {
  constructor() {
    this.scene = new Scene();
    this.settings = { "option1": "placeholder", "option2": "myColor", "option3": "myAngle" };
    this.screens = {};
    this.selection = [];
    this.ports = {};
    this.canvas = function () { createCanvas(windowWidth, windowHeight) };
  }
}

Document.prototype.save = function () {
  saveJSON(doc, "config.json");
};

Document.prototype.loadFile = function () {
  var file = "./data/config.json";
  console.log("loading " + file);
  json = loadJSON(file), this.jsonLoaded(file);
};


Document.prototype.jsonLoaded = function (uri) {
  console.log(uri);
  var name = uri.split("/");
  name = name[name.length - 1];
  console.log(name + "' loaded");
}

Document.prototype.updateFile = function () {
  console.log("updating sceen");

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

  delete doc.screens;
  doc.screens = {};

  for (var key in json.screens) {
    console.log(json.screens[key].ID);
    new Screen(json.screens[key].pos.x, json.screens[key].pos.y, json.screens[key].ID);
  }
  console.log("finished updating");
}