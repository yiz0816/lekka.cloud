class Document {
  constructor() {
    this.scene = new Scene();
    this.settings = {
      "autoload": true
    };
    this.screens = {};
    this.selection = {};
    this.canvas = function () {
      createCanvas(windowWidth, windowHeight)
    };
    this.fileName = "undefined";
    this.settings.defaultAttributes = ["Translation", "Comments", "Budget", "Testing", "Annotations", "Bugs"];
  }
}

Document.prototype.save = function () {
  var save = doc;
  for (var key in save.screens) {
    for (var i in save.screens[key].out.port) {
      if (save.screens.hasOwnProperty(key)) {
        save.screens[key].out.port.removeParent();
        //console.log("Remove parent to be saved in Json");
      }
    }
  }
  if (this.fileName === "undefined") {
    this.fileName = "untitled-" + year() + "-" + month() + "-" + day();
    this.fileName = prompt("Please enter a name for your file", this.fileName);
  }
  saveJSON(save, this.fileName);
};

Document.prototype.loadFile = function (data = "./data/default.json") {
  console.log("Start loading some file");
  try {
    if (typeof data === "string") {
      console.log("input to load is string so use it as local uri");
      doc.loadLocalFile(data);
    } else if (typeof data === "object") {
      console.log("input is an object so it contains data as Base 64");
      doc.loadBase64File(data);
    }
  } catch (err) {
    console.log(err);
  }
}


Document.prototype.loadLocalFile = function (file = "./data/default.json") {
console.log(file);
json = loadJSON(file), this.jsonLoaded(file);

}
Document.prototype.loadBase64File = function (file) {
  var f = file;
  var data = f.data.split(",");
  if (f.type === "application") {
    if (f.subtype === "json") {
      console.log("file format of " + f.name + " is okay");
      //console.log(atob(data[1]));
    }
  }
  json = JSON.parse(atob(data[1]));
  console.log(f.name + " loaded successfully");
  setTimeout(function () {
    doc.updateFile();
  }, 2500);
};


Document.prototype.jsonLoaded = function (uri) {
  //console.log(uri);
  var name = uri.split("/");
  name = name[name.length - 1];
  console.log(name + "' loaded");
}

Document.prototype.autoSave = function (uri) {
  console.log(uri);
  var name = uri.split("/");
  name = name[name.length - 1];
  console.log(name + "' loaded");
}

Document.prototype.updateFile = function () {
  console.log("updating sceen");
  console.log(json);

  //Map values
  this.version = json.version;
  this.scene.mode = "clicking";
  this.fileName = json.fileName;

  for (var key in json.settings) {
    // skip loop if the property is from prototype
    if (!json.settings.hasOwnProperty(key)) continue;
    this.settings[key] = json.settings[key];
  }

  for (var key in json.scene) {
    // skip loop if the property is from prototype
    if (!json.scene.hasOwnProperty(key)) continue;
    this.scene[key] = json.scene[key];
  }

  delete doc.screens;
  doc.screens = {};

  for (var k in json.screens) {
    var t = new Screen(json.screens[k].pos.x, json.screens[k].pos.y, json.screens[k].ID);
    t.imageStorage = json.screens[k].imageStorage;
    console.log(t);
    console.log(json.screens[k].resolution);
    t.resolution = json.screens[k].resolution;
    for (var i in json.screens[k].out.connections) {
      t.createOutgoingPort(t);
      t.out.connections[i] = json.screens[k].out.connections[i]
    }
    t.initialiseScreen();
  }


  console.log("finished updating");
}

Document.prototype.printLayout = function () {
  console.log("print");
  var orgW = windowWidth;
  var orgH = windowHeight;

  var cvnW = windowWidth;
  var cvnH = windowHeight;
  var cvnX = 0;
  var cvnY = 0;

  // Catch all screens inside a rectangle
  for (var k in doc.screens) {
    if (doc.screens.hasOwnProperty(k)) {

      // Check for the X size
      if (doc.screens[k].pos.x < cvnX) {
        cvnX = doc.screens[k].pos.x;
      } else if (doc.screens[k].pos.x + doc.screens[k].size.w > cvnW) {
        cvnW = doc.screens[k].pos.x + doc.screens[k].size.w;
      }

      // Check for the Y size
      if (doc.screens[k].pos.y < cvnY) {
        cvnY = doc.screens[k].pos.y;
      } else if (doc.screens[k].pos.y + doc.screens[k].size.h > cvnH) {
        cvnH = doc.screens[k].pos.y + doc.screens[k].size.h;
      }
    }
  }

  // + 50 and +100 add a nice padding to the layout
  doc.scene.offset.x = Math.abs(cvnX) + 50;
  doc.scene.offset.y = Math.abs(cvnY) + 50;
  resizeCanvas(cvnW + Math.abs(cvnX) + 100, cvnH + Math.abs(cvnY) + 100);

  saveCanvas(doc.fileName, "jpg");

  // Restore old canvas size
  resizeCanvas(orgW, orgH);
}