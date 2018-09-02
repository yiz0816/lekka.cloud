class Document {
  constructor() {
    this.scene = new Scene();
    this.settings = { "autoload": false };
    this.screens = {};
    this.selection = {};
    this.canvas = function () { createCanvas(windowWidth, windowHeight) };
    this.fileName = "undefined";
    this.defaultLayers = {"translation" : "Translations", "comments" : "Comments", "Budget" : "Budget"}
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

Document.prototype.loadFile = function (data) {
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

Document.prototype.loadLocalFile = function (file = "./data/config.json") {
  console.log(file);
  json = loadJSON(file), this.jsonLoaded(file);
};

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
  setTimeout(function () { doc.updateFile(); }, 500);
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
    for (var i in json.screens[k].out.connections) {
      t.createOutgoingPort(t);
      t.out.connections[i] = json.screens[k].out.connections[i]
    }
    t.initialiseScreen();
  }


  console.log("finished updating");
}