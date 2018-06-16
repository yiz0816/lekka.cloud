  var screens = [];
  var sc, doc;

function setup() {
  doc = new Document();
  sc = doc.scene;
  screens = doc.screens;


  screens.push(screen1 = new Screen());
  screens.push(screen2 = new Screen());
  screens.push(screen3 = new Screen());
  screens.push(screen4 = new Screen());

  screen1.connectTo(screen2);
  screen2.setPositionX(700);
  screen2.setPositionY(-200);
  screen1.setPositionX(-100);
  screen3.setPositionX(800);
  screen3.setPositionY(300);
  screen1.connectTo(screen3);
  screen2.connectTo(screen3);
  screen4.setPositionX(-250);
  screen4.setPositionY(-600);
  screen4.connectTo(screen1);

  var canvas = createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(colors.lightGrey);
  translate(sc.offset.x, sc.offset.y);
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
  doc.selection.forEach(function (item){
    item.renderSelection();
  })
}

function mousePressed(){
  if(keyIsDown(32)){
    if(mouseButton === LEFT){
      sc.startDragging();
    }
  }
  doc.selection = [];
  screens.forEach(function (item){
    if(item.clicked()){
      console.log("clicked");
      doc.selection.push(item);
    }
  });
}

function mouseMoved(){
  //console.log(scene.mappedMouseX + ", " + scene.mappedMouseY + " – " + screen1.pos.x + ". " + screen1.pos.y);
  sc.mapMouse();
}

function mouseReleased(){
  if (sc.isDragging()){
    sc.stopDragging();
  }
}
function mouseDragged(){
  if(sc.isDragging()){
    sc.whileDragging();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
