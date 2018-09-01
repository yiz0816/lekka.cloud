class Port extends Layer {
    constructor(parent) {
        super();
        //this.ID = parent.ID
        this.parent = parent;
        this.parentID = parent.ID
        this.defaultPosition();
    }
}

Port.prototype.draw = function () {
    noStroke();
    fill(colors.highlight20);
    var p = doc.screens[this.parentID];
    //console.log(parent);
    ellipse(p.pos.x + p.size.w, p.pos.y + p.size.h / 2, 16, 16);
}

Port.prototype.renderHighlight = function () {
    fill(colors.highlight20);
    noStroke();
    rect(this.pos.x, this.pos.y, this.size.w, this.size.h);
}
Port.prototype.setPosition = function (x, y) {
    this.pos.x = x;
    this.pos.y = y;
}

Port.prototype.defaultPosition = function () {
    var p = doc.screens[this.parentID];
    //console.log(doc.screens[this.parentID]);
    //console.log(p);
    //console.log(this.parent);
    //console.log(getScreenByID(this.parentID));
    //var p = getScreenByID(this.parentID);

    this.pos.x = this.parent.pos.x + this.parent.size.w - 20;
    this.pos.y = this.parent.pos.y + this.parent.size.h / 2 - 40;
    this.size.w = 40;
    this.size.h = 80;
}
Port.prototype.drawLine = function (x1, y1, x2, y2) {
    this.startP = [];
    this.startP.x = x1;
    this.startP.y = y1;
    this.endP = [];
    this.endP.x = x2;
    this.endP.y = y2;
    this.siz = [];
    this.siz.x = abs(x1 - x2);
    this.siz.y = abs(y1 - y2);
    this.overshoot = this.siz.x / 2;

    stroke(colors.highlight80);
    strokeWeight(3);
    noFill();
    bezier(
        this.startP.x + doc.scene.offset.x + this.size.w / 2, this.startP.y + doc.scene.offset.y + this.size.h / 2,                         // Point 1
        this.startP.x + this.overshoot + doc.scene.offset.x + this.size.w / 2, this.startP.y + doc.scene.offset.y + this.size.h / 2,        // Point 2
        this.endP.x - this.overshoot + doc.scene.offset.x, this.endP.y + doc.scene.offset.y,                                            // Point 3
        this.endP.x + doc.scene.offset.x, this.endP.y + doc.scene.offset.y                                                              // Point 4
    );
}

Port.prototype.drawTempLine = function () {
    this.drawLine(this.pos.x, this.pos.y, mouseX, mouseY);
}

Port.prototype.drawConnection = function (x2, y2) {
    this.drawLine(this.pos.x, this.pos.y, x2, y2);
};

Port.prototype.connectTo = function (target) {
    var p = doc.screens[this.parentID];

    p.out.connections[target.ID] = target.ID;
    console.log("Port " + this.ID + " is connected to Screen " + target.ID)
    return true;
}
Port.prototype.removeParent = function () {
    this.parent = "fwfsd";
    console.log("parent disconnected. Done to save as json");
}

getScreenByID = function (id) {
    console.log("get screen by ID");
    //console.log(id)
    var result = "no screen found";
    for (var k in doc.screens) {
        //console.log(doc.screens[k].ID)
        if (id === doc.screens[k].ID) {
            //console.log(doc.screens[k]);
            result = doc.screens[k];
        }
    }
    return result
}