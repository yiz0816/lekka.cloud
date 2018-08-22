class Document {
  constructor() {
    this.scene = new Scene();
    this.settings = ["placeholder", "myColor", "myAngle"];
    this.version = "0.1";
    this.screens = [];
    this.selection = [];
    this.canvas = function () {createCanvas(windowWidth, windowHeight)};
  }
}

Document.prototype.save = function (doc) {
  console.log(doc);
  saveJSON(doc, "config.json");
};

Document.prototype.loadFile = function () {
  var file = "./data/example.json";
  data = loadJSON(file, jsonLoaded());
};

var jsonLoaded = function (){
  console.log("loaded");
  console.log(data);
}

Document.prototype.updateFile = function(){
  this.loadFile();

  console.log("file contains: " + data);
  console.log(data);

  //doc.scene = data.scene;
  //doc.settings = data.settings;
  doc.version = data.version;
  //doc.screens = data.screens;
  //doc.selection = data.selection;
}