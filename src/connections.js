 /* For now this file is not used at all
 
  class roundedLine {
  constructor (x1,y1,x2,y2){
    this.startP = [];
    this.startP.x = x1;
    this.startP.y = y1;
    this.endP = [];
    this.endP.x = x2;
    this.endP.y = y2;
    this.size = [];
    this.size.x = abs(x1-x2);
    this.size.y = abs(y1-y2);
    this.overshoot = this.size.x/2;
  }
}

roundedLine.prototype.draw = function () {
  stroke(colors.Grey);
  strokeWeight(3);
  noFill();
  bezier(
    this.startP.x, this.startP.y,               // Point 1
    this.startP.x +this.overshoot, this.startP.y,           // Point 2
    this.endP.x -this.overshoot, this.endP.y,             // Point 3
    this.endP.x, this.endP.y                    // Point 4
  )
  fill(colors.white);
  ellipse(this.startP.x, this.startP.y,8,8);    //Start Point
  ellipse(this.endP.x, this.endP.y,8,8);        //End Point

  /*
  ellipse(this.startP.x +this.overshoot, this.startP.y,5,5);    //Start Point
  ellipse(this.endP.x -this.overshoot, this.endP.y,5,5);        //End Point
  strokeWeight(1);
  line (this.startP.x, this.startP.y, this.startP.x +this.overshoot, this.startP.y)
  line (this.endP.x -this.overshoot, this.endP.y,this.endP.x, this.endP.y  )

};

function drawConnection(x1,y1,x2,y2){
  this.startP = [];
  this.startP.x = x1;
  this.startP.y = y1;
  this.endP = [];
  this.endP.x = x2;
  this.endP.y = y2;
  this.size = [];
  this.size.x = abs(x1-x2);
  this.size.y = abs(y1-y2);
  this.overshoot = this.size.x/2;


  stroke(colors.highlight80);
  strokeWeight(3);
  noFill();
  bezier(
    this.startP.x, this.startP.y,                   // Point 1
    this.startP.x +this.overshoot, this.startP.y,   // Point 2
    this.endP.x -this.overshoot, this.endP.y,       // Point 3
    this.endP.x, this.endP.y                        // Point 4
  )
  fill(colors.white);
  ellipse(this.startP.x, this.startP.y,8,8);    //Start Point
  ellipse(this.endP.x, this.endP.y,8,8);        //End Point
}
*/
