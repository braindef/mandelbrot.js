
var canvasTranslation = [-6, -4];
var canvasDiagonal = [12.0, 8.0];

function drawScreen(threshold)
{
  ctx1.clearRect(0,0,width,height);

  for(var i=0; i<width; i++)
    for(var j=0; j<height; j++)
      //drawing a circle for debugging the zoom window functionality that is more complicate than i thought
      //if ( circle( getCoordinate([i, j], canvasTranslation, canvasDiagonal, [width, height] ) , [0, 0], 1.0) ) putPixel(i, j, 255, 0, 0, 255);
      
      mandelbrot( getCoordinate([i, j], canvasTranslation, canvasDiagonal, [width, height] ) , [0, 0], threshold, [i, j]);

}
