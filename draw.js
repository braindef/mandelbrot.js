
var canvasTranslation = [0, 0];
var canvasDiagonal = [5.0, 5.0];

function drawScreen()
{
  ctx1.clearRect(0,0,width,height);
  //putPixel(20, 20, 0, 0, 0, 255);
  for(var i=0; i<width; i++)
    for(var j=0; j<height; j++)
      /*if ( circle( getCoordinate([i, j], canvasTranslation, canvasDiagonal, [width, height] ) , [2.5, 2.5], 1.0) )
      {
        //console.log("In circle");
        putPixel(i, j, 255, 0, 0, 255);
      }*/
      if ( mandelbrot( getCoordinate([i, j], canvasTranslation, canvasDiagonal, [width, height] ) , [0, 0], [i, j]) )
        putPixel(i, j, 0, 255, 0, 255);
}
