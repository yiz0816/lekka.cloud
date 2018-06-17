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
  saveJSON(doc, "layout.json");
};

Document.prototype.load = function () {
  file = "config.json";
  var data = console.log(loadJSON("../data/" + file));
  console.log(data);
  //doc = data;
};
