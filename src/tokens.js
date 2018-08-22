var colors = {
  lightGrey: '#F0F0F0',
  Grey: '#888',
  darkGrey: '#cccccc',
  pink: '#f957c3',
  white: '#FFFFFF',
  green: "rgba(0,255,0,1)"
}

var createSubColors = function(){
  colors.connectionLines = colors.pink;

  colors.highlight = colors.green;
  colors.highlight40 = createShadeFromRGB(colors.highlight, 40)
  colors.highlight60 = createShadeFromRGB(colors.highlight, 60)
  colors.highlight80 = createShadeFromRGB(colors.highlight, 80)
  colors.highlight20 = createShadeFromRGB(colors.highlight, 20)
  colors.highlight10 = createShadeFromRGB(colors.highlight, 10)

  colors.grey = colors.Grey;
}

var createShadeFromRGB = function(color, alpha){
  // Debug the Input
  //console.log(color)

  var raw = color.split(",")
  var r = raw[0].split("(");
  var g = raw[1];
  var b = raw[2].split(")");
  var a = 1;

  if(raw.length === 4){
    a = 1 * alpha; 
  }

  var result = console.log("Created a sub color of " + color + " with the new value: rgba(" + r[1] + "," + g + "," + b[0] + ",0." + a + ")");  
  
  return "rgba(" + r[1] + "," + g + "," + b[0] + ",0." + a + ")";
};


