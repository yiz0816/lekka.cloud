class Screen extends Layer{
    constructor(x, y){
      super();
      this.pos.x = x || 0;
      this.pos.y = y || 0;
      this.image = loadImage('img/placeholder.jpg', () => this.initialise());
      this.in = [];
      this.in.pos = [];
      this.in.connections = []
      this.out = [];
      this.out.pos = []
      this.out.connections = [];
      this.resolution = 2;
      console.log(this);
    }
  }

Screen.prototype.draw = function () {
  imageMode(CORNER);
  image(this.image, this.pos.x, this.pos.y, this.image.width/this.resolution,this.image.height/this.resolution);
  stroke(colors.darkGrey);
  strokeWeight(3);
  //ellipse(this.in.pos.x, this.in.pos.y,8,8);    //Start Point
  ellipse(this.out.pos.x, this.out.pos.y,8,8);
  fill(0);
  noStroke();
  text(this.ID, this.pos.x, this.pos.y-10);
};


Screen.prototype.initialise = function () {
  this.setLocalPorts();
  this.updateSize();
};

Screen.prototype.setResolution = function (x) {
  this.resolution = x;
  this.updateSize();
};


Screen.prototype.setLocalPorts = function () {
  this.in.pos.x =  this.pos.x;
  this.in.pos.y = this.image.height/2/this.resolution + this.pos.y;
  this.out.pos.x = this.image.width/2 + this.pos.x;
  this.out.pos.y = this.image.height/2/this.resolution + this.pos.y;
};

Screen.prototype.drawConnection = function () {
  for(var i = 0; i < this.out.connections.length; i ++){
      var target = this.out.connections[i];
      this.drawLine(this.out.pos.x, this.out.pos.y, target.in.pos.x, target.in.pos.y);
      //console.log(i);
      //console.log(this.out.pos.x, this.out.pos.y, target.in.pos.x, target.in.pos.y);
  }
};

Screen.prototype.connectTo = function(target) {
  this.out.connections.push(target);
  target.in.connections.push(this);
};

Screen.prototype.setPositionX = function (x) {
  this.pos.x = x;
  this.setLocalPorts();
};

Screen.prototype.setPositionY = function (y) {
  this.pos.y = y;
  this.setLocalPorts();
};

Screen.prototype.drawLine = function (x1,y1,x2,y2) {
    this.startP = [];
    this.startP.x = x1;
    this.startP.y = y1;
    this.endP = [];
    this.endP.x = x2;
    this.endP.y = y2;
    this.siz = [];
    this.siz.x = abs(x1-x2);
    this.siz.y = abs(y1-y2);
    this.overshoot = this.siz.x/2;

    stroke(colors.connectionLines);
    strokeWeight(3);
    noFill();
    bezier(
      this.startP.x, this.startP.y,               // Point 1
      this.startP.x +this.overshoot, this.startP.y,           // Point 2
      this.endP.x -this.overshoot, this.endP.y,             // Point 3
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

Screen.prototype.clicked = function () {
  if (sc.mappedMouse.x > this.pos.x && sc.mappedMouse.x < this.pos.x + this.size.x && sc.mappedMouse.y > this.pos.y && sc.mappedMouse.y < this.pos.y + this.size.y){
    return true
  } else {
    return false;
  }
}

function createNewScreen(){
  screens.push( new Screen());
}