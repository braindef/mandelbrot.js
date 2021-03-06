//if page is finished loading run the initialisations
function initZoom() 
{
  canvas2.addEventListener('mousedown', function(evnt) { getCursorPosition(canvas2, evnt, "down"); } );
  canvas2.addEventListener('mouseup', function(evnt) { getCursorPosition(canvas2, evnt, "up"); } );
  canvas2.addEventListener('mousemove', function(evnt) { getCursorPosition(canvas2, evnt, "move"); } );
  
  canvas2.addEventListener('touchend', function(evnt) { getCursorPosition(canvas2, evnt, "touch"); } );

}

var selection=false;
var startpoint = [];
var endpoint = [];
var touchDevice = false;

function getCursorPosition(canvas, event, action) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    if(event.touches!=null)
    {
      var tx = parseInt(event.changedTouches[0].clientX - rect.left);
      var ty = parseInt(event.changedTouches[0].clientY - rect.top);
    }

    if(action=="touch")
    {
      touchDevice = true;

      positionInCanvas=getCoordinate([tx, ty], canvasTranslation, canvasDiagonal, [width, height]);

    	zoomfactor = 2;

      newCanvasTranslation = [0,0];
      newCanvasDiagonal = [0,0];      
      
      newCanvasDiagonal[0] = canvasDiagonal[0] / zoomfactor / 2;
      newCanvasDiagonal[1] = canvasDiagonal[1] / zoomfactor / 2;

      newCanvasTranslation[0] = positionInCanvas[0] - newCanvasDiagonal[0];
      newCanvasTranslation[1] = positionInCanvas[1] - newCanvasDiagonal[1];

			canvasTranslation=newCanvasTranslation;

      canvasDiagonal[0]/=zoomfactor;
      canvasDiagonal[1]/=zoomfactor;
      
      document.getElementById('x1').value = canvasTranslation[0];
      document.getElementById('y1').value = canvasTranslation[1];
      document.getElementById('x2').value = canvasTranslation[0]+canvasDiagonal[0]/zoomfactor/2;
      document.getElementById('y2').value = canvasTranslation[1]+canvasDiagonal[1]/zoomfactor/2;
            
      drawScreen(document.getElementById('threshold').value);
      return;
      
    }

    if (touchDevice) return;

    if(action=="down")
    {
      console.log("down");
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
      
      startpoint = [x, y];

      selection=true;

    }
    if(action=="move")
    {

      ctx2.clearRect(0,0,width,height);

      coordinate = getCoordinate([x, y], canvasTranslation, canvasDiagonal, [width, height]);

      
      if(selection)
      {      
        ctx2.lineWidth=3;
        ctx2.strokeStyle="#FFFF00";
        
        //edge length of the selection square
        edgeX = x - startpoint[0];
        edgeY = y - startpoint[1];
        aspectRatio = canvasDiagonal[1]/canvasDiagonal[0];
        
        //if( Math.sign(startpoint[0]<0) && Math.sign(startpoint[1]<0))
          ctx2.strokeRect(startpoint[0], startpoint[1], edgeX, Math.sign(edgeY) * Math.abs(edgeX*aspectRatio));
      }
      
    }

    if(action=="up")
    {
      endpoint = [x, y];
      selection=false;
      ctx2.clearRect(0,0,width,height);
      
      //calculate all the upper left and lower right point of the selection square, since you can sleect from left-right or right-left or up-down or down-up 
      //notation: var y = (x == 2 ? "yes" : "no");
      x1 = (startpoint[0] > endpoint[0] ? endpoint[0] : startpoint[0]);
      y1 = (startpoint[1] > endpoint[1] ? endpoint[1] : startpoint[1]);
      x2 = (startpoint[0] < endpoint[0] ? endpoint[0] : startpoint[0]); 
      y2 = (startpoint[1] < endpoint[1] ? endpoint[1] : startpoint[1]);
      

      startpoint = [x1, y1];
      endpoint = [x2, y2];

      //die position sollte korrekt sein und hat vorzeichen
      positionInCanvas1=getCoordinate(startpoint, canvasTranslation, canvasDiagonal, [width, height]);
      positionInCanvas2=getCoordinate(endpoint, canvasTranslation, canvasDiagonal, [width, height]);

      newCanvasDiagonal = [];

      //die neue Canvas Diagonale X komponente, sollte immer positiv sein
      newCanvasDiagonal[0]=Math.abs(positionInCanvas2[0]-positionInCanvas1[0]);
      //damit es im richtigen seitenverhältnis bleibt, sollte auch immer positiv sein
      newCanvasDiagonal[1]=Math.abs(newCanvasDiagonal[0]*canvasDiagonal[1]/canvasDiagonal[0]);
      
      newCanvasTranslation=[];
 
      positionInCanvas=getCoordinate(startpoint , canvasTranslation, canvasDiagonal, [width, height]);     

      newCanvasTranslation[0]=positionInCanvas[0];
      newCanvasTranslation[1]=positionInCanvas[1];
      
      canvasTranslation=newCanvasTranslation;
      canvasDiagonal=newCanvasDiagonal;
      
      document.getElementById('x1').value = positionInCanvas1[0];
      document.getElementById('y1').value = positionInCanvas1[1];
      document.getElementById('x2').value = positionInCanvas2[0];
      document.getElementById('y2').value = positionInCanvas2[1];
            
      drawScreen(document.getElementById('threshold').value);
    }
}
