//if page is finished loading run the initialisations
document.addEventListener("DOMContentLoaded", function() {
  initCanvas();

  ctx.font = "10px Arial";
  ctx.fillStyle = "black";

  putPixel1(50, 50, 255, 0, 0, 128);
  putPixel2(550, 550, 0, 0, 255, 128);
  drawScreen();
  
  canvas.addEventListener('mousedown', function(evnt) {
                                                    getCursorPosition(canvas, evnt, "down"); } );
                                                      
  canvas.addEventListener('mouseup', function(evnt) {
                                                    getCursorPosition(canvas, evnt, "up"); } );
                                                    
});


var ctx;

var width=600;
var height=600;
var threshold = 20;
var color1 = [255, 0, 0];
var color2 = [0, 0, 255];
var scale = 2;
var offsetX = 0;
var offsetY = 0;
var selection1 = [];
var selection2 = [];

function update() {
  scale = document.getElementById("scale").value;
  offsetX = document.getElementById("offsetX").value;
  offsetY = document.getElementById("offsetY").value;
}

function read() {
  document.getElementById("scale").value = scale;
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

      scale=( (selection2[0] - selection1[0]) / width )*scale;
      //offsetX=-(height/2)+(selection2[0]-selection1[0]);
      //offsetY = -height/2 + selection2[1]*scale;   //y < 200 geht nach oben    y > 200 geht nach unten
      console.log("Scale: "+scale + " offsetX: " + offsetX + " offsetY: " + offsetY);
      
      //maybe https://stackoverflow.com/questions/6775168/zooming-with-canvas
      read();
      drawScreen();
    }
    

    
}

function putPixel1(x, y, r, g, b, a)
{
  id = ctx.createImageData(1,1);
  d = id.data;
  d[0] = r;
  d[1] = g;
  d[2] = b;
  d[3] = a;
  ctx.putImageData(id, x, y);
}

function putPixel2(x, y, r, g, b, a)
{
  ctx.fillStyle = "rgba("+r+", "+g+", "+b+", "+(a/255)+")";
  ctx.fillRect(x, y, 1, 1);
}


function mandelbrot(posX, posY)
{
  var c_re = (posX*scale+offsetX -(height/2)) * 4.0/height;
  var c_im = (posY*scale+offsetY  -(width/2)) * 4.0/width;
  
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
    putPixel2(posX, posY, red, green, blue, 255);
  }
  else
  {
    //in der Menge
    putPixel2(posX, posY, 0, 0, 0, 255);
  }
  //console.log(posX+" -- "+posY);
  if( (posX%100==0)&&(posY%100==0)  )
  {
    ctx.fillStyle = "black";
    ctx.fillText(posX+"-"+posY,posX-50,posY);
    ctx.fillText(parseInt(posX/scale-offsetX/scale)+"-"+parseInt(posY/scale-offsetX/scale),posX-50,posY+15);
    //console.log(posX + " -- " + posY);  
  }
}

function drawScreen() {
  for(var x=0; x<height; x++)
    for(var y=0; y<width; y++)
      mandelbrot(x, y);
    
}
