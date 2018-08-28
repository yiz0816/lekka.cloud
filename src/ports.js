class Port extends Layer {
    constructor(parent) {
        super();
        //console.log("new Port genrated");
        this.ID = "test" //parent.ID
        this.parent = parent;
        this.defaultPosition();
    }
}

Port.prototype.draw = function () {
    noStroke();
    fill(colors.highlight20);
    ellipse(this.parent.pos.x + this.parent.size.w, this.parent.pos.y + this.parent.size.h / 2, 16, 16);

    //strokeWeight(1)
    //noFill();
    //fill(colors.highlight20);
    //rect(this.pos.x, this.pos.y, this.size.w, this.size.h);
    //console.log(this.pos.x);
}

createOutgoingPort = function (parent) {
    doc.ports[parent.ID] = new Port(parent, parent.ID);
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
    this.pos.x = this.parent.pos.x + this.parent.size.w - 20;
    this.pos.y = this.parent.pos.y + this.parent.size.h / 2 - 40;
    this.size.w = 40;
    this.size.h = 80;
}

Port.prototype.drawConncetion = function (x2, y2) {
    this.dragOffset.x = x2;
    this.dragOffset.y = y2;
    var startP = [];
    startP.x = this.pos.x + this.size.w / 2;
    startP.y = this.pos.y + this.size.h / 2;
    var endP = [];
    endP.x = x2 - doc.scene.offset.x;
    endP.y = y2 - doc.scene.offset.y;
    var siz = [];
    siz.x = abs(startP.x - endP.x);
    siz.y = abs(startP.y - endP.y);
    let overshoot = siz.x / 2;

    stroke(colors.highlight40);
    strokeWeight(3);
    noFill();
    bezier(
        startP.x, startP.y,               // Point 1
        startP.x + overshoot, startP.y,           // Point 2
        endP.x - overshoot, endP.y,             // Point 3
        endP.x, endP.y                    // Point 4
    );
    noStroke()
    fill(0);
};

Port.prototype.connectTo = function(target){
    this.parent.out.connections[target.ID] = target;
    console.log("Port " + this.ID + " is connected to Screen " + target.ID)
    return true;
}