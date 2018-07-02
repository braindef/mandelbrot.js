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
      canvasDiagonal[0]/=2;
      canvasDiagonal[1]/=2;
    }
    if(action=="up")
    {

      drawScreen();
    }
}
