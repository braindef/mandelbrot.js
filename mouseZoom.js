//if page is finished loading run the initialisations
function initZoom() 
{
  canvas.addEventListener('mousedown', function(evnt) { getCursorPosition(canvas, evnt, "down"); } );
  canvas.addEventListener('mouseup', function(evnt) { getCursorPosition(canvas, evnt, "up"); } );
}

ZOOOM   = [ 100, 300, 900, 2700, 8100 ];
SELECTX = [ 307, 308, 324,  368,  502 ];
ZERO    = [ 300, 293, 278,  232,   96 ];
XOFF    = [ 293, 278, 232,   96, -310 ];


i=0;

function getCursorPosition(canvas, event, action) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    
    if(action=="down")
    {
      selection1=[x, y];
      //console.log("DOWN: "+selection1);
      console.log("zoom: "+zoom);
      console.log("selection1[0]: "+selection1[0]);

      zoomfactor = 2;
      
      zoom = zoom * zoomfactor;
      
      xOffset = 2*xOffset - selection1[0];
      yOffset = 2*yOffset - selection1[1];
      
      console.log("xOffset: "+xOffset);

      putToHTML();
    }
    if(action=="up")
    {
      selection2=[x, y];
      //console.log("UP: "+selection1);

      drawScreen();
    }
}
