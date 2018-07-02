
// the circle gets coordinates not pixels
function circle(coordinate, offset, radius)
{
  //putPixel(100, 100, 255, 255, 255, 255);
  //console.log("circle()");
  if( Math.pow(coordinate[0]-offset[0],2) +
      Math.pow(coordinate[1]-offset[1],2) < Math.pow(radius,2) )
    {
      //console.log("circle==true");
      return true;
    }
}



