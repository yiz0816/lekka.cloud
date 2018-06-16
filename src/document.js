class Document {
  constructor() {
    this.scene = new Scene();
    this.settings = "placeholder";
    this.version = "0.1";
    this.screens = [];
    this.selection = [];
    this.canvas = function () {createCanvas(windowWidth, windowHeight).drop(this.load())};
  }
}

Document.prototype.save = function (doc) {
  save(doc, "layout.json");
};

Document.prototype.load = function () {
  console.log("empty load() function");
};
