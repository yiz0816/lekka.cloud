var sc, gui, json;
var test2 = {};
var count = 0;

function setup() {
  doc = new Document();
  sc = doc.scene;
  ports = doc.port;
  createSubColors();
  frameRate(60);

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

  // Render Scenery
  background(colors.lightGrey);
  translate(sc.offset.x, sc.offset.y);
  backgroundGrid();
  sc.mapMouse();

  // Render Screens and Connection
  for (var key in doc.screens) {
    doc.screens[key].draw();
    doc.ports[key].draw();
    //doc.screens[key].drawConnection();
  }

  // Render Selection
  if (doc.selection.length > 0) {
    for (var key in doc.selection) {
      doc.selection[key].renderSelection();
    }
  }

  // Dragggin the layout pane
  if (keyIsPressed === true && keyCode === 32) {
    cursor(HAND);
    if (mouseIsPressed === true) {
      doc.scene.startDragging();
      console.log("start draggin");
    }
  }

  // Hover Screens
  for (var k in doc.screens) {
    if (doc.screens[k].isMouseOver()) {
      doc.screens[k].renderSelection();
      break;
    }
  }

  // Hover Ports
  for (var k in doc.ports) {
    if (doc.ports[k].isMouseOver()) {
      doc.ports[k].renderHighlight();
      if (mouseIsPressed && doc.ports[k].isMouseOver()) {
        doc.ports[k].drawConncetion(mouseX, mouseY);
      }
    }
  }
  for (var i in doc.screens) {
    if(doc.screens[i].isMouseOver()){
      //console.log(doc.screens[i].ID);
      //console.log(doc.scene.mappedMouse.x);
    }
    //console.log(doc.screens[i].isMouseOver());
  }
}

function mousePressed() {
  doc.selection = [];
  for (var key in doc.screens) {
    // skip loop if the property is from prototype
    if (doc.screens.hasOwnProperty(key)) {
      if (doc.screens[key].isMouseOver()) {
        //console.log("isMouseOver");
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

function mouseReleased() {
  for (var key in doc.selection) {
    doc.selection[key].endDrag();
    doc.selection[key].updatePort();
    //doc.ports[key].endDrag();
  }

  if (doc.scene.mode == "connect") {
    for (var k in doc.ports) {
      for (var i in doc.screens) {
        console.log(doc.screens[i]);
        if (doc.screens[i].isMouseOver()) {
          console.log("hit target");
          doc.ports[k].connectTo(doc.screens[i]);
        }
      }
    }
  }
}


function mouseDragged() {
  sc.whileDragging();

  if (doc.scene.mode == "clicking") {
    for (var key in doc.selection) {
      doc.selection[key].whileDrag();
      //doc.ports[key].whileDrag();
    }
  }

  //for (var k in doc.)
  /* if (doc.selection.length > 0 && sc.mode == "clicking") {
     doc.selection.forEach(function (item) {
       item.whileDrag();
     })
   }*/
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
