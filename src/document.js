class Document {
  constructor() {
    this.scene = new Scene();
    this.settings = { "option1": "placeholder", "option2": "myColor", "option3": "myAngle" };
    this.screens = {};
    this.selection = [];
    this.canvas = function () { createCanvas(windowWidth, windowHeight) };
  }
}

Document.prototype.save = function () {
  saveJSON(doc, "config.json");
};

Document.prototype.loadFile = function () {
  var file = "./data/config.json";
  console.log("loading " + file);
  json = loadJSON(file), this.jsonLoaded(file);
};


Document.prototype.jsonLoaded = function (uri) {
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

  for (var key in json.screens) {
    new Screen(json.screens[key].ID, json.screens[key].pos.x, json.screens[key].pos.y);
    //doc.screens[key].note = json.screens[key].ID;
    //console.log(json.screens[key].pos.x + " - " + json.screens[key].pos.y);
  }

  //console.log(doc.screens = Object.assign(doc.screens, json.screens))
  console.log("finished updating");
}

function eachRecursive3(obj) {
  //console.log("Start recusrion");
  //console.log(test2);
  //console.log("count: " + count);

  for (var k in obj) {
    if (obj[k] !== null && obj.hasOwnProperty(k)) {
      //console.log(typeof obj[k]);
      //console.log(obj[k]);

      if (obj.hasOwnProperty("p5")) {
        // console.log("P5 element found");
        delete screens[obj].p5;
        //console.log(obj);

      } else if (typeof obj[k] === "string" || typeof obj === "number") {
        //console.log(obj);
        console.log("write value:  " + obj);
        //test2[k] = obj[k];

      } else if (typeof obj === "object" && !obj.hasOwnProperty("p5") || !obj.hasOwnProperty("image")) {
        //console.log("Object found: Start new Recursions");
        // console.log("Assign:"  + obj[k].constructor.name + " to " + test2[k] );
        test2[k] = obj[k];
        count++
        eachRecursive3(obj[k]);
      }
    }
  }
}