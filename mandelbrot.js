//mandelbrot

var threshold = 20;
var color1 = [255, 0, 0];
var color2 = [0, 0, 255];

function mandelbrot(coordinate, offset, threshold, pixel)
{
  x = coordinate[0] - offset[0];
  y = coordinate[1] - offset[1];
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
    red = parseInt(ratio*color1[0] + (1-ratio)*color2[0]);
    green = parseInt(ratio*color1[1] + (1-ratio)*color2[1]);
    blue = parseInt(ratio*color1[2] + (1-ratio)*color2[2]);
    putPixel(pixel[0], pixel[1], red, green, blue, 255);
    //console.log(pixel[0]+" "+pixel[1]+" "+red+" "+green+" "+blue+" "+255);
  }
  else
  {
    //in der Menge
    putPixel(pixel[0], pixel[1], 0, 0, 0, 255);
    
  }

}

