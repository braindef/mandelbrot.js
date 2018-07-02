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
      /*
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
      */
      console.log("canvasDiagonal"+canvasDiagonal);
      
      startpoint = [x, y];
      selection=true;

    }
    if(action=="move")
    {
      console.log("MOUSEMOVE");
      ctx2.clearRect(0,0,width,height);
      
      if(selection)
      {      
        ctx2.lineWidth=3;
        ctx2.strokeStyle="#FF0000";
        ctx2.strokeRect(startpoint[0],startpoint[1],x-startpoint[0],y-startpoint[1]);
      }
    }

    if(action=="up")
    {
      selection=false;
      ctx2.clearRect(0,0,width,height);
      
      //drawScreen();
    }
}
