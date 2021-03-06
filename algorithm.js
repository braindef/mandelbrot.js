//if page is finished loading run the initialisations
document.addEventListener("DOMContentLoaded", function() {
  initCanvas();

  ctx1.font = "10px Arial";
  ctx1.fillStyle = "black";

  putPixel(50, 50, 255, 0, 0, 128);


  
  canvas2.addEventListener('mousedown', function(evnt) {
                                                    getCursorPosition(canvas2, evnt, "down"); } );
                                                      
  canvas2.addEventListener('mouseup', function(evnt) {
                                                    getCursorPosition(canvas2, evnt, "up"); } );
                                                    
  putToHTML();
  drawScreen()
});


var ctx1;
var ctx2;


var width=600;
var height=600;
var xOffset=300;
var yOffset=300;
var zoom = 100;

var threshold = 100;
var color1 = [255, 0, 0];
var color2 = [0, 0, 255];


var selection1 = [];
var selection2 = [];

function update() {
  zoom = parseFloat(document.getElementById("zoom").value);
  xOffset = parseInt(document.getElementById("offsetX").value);
  yOffset = parseInt(document.getElementById("offsetY").value);
}

function putToHTML() {
  document.getElementById("zoom").value = zoom;
  document.getElementById("offsetX").value = xOffset;
  document.getElementById("offsetY").value = yOffset;
}


//initialize the canvas
function initCanvas() {
  canvas1 = document.getElementById('mycanvasL1');
  ctx1 = canvas1.getContext('2d');
  ctx1.clearRect(0,0,600,600);
  canvas2 = document.getElementById('mycanvasL2');
  ctx2 = canvas2.getContext('2d');
  ctx2.clearRect(0,0,600,600);
//  img = new Image();
//  img.src = "./sudoku-leer.svg"; 
//  ctx1.drawImage(img, 10, 10, 580, 580);
  ctx2.lineWidth=5;
  ctx2.strokeRect(10, 10, 580, 580);
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
      
      deltaOffset = weight;
      console.log("deltaOffset: "+deltaOffset);
      
      //if( (width/2) > ( (selection1[0]+selection2[0]) /2 ) )
        offsetX+=deltaOffset;
      //else
        //offsetX-=deltaOffset;

      putToHTML();
      drawScreen();
    }
}


function putPixel(x, y, r, g, b, a)
{
  ctx1.fillStyle = "rgba("+r+", "+g+", "+b+", "+(a/255)+")";
  ctx1.fillRect(x, y, 1, 1);
}


function mandelbrot(posX, posY)
{
  x = posX/zoom - xOffset/zoom;
  y = posY/zoom - yOffset/zoom;
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
 
  }
}

function circle(posX, posY)
{
  X=(posX-xOffset)/zoom;
  Y=(posY-yOffset)/zoom;
  diameter = 0.05;
  squareDiameter = diameter*diameter;
  if(X*X+Y*Y<squareDiameter)
  {
    putPixel(posX, posY, 155, 0, 0, 255);
    //console.log(x+"-"+y);
  }
}


function drawScreen() {
  ctx1.clearRect(0,0,600,600);

  for(var x=0; x<height; x++)
    for(var y=0; y<width; y++)
    {
      //mandelbrot(x, y);
      circle(x, y);
    }
    
}
