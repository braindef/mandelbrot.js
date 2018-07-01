//if page is finished loading run the initialisations
function initZoom() 
{
  canvas.addEventListener('mousedown', function(evnt) { getCursorPosition(canvas, evnt, "down"); } );
  canvas.addEventListener('mouseup', function(evnt) { getCursorPosition(canvas, evnt, "up"); } );
}

function getCursorPosition(canvas, event, action) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    
    if(action=="down")
    {
      selection1=[x, y];
      console.log("DOWN: "+selection1);
      console.log("zoom: "+zoom);
      zoom = zoom * 2;
      console.log("zoom: "+zoom);
      
      ZeroX = xOffset;
      ZeroY = yOffset;
      
      console.log("xOffset: "+xOffset+" selecton1[0] - (widthZeroX/2): "+ selection1[0] - (width/2) );
      xOffset = xOffset - selection1[0] + ZeroX;
      yOffset = yOffset - selection1[1] + ZeroY;
      console.log("xOffset: "+xOffset);
      putToHTML();
    }
    if(action=="up")
    {
      selection2=[x, y];
      console.log("UP: "+selection1);

      drawScreen();
    }
}
