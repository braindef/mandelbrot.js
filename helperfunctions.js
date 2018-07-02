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
  drawScreen()
});


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
  ctx2.clearRect(0,0,600,600);
//  img = new Image();
//  img.src = "./xyz.svg"; 
//  ctx1.drawImage(img, 10, 10, 590, 590);
  ctx2.lineWidth=5;
  ctx2.strokeRect(10, 10, 590, 590);
}

//draw a single pixel
function putPixel(x, y, r, g, b, a)
{
  ctx1.fillStyle = "rgba("+r+", "+g+", "+b+", "+(a/255)+")";
  ctx1.fillRect(x, y, 1, 1);
}
