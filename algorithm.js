//if page is finished loading run the initialisations
document.addEventListener("DOMContentLoaded", function() {
  initCanvas();
  putPixel1(50, 50, 255, 0, 0, 128);
  putPixel2(550, 550, 0, 0, 255, 128);
  drawScreen();
});


var ctx;

var width=600;
var height=600;
var threshold = 20;
var color1 = [255, 0, 0];
var color2 = [0, 0, 255];
var scale = 0.5;
var offsetX = 10;
var offsetY = 0;


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
}

function drawScreen() {
  for(var x=0; x<height; x++)
    for(var y=0; y<width; y++)
      mandelbrot(x, y);
    
}
