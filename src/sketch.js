  var screens = [];
  var sc, doc, gui;
  var data = {};

function setup() {
  doc = new Document();
  sc = doc.scene;
  screens = doc.screens;
  createSubColors();


  screens.push(screen1 = new Screen(500,300));

  screens.push(screen2 = new Screen());
  screens.push(screen3 = new Screen());
  screens.push(screen4 = new Screen());
  screens.push(screen5 = new Screen());

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
  screen5.connectTo(screen3);

  //doc.canvas = createCanvas(windowWidth, windowHeight);
  resizeCanvas(windowWidth, windowHeight);
  loadGUI();

  // Instructions
  console.log("Press `S` to save the current layout to a config.json");
  console.log("Press `L` to load a config.json file.")

  // Floating Interface Elements
  createAddScreenButton();
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

  if (keyIsPressed === true && key === " "){
    cursor(HAND);
    if(mouseIsPressed === true){
      sc.startDragging();
    }
  }
}

function mousePressed(){
  doc.selection = [];
  screens.forEach(function (item){
    if(item.clicked()){
      //console.log("clicked");
      doc.selection.push(item);
      item.startDrag();
    }
  });
}

function keyPressed(){
  if(keyCode === "s" || key === "S"){
    console.log("save");
    doc.save(doc);
  }
  if(keyCode === "l" || key === "L"){
    console.log("load file");
    doc.updateFile();
  }
}
function mouseMoved(){
  //console.log(scene.mappedMouseX + ", " + scene.mappedMouseY + " – " + screen1.pos.x + ". " + screen1.pos.y);
  sc.mapMouse();
}

function mouseReleased(){
  if(doc.selection.length  > 0){
    doc.selection.forEach(function (item){
      item.endDrag();
    })
  }
}
function mouseDragged(){
  sc.whileDragging();

  if(doc.selection.length  > 0 && sc.mode == "clicking"){
    doc.selection.forEach(function (item){
      item.whileDrag();
      item.setLocalPorts();
    })
  }
}

function keyReleased() {
  if (key === " "){
    cursor(ARROW);
  }
  sc.stopDragging();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
