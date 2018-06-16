class Layer {
  constructor(){
    this.pos = [];
    this.pos.x = 0;
    this.pos.y = 0;
    this.test = "test";
    this.size = [];
    this.size.x = 0;
    this.size.y = 0;
  }
}

Layer.prototype.startDrag = function () {
  
};

Layer.prototype.whileDrag = function () {

};

Layer.prototype.endDrag = function () {

};

Layer.prototype.setSize = function (x,y) {
  this.size.x = x;
  this.size.y = y;
  console.log("set Size to: " + x + ", " + y);
  return
};

Layer.prototype.renderSelection = function () {
    strokeWeight(5);
    noFill();
    stroke(colors.yellow);
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
};

Layer.prototype.updateSize = function () {
  this.setSize(this.image.width / this.resolution, this.image.height / this.resolution);
};
