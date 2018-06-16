var scene = {
  mode: "clicking",
  xOffset: 250,
  yOffset: 250,
  tmpXOffset: 0,
  tmpYOffset: 0,
  mappedMouseX: 0,
  mappedMouseY: 0,

  setMoveMode: function () {
    this.mode = "move";
    cursor(HAND);
    console.log("show Hand");
  },
  setClickMode: function() {
    this.mode = "clicking";
    cursor(ARROW);
    console.log("Back to clicking mode");
  },
  isMoveMode: function (){
    if (this.mode == "move"){
      return true
    } else {
      return false;
    }
  },
  StartDragging: function(){
    this.mode = "dragging";
    this.tmpXOffset = mouseX - this.xOffset;
    this.tmpYOffset = mouseY - this.yOffset;
    //console.log ("Start dragging from: " + this.tmpXOffset + ", " + this.tmpYOffset);
  },
  isDragging: function(){
    if(this.mode == "dragging"){
      return true
    } else {
      return false;
    }
  },
  WhileDragging: function(){
    this.xOffset = mouseX - this.tmpXOffset;
    this.yOffset = mouseY - this.tmpYOffset;
    //console.log(this.xOffset + ", " + this.yOffset + ", " + mouseX + ", " +  mouseY);
  },
  StopDragging: function(){
    console.log("stopped dragging");
    this.tmpXOffset = 0;
    this.tmpYOffset = 0;
    this.mode = "clicking";
  },

  mapMouse: function(){
    this.mappedMouseX =  mouseX - this.xOffset;
    this.mappedMouseY =  mouseY - this.yOffset;
  }
}


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
