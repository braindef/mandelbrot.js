//if page is finished loading run the initialisations
document.addEventListener("DOMContentLoaded", function() {
  initCanvas();
  initZoom();

  ctx.font = "10px Arial";
  ctx.fillStyle = "black";

  putPixel(50, 50, 255, 0, 0, 128);

  drawScreen();
});

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


function putPixel(x, y, r, g, b, a)
{
  ctx.fillStyle = "rgba("+r+", "+g+", "+b+", "+(a/255)+")";
  ctx.fillRect(x, y, 1, 1);
}

var width=600;
var height=600;
var xOffset=0;
var yOffset=0;
var zeroX=xOffset;
var zeroY=xOffset;
var zoom=1;

function circle(posX, posY)
{
  X=(posX-xOffset)/zoom;
  Y=(posY-yOffset)/zoom;
  diameter = 100;
  squareDiameter = diameter*diameter;
  if(parseInt(X*X+Y*Y)<squareDiameter)
  {
    putPixel(posX, posY, 155, 0, 0, 255);
    //console.log(x+"-"+y);
  }
}

var threshold = 20;
var color1 = [255, 0, 0];
var color2 = [0, 0, 255];

function mandelbrot(posX, posY)
{
  x = (posX - offsetX)/zoom;
  y = (posY - offsetY)/zoom;
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
    console.log("Black");
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

  for(var x=0; x<width; x++)
    for(var y=0; y<height; y++)
    {
      //circle(x, y);
      mandelbrot(x, y);
    }
    
}
