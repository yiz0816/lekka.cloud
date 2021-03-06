class Layer {
  constructor(x = 100, y = 100, id = createID()) {
    this.pos = {};
    this.pos.x = x;
    this.pos.y = y;
    this.size = {};
    this.size.w = 300;
    this.size.h = 600;
    this.dragOffset = [];
    this.ID = id;
    this.attributes = {};

    this.initialiseLayer();
  }
}
Layer.prototype.initialiseLayer = function () {
  for (var k in doc.settings.defaultAttributes) {
    this.addAttribute(doc.settings.defaultAttributes[k]);
  }
  this.addAttribute("Translation", "key3", "Guten Tag");
  this.addAttribute("Translation", "key4", "Guten Abend");
  this.addAttribute("hidden", "created", int(random(1, 20)) + " days ago");
  this.addAttribute("hidden", "lastEditor", randomNames[int(random(randomNames.length))]);

}
Layer.prototype.startDrag = function () {
  this.dragOffset.x = mouseX - this.pos.x;
  this.dragOffset.y = mouseY - this.pos.y;
  //console.log ("Start dragging layer from: " + this.dragOffset.x + ", " + this.dragOffset.y);
  //doc.scene.setMode("moveLayer");
};

Layer.prototype.whileDrag = function () {
  doc.scene.setMode("moveLayer");
  this.pos.x = mouseX - this.dragOffset.x;
  this.pos.y = mouseY - this.dragOffset.y;
  //console.log("dragging layer to: " + this.pos.x + ", " + this.pos.y);

};

Layer.prototype.endDrag = function () {
  this.dragOffset.x = 0;
  this.dragOffset.y = 0;
  doc.scene.setMode("clicking");
};

Layer.prototype.setSize = function (w, h) {
  this.size.w = w;
  this.size.h = h;
  //console.log("set Size to: " + x + ", " + y);
};

Layer.prototype.renderSelection = function () {
  strokeWeight(2);
  noFill();
  stroke(colors.highlight);
  rect(this.pos.x, this.pos.y, this.size.w, this.size.h);
};

/*Layer.prototype.updateSize = function () {
  this.setSize();
};*/

Layer.prototype.setPosition = function (x, y) {
  this.pos.x = x;
  this.pos.y = y;
}

Layer.prototype.isMouseOver = function () {

  if (sc.mappedMouse.x > this.pos.x &&
    sc.mappedMouse.x < this.pos.x + this.size.w &&
    sc.mappedMouse.y > this.pos.y &&
    sc.mappedMouse.y < this.pos.y + this.size.h) {

    return true
  } else {
    return false;
  }
}
Layer.prototype.addAttribute = function (category, key = "undefined", value = "undefined") {
  if (typeof this.attributes[category] === "undefined") {
    this.attributes[category] = {};
    this.attributes[category].data = {};
    this.attributes[category].categoryName = category;
  }

  if (key !== "undefined" || value !== "undefined") {
    this.attributes[category].data[key] = value;
  }
}

Layer.prototype.renderInformation = function () {
  gui.ap.html("<h1>" + this.ID + "</h1>");
  gui.ap.html("<p class='small'><span class='light'>Created </span>" + this.attributes.hidden.data.created + "<span class=' light'> by </span><a href='#'>" + this.attributes.hidden.data.lastEditor + "</a></p>", true);
  if (typeof this === "object") {
    gui.ap.html("<h3 class='accordion'> Image</h3>", true)
    gui.ap.html("<p class='attribute'><span class='attributeName'> Resolution:</span><span class='attributeValue'>" + this.resolution + "</span></p>", true);
  }

 /* for (var k in this.attributes) {
    if (this.attributes[k].categoryName !== "hidden") {
      gui.ap.html("<h3 class='accordion'>" + this.attributes[k].categoryName + "</h3>", true);
      for (var i in this.attributes[k].data) {
        if (this.attributes[k].data.hasOwnProperty(i)) {
          gui.ap.html("<p class='attribute'><span class='attributeName'>" + i + "</span><span class='attributeValue'>" + this.attributes[k].data[i] + "</span></p>", true);
          createKeyField(i, "aa");
        }
      }
    }
  }*/
  Object.keys(this.attributes).forEach(k => {
    console.log(k);
    if (k !== "hidden") {
      //gui.ap.html("<h3 class='accordion'>" + this.attributes[k].categoryName + "</h3>", true);

      Object.keys(this.attributes[k].data).forEach(j => {
        console.log(j);
        //gui.ap.html("<p class='attribute'><span class='attributeName'>" + i + "</span><span class='attributeValue'>" + this.attributes[k].data[j] + "</span></p>", true);
        createKeyField(j, this.attributes[k].data[j]);
      });
    }
  });
  //createKeyField(i, "aa");
}

var createID = function () {
  var id = Math.random().toString(36).substr(2, 9);
  return id
}

var randomNames = ["Jane Marry", "Peter Johnson", "Philip Mattha"];
var randomAttributeCategories = ["Translation", "Testing", "Design", "Annotations"];
var translationAttribute = {
  "type": "list",
  "data": {
    "key1": "Hello",
    "key2": "bye"
  }
}