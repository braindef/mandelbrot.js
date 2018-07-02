//basics
function getCoordinate(pixel, canvasOffset, canvasDiagonal, canvasResolution)
{
  //console.log("Pixel: "+pixel+ " canvasOffset: "+canvasOffset+" canvasDiagonal: "+canvasDiagonal+" canvasResolution " + canvasResolution);
  coordinate = [0.0, 0.0];
  coordinate[0] = 0 + canvasOffset[0] + pixel[0]*(canvasDiagonal[0] / canvasResolution[0]);
  coordinate[1] = 0 + canvasOffset[1] + pixel[1]*(canvasDiagonal[1] / canvasResolution[1]);
  //console.log(coordinate);
  return coordinate;
}
