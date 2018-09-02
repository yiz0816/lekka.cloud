var sc, gui, json, cvn, inputs;

function setup() {
  doc = new Document();
  sc = doc.scene;
  ports = doc.port;
  createSubColors();
  frameRate(60);

  cvn = createCanvas(windowWidth, windowHeight).drop(dropFile);
  loadGUI();

  // Instructions
  console.log("Press `S` to save the current layout to a config.json");

  // Floating Interface Elements
  if (doc.settings.autoload == true) {
    try {
      doc.loadFile();
      setTimeout(function () { doc.updateFile(); }, 500);
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

  // Render Screens and Connection
  for (var key in doc.screens) {
    doc.screens[key].draw();
    doc.screens[key].out.port.draw();
    for (var i in doc.screens[key].out.connections) {
      //console.log(i);
      //console.log(getScreenByID(i));
      if (getScreenByID(i) !== "undefined") {
        var p = doc.screens[i];

        doc.screens[key].out.port.drawConnection(p.pos.x, p.pos.y + p.size.h / 2);
      } else {
        console.log("delete port");
      }
    }
  }

  // Render Selection
  if (doc.selection.length > 0) {
    for (var key in doc.selection) {
      if (doc.selection[key].constructor.name === "Screen") {
        doc.selection[key].renderSelection();
      }
    }
    for (var key in doc.selection) {
      if (doc.selection[key].constructor.name === "Port" && doc.scene.mode === "connect") {
        doc.selection[key].drawTempLine();
      }
    }
  }



  // Dragggin the layout pane
  if (keyIsPressed === true && keyCode === 32) {
    cursor(HAND);
    if (mouseIsPressed === true) {
      doc.scene.startDragging();
    }
  }

  // Hover Screens
  for (var k in doc.screens) {
    if (doc.screens[k].isMouseOver()) {
      doc.screens[k].renderSelection();
      //doc.screens[k].renderReplace();
      setButtonPosition("replaceButton", doc.screens[k].pos.x + doc.scene.offset.x, doc.screens[k].pos.y + doc.scene.offset.y);
      setButtonPosition("deleteButton", doc.screens[k].pos.x + doc.scene.offset.x, doc.screens[k].pos.y + doc.scene.offset.y + 30);
      //doc.screens[k].out.port.renderHighlight();
      break;
    } else {
      setButtonPosition("replaceButton", 0, -50);
      setButtonPosition("deleteButton", 0, -30);
    }
  }

  // Hover Ports
  for (var k in doc.screens) {
    if (doc.screens[k].out.port.isMouseOver()) {
      doc.screens[k].out.port.renderHighlight();
      if (mouseIsPressed && doc.screens[k].isMouseOver()) {
        //doc.ports[k].drawConncetion(mouseX, mouseY);
      }
    }
  }
  for (var i in doc.screens) {
    if (doc.screens[i].isMouseOver()) {
    }
  }
}

function redraw() {

}
function mousePressed() {
  doc.selection = [];

  for (var key in doc.screens) {
    if (doc.screens.hasOwnProperty(key)) {
      if (doc.screens[key].isMouseOver()) {
        doc.selection.push(doc.screens[key]);
        doc.screens[key].startDrag();
        break;
      }
    }
    if (doc.screens[key].out.port.isMouseOver()) {
      doc.scene.setMode("connect");
      doc.screens[key].out.port.renderHighlight();
      doc.selection.push(doc.screens[key].out.port)
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
      doc.selection[key].updatePorts();
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
  doc.scene.setMode("clicking");
}


function mouseDragged() {
  //console.log(doc.scene.mode);
  doc.scene.whileDragging();
  for (var key in doc.selection) {
    if (doc.scene.mode === "clicking" || doc.scene.mode === "moveLayer") {
      doc.selection[key].whileDrag();
      doc.selection[key].updatePorts();
      //doc.ports[key].whileDrag();
    }
    else if (doc.scene.mode === "connect" && doc.selection[key].constructor.name === "Port") {
      //doc.selection[key].drawConncetion(0,0, mouseX, mouseY);
    }
  }
}

function keyReleased() {
  if (key === " ") {
    sc.stopDragging();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function doubleClicked() {
  if (doc.selection.length > 0) {
    for (var key in doc.selection) {
      if (doc.selection[key].constructor.name === "Port") {
        var s = doc.selection[key].parentID;
        console.log(doc.screens[s].out.connections = {});
        console.log("delete connections from screen: " + s);
      }
    }
  }
}

function dropFile(file) {
  console.log(file);
  if (file.type === "image") {
    //console.log("dropped file is an image. So create a new Screen with this image");
    var s = new Screen(- doc.scene.offset.x + width / 2 - 300, -doc.scene.offset.y + height / 2 - 300)
    s.imageStorage = file;
    s.initialiseScreen();
  } else if (file.type === "application") {
    if (file.subtype === "json") {
      doc.loadBase64File(file);
    }
  } else {
    console.log("file format is not supported");
  }
}