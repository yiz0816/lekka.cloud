  var screens = [];

function preload() {


  screens.push(screen1 = new Screen());
  screens.push(screen2 = new Screen());
  screens.push(screen3 = new Screen());


  screen1.connectTo(screen2);
  screen2.setPositionX(700);
  screen2.setPositionY(-200);
  screen1.setPositionX(-100);
  screen3.setPositionX(800);
  screen3.setPositionY(300);
  screen1.connectTo(screen3);
  screen2.connectTo(screen3);

}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  background(colors.lightGrey);
}

function draw() {
  background(colors.lightGrey);
  translate(scene.xOffset, scene.yOffset);
  backgroundGrid()
/*
  line1 = new roundedLine(50,30,200,100);
  line2 = new roundedLine(600,-150,-300,50);
  line3 = new roundedLine(0,0,50,0);
  line1.draw();
  line2.draw();
  line3.draw();
*/
  screens.forEach(function (item){
    item.draw();
  });
  screens.forEach(function (item){
    item.drawConnection();
  })
}

function mousePressed(){
  if(keyIsDown(32)){
    if(mouseButton === LEFT){
      scene.StartDragging();
    }
  }
  screens.forEach(function (item){
    item.setSelection(false);
    if(item.clicked()){
      item.setSelection(true);
    }
  });
}

function mouseMoved(){
  //console.log(scene.mappedMouseX + ", " + scene.mappedMouseY + " – " + screen1.pos.x + ". " + screen1.pos.y);
  scene.mapMouse();
}

function mouseReleased(){
  if (scene.isDragging()){
    scene.StopDragging();
  }
}
function mouseDragged(){
  if(scene.isDragging()){
    scene.WhileDragging();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
