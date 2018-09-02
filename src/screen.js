class Screen extends Layer {
  constructor(x = 0, y = 0, id = createID()) {
    super();
    this.pos.x = x;
    this.pos.y = y;
    this.in = [];
    this.in.connections = {};
    this.out = {};
    this.out.connections = {};
    this.resolution = 2;
    this.ID = id;
    this.image = loadImage('img/placeholder.jpg', () => this.initialiseScreen());
  }
}

Screen.prototype.draw = function () {
  strokeWeight(1)
  noFill();
  stroke(colors.grey);
  rect(this.pos.x, this.pos.y, this.size.w, this.size.h);

  imageMode(CORNER);
  image(this.image, this.pos.x, this.pos.y, this.image.width / this.resolution, this.image.height / this.resolution);
  stroke(colors.darkGrey);
  strokeWeight(3);
  fill(0);
  noStroke();
  text(this.ID, this.pos.x, this.pos.y - 10);
};

Screen.prototype.initialiseScreen = function () {
  doc.screens[this.ID] = this;
  this.setSize(this.image.width / this.resolution, this.image.height / this.resolution);
  if (typeof this.imageStorage === "undefined") {
    this.image = loadImage('img/placeholder.jpg', this.setSize(this.image.width / this.resolution, this.image.height / this.resolution));
  } else {
    this.image = loadImage(this.imageStorage.data, this.setSize(this.image.width / this.resolution, this.image.height / this.resolution));
  }
  this.createOutgoingPort();
  this.updatePorts();
};

Screen.prototype.updateImage = function () {
  console.log("update Image");
  this.image = loadImage(this.imageStorage.data, () => this.initialiseScreen());
  this.setSize(this.image.width / this.resolution, this.image.height / this.resolution);
};


Screen.prototype.updatePorts = function () {
  this.out.port.defaultPosition();
}

Screen.prototype.createOutgoingPort = function () {
  this.out.port = new Port(this);
}
Screen.prototype.delete = function () {
  console.log(this.ID);
  for (var k in doc.screens) {
    for (var j in doc.screens[k].out.connections) {
      if (doc.screens[k].out.connections[j] === this.ID) {
        console.log("delete port to screen: " + this.ID)
        delete doc.screens[k].out.connections[j];
      }
    }
  }
  delete doc.screens[this.ID];
}