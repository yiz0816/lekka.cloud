class Layer {
  constructor(x = 0, y = 0, id = createID()) {
    this.pos = {};
    this.pos.x = x;
    this.pos.y = y;
    this.size = {};
    this.size.w = 300;
    this.size.h = 600;
    this.dragOffset = [];
    this.ID = id;
  }
}

Layer.prototype.startDrag = function () {
  this.dragOffset.x = mouseX - this.pos.x;
  this.dragOffset.y = mouseY - this.pos.y;
  //console.log ("Start dragging layer from: " + this.dragOffset.x + ", " + this.dragOffset.y);
};

Layer.prototype.whileDrag = function () {
  this.pos.x = mouseX - this.dragOffset.x;
  this.pos.y = mouseY - this.dragOffset.y;
  //console.log("dragging layer to: " + this.pos.x + ", " + this.pos.y);

};

Layer.prototype.endDrag = function () {
  this.dragOffset.x = 0;
  this.dragOffset.y = 0;
  //console.log("Stopped dragging: " + this.pos.x + ", " + this.pos.y);
};

Layer.prototype.setSize = function (w, h) {
  this.size.w = w;
  this.size.h = h;
  //console.log("set Size to: " + x + ", " + y);
};

Layer.prototype.renderSelection = function () {
  strokeWeight(2);
  noFill();
  stroke(colors.highlight);
  rect(this.pos.x, this.pos.y, this.size.w, this.size.h);
};

Layer.prototype.updateSize = function () {
  this.setSize(this.image.width / this.resolution, this.image.height / this.resolution);
};

Layer.prototype.setPosition = function (x, y) {
  this.pos.x = x;
  this.pos.y = y;
}

Layer.prototype.isMouseOver = function () {

  if (sc.mappedMouse.x > this.pos.x
    && sc.mappedMouse.x < this.pos.x + this.size.w
    && sc.mappedMouse.y > this.pos.y
    && sc.mappedMouse.y < this.pos.y + this.size.h) {
      
    return true
  } else {
    return false;
  }
}

var createID = function () {
  var id = Math.random().toString(36).substr(2, 9);
  return id
}