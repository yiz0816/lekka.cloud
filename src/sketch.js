var sc, gui, json, screens, data2 = {};
var test2 = {};
var count = 0;

function setup() {
  doc = new Document();
  sc = doc.scene;
  screens = doc.screens;
  createSubColors();
  frameRate(60);


  //createNewScreen(random(-50, 50), random(-50, 50));
  //createNewScreen(random(-50, 50), random(-50, 50));
  //createNewScreen2(random(-50, 50), random(-50, 50));
  //createNewScreen2(random(-50, 50), random(-50, 50));

  /*screens.push(screen1 = new Screen(500,300));
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
  screen5.connectTo(screen3);*/

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


  for (var key in doc.screens) {
    doc.screens[key].draw();
    doc.screens[key].drawConnection();
    //console.log(key + " at " + screens[key].pos.x)
  }

  doc.selection.forEach(function (item) {
    item.renderSelection();
  })

  if (keyIsPressed === true && keyCode === 32) {
    cursor(HAND);
    if (mouseIsPressed === true) {
      doc.scene.startDragging();
      console.log("start draggin");
    }
  }
}

function mousePressed() {
  doc.selection = [];
  for (var key in doc.screens) {
    // skip loop if the property is from prototype
    if (doc.screens.hasOwnProperty(key)) {
      if (doc.screens[key].clicked()) {
        //console.log("clicked");
        doc.selection.push(doc.screens[key]);
        doc.screens[key].startDrag();
        break;
      }
    }
  }
}

function keyPressed() {
  if (key === "s" || key === "S") {
    console.log("save");
    doc.save();
  }
  if (key === "l" || key === "L") {
    doc.loadFile();
  }
  if (key === "1" || key === "1") {
    doc.updateFile();
  }
}
function mouseMoved() {
  sc.mapMouse();
}

function mouseReleased() {
  if (doc.selection.length > 0) {
    doc.selection.forEach(function (item) {
      item.endDrag();
    })
  }
}
function mouseDragged() {
  sc.whileDragging();

  if (doc.selection.length > 0 && sc.mode == "clicking") {
    doc.selection.forEach(function (item) {
      item.whileDrag();
      item.setLocalPorts();
    })
  }
}

function keyReleased() {
  if (key === " ") {
    cursor(ARROW);
  }
  sc.stopDragging();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
