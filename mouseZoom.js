//if page is finished loading run the initialisations
function initZoom() 
{
  canvas2.addEventListener('mousedown', function(evnt) { getCursorPosition(canvas2, evnt, "down"); } );
  canvas2.addEventListener('mouseup', function(evnt) { getCursorPosition(canvas2, evnt, "up"); } );
  canvas2.addEventListener('mousemove', function(evnt) { getCursorPosition(canvas2, evnt, "move"); } );
}

var selection=false;
var startpoint = [];

function getCursorPosition(canvas, event, action) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    
    if(action=="down")
    {
      debugdisplay=getCoordinate([x, y], canvasTranslation, canvasDiagonal, [width, height]);
      //TODO: könnte man im Gui anzeigen

/*    //click to zoom function
    	zoomfactor = 3;

      newCanvasTranslation = [0,0];

      newCanvasTranslation[0]=newCanvasTranslation[0]+positionInCanvas[0]-canvasDiagonal[0]/zoomfactor/2;
      newCanvasTranslation[1]=newCanvasTranslation[1]+positionInCanvas[1]-canvasDiagonal[1]/zoomfactor/2;
			canvasTranslation=newCanvasTranslation;

      canvasDiagonal[0]/=zoomfactor;
      canvasDiagonal[1]/=zoomfactor;
*/
      
      endpoint = [x, y];

      selection=true;

    }
    if(action=="move")
    {
      console.log(getCoordinate([x,y], canvasTranslation, canvasDiagonal, [width, height]));
      ctx2.clearRect(0,0,width,height);
      
      if(selection)
      {      
        ctx2.lineWidth=3;
        ctx2.strokeStyle="#FFFF00";
        ctx2.strokeRect(endpoint[0],endpoint[1],x-endpoint[0],x*canvasDiagonal[1]/canvasDiagonal[0]-endpoint[1]);
      }
    }

    if(action=="up")
    {
      selection=false;
      ctx2.clearRect(0,0,width,height);

      startpoint = [x, y];

      //die position sollte korrekt sein und hat vorzeichen
      positionInCanvas1=getCoordinate(endpoint, canvasTranslation, canvasDiagonal, [width, height]);
      positionInCanvas2=getCoordinate(startpoint, canvasTranslation, canvasDiagonal, [width, height]);

      newCanvasDiagonal = [];

      console.log(positionInCanvas1);
      console.log(positionInCanvas2);

      //die neue Canvas Diagonale X komponente
      newCanvasDiagonal[0]=Math.abs(positionInCanvas2[0]-positionInCanvas1[0]);
      //damit es im richtigen seitenverhältnis bleibt
      newCanvasDiagonal[1]=Math.abs(newCanvasDiagonal[0]*canvasDiagonal[1]/canvasDiagonal[0]);
      
      console.log(canvasDiagonal);
      console.log(newCanvasDiagonal);
      
      newCanvasTranslation=[];
 
      positionInCanvas=getCoordinate(endpoint , canvasTranslation, canvasDiagonal, [width, height]);     

      newCanvasTranslation[0]=positionInCanvas[0];
      newCanvasTranslation[1]=positionInCanvas[1];
      
      canvasTranslation=newCanvasTranslation;
      canvasDiagonal=newCanvasDiagonal;
      
      drawScreen();
    }
}
