var sc, gui, json;

function setup() {
  doc = new Document();
  sc = doc.scene;
  ports = doc.port;
  createSubColors();
  frameRate(60);

  createCanvas(windowWidth, windowHeight).drop(doc.loadBase64File);
  resizeCanvas(windowWidth, windowHeight);
  loadGUI();

  // Instructions
  console.log("Press `S` to save the current layout to a config.json");
  console.log("Press `L` to load a config.json file.")

  // Floating Interface Elements

  if (doc.settings.autoload == true) {
    try {
      doc.loadFile();
      setTimeout(function() {doc.updateFile(); }, 500);
    }
    catch (err) {
      console.log(err);
    }
  }
}

function draw() {

  // Render Scenery
  background(colors.lightGrey);
  translate(sc.offset.x, sc.offset.y);
  backgroundGrid();
  sc.mapMouse();
  //console.log(doc.scene.mode);

  // Render Screens and Connection
  for (var key in doc.screens) {
    doc.screens[key].draw();
    doc.ports[key].draw();
    for (var i in doc.screens[key].out.connections) {
      //console.log("connected to " + doc.screens[key].out.connections[i].ID);
      doc.ports[key].drawConncetion(doc.screens[key].out.connections[i].pos.x + doc.scene.offset.x, doc.screens[key].out.connections[i].pos.y + doc.scene.offset.y + doc.screens[key].size.h / 2);
    }

    //doc.screens[key].drawConnection();
  }

  // Render Selection
  if (doc.selection.length > 0) {
    for (var key in doc.selection) {
      if (doc.selection[key].constructor.name === "Screen") {
        doc.selection[key].renderSelection();
      }
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
    if (doc.screens[i].isMouseOver()) {
    }
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

  for (var k in doc.ports) {
    if (doc.ports[k].isMouseOver()) {
      doc.selection.push(doc.ports[k]);
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
    if (doc.selection[key].constructor.name === "Screen") {
      doc.selection[key].endDrag();
      doc.selection[key].updatePort();
      doc.selection[key].renderInformation();
    } else if (doc.selection[key].constructor.name === "Port") {
      if (doc.scene.mode == "connect") {
        for (var i in doc.screens) {
          if (doc.screens[i].isMouseOver()) {
            doc.selection[key].connectTo(doc.screens[i]);
          }
        }
      }
    }
  }
  doc.scene.mode = "clicking";
}


function mouseDragged() {
  doc.scene.whileDragging();

  if (doc.scene.mode == "moveLayer") {
    for (var key in doc.selection) {
      doc.selection[key].whileDrag();
      //doc.ports[key].whileDrag();
    }
  }

  for (var k in doc.ports) {
    if (doc.ports[k].isMouseOver()) {
      doc.ports[k].renderHighlight();
      if (mouseIsPressed) {
        doc.scene.mode = "connect";
        doc.ports[k].drawConncetion(mouseX, mouseY);
      }
    }
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
