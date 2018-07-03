//if page is finished loading run the initialisations
document.addEventListener("DOMContentLoaded", function() {
  initCanvas();

  ctx1.font = "10px Arial";
  ctx1.fillStyle = "black";

  putPixel(50, 50, 255, 0, 0, 128);
  
  initZoom();
  console.log(canvasTranslation);
  console.log(canvasDiagonal);
  thr = getFromString(window.location.hash);
  alert(thr);
  drawScreen(thr);

});


function getFromString(urlHash)
{
  if(urlHash=="") return;
  bits = urlHash.split(";");

  x1 = parseFloat(bits[0].split("=")[1]);
  document.getElementById('x1').value = x1;

  y1 = parseFloat(bits[1].split("=")[1]);
  document.getElementById('y1').value = y1;

  canvasTranslation[0]=x1;
  canvasTranslation[1]=y1;

  x2 = parseFloat(bits[2].split("=")[1]);
  document.getElementById('x2').value = x2;
  
  y2 = parseFloat(bits[3].split("=")[1]);
  document.getElementById('y2').value = y2;
  
  canvasDiagonal[0]=parseFloat(bits[2].split("=")[1])-parseFloat(bits[0].split("=")[1]);
  canvasDiagonal[1]=parseFloat(bits[3].split("=")[1])-parseFloat(bits[1].split("=")[1]);
  
  console.log(canvasTranslation);
  console.log(canvasDiagonal);
  
  threshold = parseFloat(bits[4].split("=")[1]);
  
  return threshold;
}

function copyToURL()
{
  newHash= "#x1=" + document.getElementById('x1').value +
           ";y1=" + document.getElementById('y1').value +
           ";x2=" + document.getElementById('x2').value +           
           ";y2=" + document.getElementById('y2').value +
           ";threshold=" + document.getElementById('threshold').value ;
  window.location.hash=newHash;
}

var ctx1;
var ctx2;
var width;
var height;

//initialize the canvas
function initCanvas() {
  canvas1 = document.getElementById('mycanvasL1');
  ctx1 = canvas1.getContext('2d');
  width = canvas1.width;
  height = canvas1.height;
  ctx1.clearRect(0,0,600,600);
  canvas2 = document.getElementById('mycanvasL2');
  ctx2 = canvas2.getContext('2d');
  ctx2.clearRect(0,0,width,height);
//  img = new Image();
//  img.src = "./xyz.svg"; 
//  ctx1.drawImage(img, 10, 10, 590, 590);
  ctx2.lineWidth=5;
  ctx2.strokeRect(10, 10, width-20, height-20);
}

//draw a single pixel
function putPixel(x, y, r, g, b, a)
{
  ctx1.fillStyle = "rgba("+r+", "+g+", "+b+", "+(a/255)+")";
  ctx1.fillRect(x, y, 1, 1);
}
