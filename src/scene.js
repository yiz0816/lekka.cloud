class Scene {
  constructor() {
    this.mode = "clicking";
    this.createNoP5Vector("offset",500,500);
    this.createNoP5Vector("dragOffset");
    this.createNoP5Vector("mappedMouse");
    this.random = 65.45;
  }
}

Scene.prototype.mapMouse = function () {
  this.mappedMouse.x = mouseX - this.offset.x;
  this.mappedMouse.y = mouseY - this.offset.y;
};

Scene.prototype.stopDragging = function () {
  this.dragOffset.x = 0;
  this.dragOffset.y = 0;
  //this.mode = "clicking";
  //console.log("scene enter clicking mode");
};

Scene.prototype.isDragging = function () {
  if(this.mode == "dragging"){
    return true
  } else {
    return false;
  }
};
Scene.prototype.whileDragging = function () {
  if (sc.mode === "dragging"){
    this.offset.x = mouseX - this.dragOffset.x;
    this.offset.y = mouseY - this.dragOffset.y;
  } else {
    this.stopDragging();
  }
};

Scene.prototype.createNoP5Vector = function (name, x = 0, y = 0, z = 0) {
  //console.log(this);
  this[name] = createVector(x,y,z);
  delete this[name].p5;
};

Scene.prototype.startDragging = function () {
  this.mode = "dragging";
  this.dragOffset.x = mouseX - this.offset.x;
  this.dragOffset.y = mouseY - this.offset.y;
};

var backgroundGrid = function (){
  amount = 40;
  size = 5000;
  stroke(colors.darkGrey);
  strokeWeight(1);
  fill(colors.darkGrey);
  //horizontal lines
  for (i = -amount/2; i < amount; i++){
    stroke(colors.darkGrey);
    line(-size, (size/amount)*i, size, (size/amount)*i);
    noStroke()
    text(i, (size/amount)*i, 20);
  }
  // vertiacal lines
  for (i = -amount/2; i < amount; i++){
    stroke(colors.darkGrey);
    line((size/amount)*i, -size, (size/amount)*i, size);
    noStroke();
    text(i, 20, (size/amount)*i);
  }
}
