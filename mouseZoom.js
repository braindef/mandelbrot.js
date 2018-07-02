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
      console.log(canvasTranslation);
      positionInCanvas=getCoordinate([x, y], canvasTranslation, canvasDiagonal, [width, height]);
      
      console.log(positionInCanvas);

    	zoomfactor = 3;

      newCanvasTranslation = [0,0];

      newCanvasTranslation[0]=newCanvasTranslation[0]+positionInCanvas[0]-canvasDiagonal[0]/zoomfactor/2;
      newCanvasTranslation[1]=newCanvasTranslation[1]+positionInCanvas[1]-canvasDiagonal[1]/zoomfactor/2;

			canvasTranslation=newCanvasTranslation;

      console.log("canvasTranslation"+canvasTranslation);

      canvasDiagonal[0]/=zoomfactor;
      canvasDiagonal[1]/=zoomfactor;
      
      console.log("canvasDiagonal"+canvasDiagonal);
      

    }
    if(action=="up")
    {

      drawScreen();
    }
}
