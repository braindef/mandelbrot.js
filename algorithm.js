//if page is finished loading run the initialisations
document.addEventListener("DOMContentLoaded", function() {
  initCanvas();

  ctx.font = "10px Arial";
  ctx.fillStyle = "black";

  putPixel(50, 50, 255, 0, 0, 128);


  
  canvas.addEventListener('mousedown', function(evnt) {
                                                    getCursorPosition(canvas, evnt, "down"); } );
                                                      
  canvas.addEventListener('mouseup', function(evnt) {
                                                    getCursorPosition(canvas, evnt, "up"); } );
                                                    
  putToHTML();
  drawScreen()
});


var ctx;

var width=600;
var height=600;
var threshold = 20;
var color1 = [255, 0, 0];
var color2 = [0, 0, 255];
var zoom = 100;
var offsetXnormalized=3;
var offsetYnormalized=3;
var offsetX = offsetXnormalized*zoom;
var offsetY = offsetYnormalized*zoom;
var selection1 = [];
var selection2 = [];

function update() {
  zoom = parseFloat(document.getElementById("zoom").value);
  offsetX = parseInt(document.getElementById("offsetX").value);
  offsetY = parseInt(document.getElementById("offsetY").value);
}

function putToHTML() {
  document.getElementById("zoom").value = zoom;
  document.getElementById("offsetX").value = offsetX;
  document.getElementById("offsetY").value = offsetY;
}


//initialize the canvas
function initCanvas() {
  canvas = document.getElementById('mycanvas');
  ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,600,600);
//  img = new Image();
//  img.src = "./sudoku-leer.svg"; 
//  ctx.drawImage(img, 10, 10, 580, 580);
  ctx.lineWidth=5;
  ctx.strokeRect(10, 10, 580, 580);
}


function getCursorPosition(canvas, event, action) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
    
    if(action=="down")
    {
      selection1=[x, y];
      console.log("DOWN: "+selection1);
    }
    if(action=="up")
    {
      selection2=[x, y];
      console.log("up: "+selection2);

      scale = width/(selection2[0] - selection1[0]);
      console.log("scale "+scale);
      
      zoom = zoom * scale  ;
      console.log("zoom "+zoom);

      weight = ((width/2)-(selection2[0]+selection1[0])/2);
      console.log("weight "+weight);
      
      deltaOffset = (selection2[0]-selection1[0])*weight;
      console.log("deltaOffset: "+deltaOffset);
      
      if((selection1[0]+selection2[0])/2 > width/2)
        offsetX -= deltaOffset;

    if((selection1[0]+selection2[0])/2 < width/2)
        offsetX += deltaOffset;

      putToHTML();
      drawScreen();
    }
}


function putPixel(x, y, r, g, b, a)
{
  ctx.fillStyle = "rgba("+r+", "+g+", "+b+", "+(a/255)+")";
  ctx.fillRect(x, y, 1, 1);
}


function mandelbrot(posX, posY)
{
  x = posX/zoom - offsetX/zoom;
  y = posY/zoom - offsetY/zoom;
  var c_re = x;
  var c_im = y;
  
  var z_re = 0;
  var z_im = 0;

  var iteration = 0;
  while(threshold>iteration && z_re*z_re + z_im*z_im <=4)   //taking 4 instead of 2 and calculating the sqrt
  {
    // the maths we need:
    // z[k+1] = z[k]² + c
    // z[0]=0
    //
    // z = x + iy
    // x² + 2*i*x*y - y²
    //
    // Re = X² - y² + Re(c)
    // Im = 2*y*x + Im(c)
    new_z_re = z_re * z_re - z_im * z_im + c_re;
    new_z_im = 2 * z_im * z_re + c_im;
    z_re = new_z_re;
    z_im = new_z_im;
    iteration++;
  }
  if(threshold>iteration) 
  {
    //nicht in der Menge
    ratio = iteration/threshold;
    red = ratio*color1[0] + (1-ratio)*color2[0];
    green = ratio*color1[1] + (1-ratio)*color2[1];
    blue = ratio*color1[2] + (1-ratio)*color2[2];
    putPixel(posX, posY, red, green, blue, 255);
  }
  else
  {
    //in der Menge
    putPixel(posX, posY, 0, 0, 0, 255);
  }
  //console.log(posX+" -- "+posY);
  if( (posX%100==0)&&(posY%100==0)  )
  {
    putPixel(posX, posY, 255, 255, 255, 255);
    ctx.fillStyle = "white";
    ctx.fillText(posX+"-"+posY,posX-50,posY+15);
    ctx.fillText(x.toFixed(1)+"-"+y.toFixed(1),posX-50,posY+25);
    //console.log(posX + " -- " + posY);  
  }
}

function drawScreen() {
  var offsetX = offsetXnormalized*zoom;
  var offsetY = offsetYnormalized*zoom;

  for(var x=0; x<height; x++)
    for(var y=0; y<width; y++)
      mandelbrot(x, y);
    
}
