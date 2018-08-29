class Screen extends Layer {
  constructor(x = 0, y = 0, id = createID()) {
    super();
    this.image = loadImage('img/placeholder.jpg', () => this.initialiseScreen());
    this.pos.x = x;
    this.pos.y = y;
    this.in = [];
    this.in.connections = {};
    this.out = {};
    this.out.connections = {};
    this.resolution = 2;
    this.ID = id;
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
  //this.setLocalPorts();
  this.updateSize();
  doc.screens[this.ID] = this;
  //console.log(this);
  this.createOutgoingPort();
  this.updatePort();
};

Screen.prototype.setResolution = function (x) {
  this.resolution = x;
  this.updateSize();
};

Screen.prototype.updateImage = function (file) {
  console.log(file)
  this.resolution = x;
  this.updateSize();
};
/*Screen.prototype.setLocalPorts = function () {
  this.in.pos.x = this.pos.x;
  this.in.pos.y = this.image.height / 2 / this.resolution + this.pos.y;
  this.out.pos.x = this.image.width / 2 + this.pos.x;
  this.out.pos.y = this.image.height / 2 / this.resolution + this.pos.y;
};*/

/*Screen.prototype.drawConnection = function () {
  for(var i = 0; i < this.out.connections.length; i ++){
      var target = this.out.connections[i];
      this.drawLine(this.out.pos.x, this.out.pos.y, target.in.pos.x, target.in.pos.y);
      //console.log(i);
      //console.log(this.out.pos.x, this.out.pos.y, target.in.pos.x, target.in.pos.y);
  }
};*/
Screen.prototype.connectTo = function (target) {
  //this.out.connections.push(target.ID);
  //target.in.connections.push(this.ID);
};

/*Screen.prototype.setPositionX = function (x) {
  this.pos.x = x;
  this.setLocalPorts();
};

Screen.prototype.setPositionY = function (y) {
  this.pos.y = y;
  this.setLocalPorts();
};*/

Screen.prototype.drawConncetion = function (x1, y1, x2, y2) {
  this.startP = [];
  this.startP.x = x1;
  this.startP.y = y1;
  this.endP = [];
  this.endP.x = x2;
  this.endP.y = y2;
  this.siz = [];
  this.siz.x = abs(x1 - x2);
  this.siz.y = abs(y1 - y2);
  this.overshoot = this.siz.x / 2;

  stroke(colors.highlight40);
  strokeWeight(3);
  noFill();
  bezier(
    this.startP.x, this.startP.y,               // Point 1
    this.startP.x + this.overshoot, this.startP.y,           // Point 2
    this.endP.x - this.overshoot, this.endP.y,             // Point 3
    this.endP.x, this.endP.y                    // Point 4
  );

  fill(colors.white);
  //ellipse(this.startP.x, this.startP.y,8,8);    //Start Point
  //ellipse(this.endP.x, this.endP.y,8,8);        //End Point
  //console.log("Draws a line from: "+ this.startP + " to " + this.endP );
  /*
  strokeWeight(1);
  line (this.startP.x, this.startP.y, this.startP.x +this.overshoot, this.startP.y)
  line (this.endP.x -this.overshoot, this.endP.y,this.endP.x, this.endP.y  )
  */
};

Screen.prototype.updatePort = function () {
  this.out.port.defaultPosition();
}

Screen.prototype.createOutgoingPort = function () {
  this.out.port = new Port(this);
}