//if page is finished loading run the initialisations
function initZoom() 
{
  canvas2.addEventListener('mousedown', function(evnt) { getCursorPosition(canvas2, evnt, "down"); } );
  canvas2.addEventListener('mouseup', function(evnt) { getCursorPosition(canvas2, evnt, "up"); } );
  canvas2.addEventListener('mousemove', function(evnt) { getCursorPosition(canvas2, evnt, "move"); } );
}

var selection=false;
var startpoint = [];
var endpoint = [];

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
      
      startpoint = [x, y];

      selection=true;

    }
    if(action=="move")
    {
      //console.log(getCoordinate([x,y], canvasTranslation, canvasDiagonal, [width, height]));
      ctx2.clearRect(0,0,width,height);

      coordinate = getCoordinate([x, y], canvasTranslation, canvasDiagonal, [width, height]);
    //  console.log(coordinate);
    //console.log( (Math.sign(coordinate[0])==1) && (Math.sign(coordinate[1])==-1));  //Quadrant1
    //console.log( (Math.sign(coordinate[0])==-1) && (Math.sign(coordinate[1])==1));  //Quadrant3
    //console.log( (Math.sign(coordinate[0])==1) && (Math.sign(coordinate[1])==1));  //Quadrant2
    //console.log( (Math.sign(coordinate[0])==-1) && (Math.sign(coordinate[1])==-1));  //Quadrant4
      
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

      document.getElementById('x1').value = positionInCanvas1[0];
      document.getElementById('y1').value = positionInCanvas1[1];
      document.getElementById('x2').value = positionInCanvas2[0];
      document.getElementById('y2').value = positionInCanvas2[1];
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

      console.log(positionInCanvas1);
      console.log(positionInCanvas2);

      //die neue Canvas Diagonale X komponente, sollte immer positiv sein
      newCanvasDiagonal[0]=Math.abs(positionInCanvas2[0]-positionInCanvas1[0]);
      //damit es im richtigen seitenverhältnis bleibt, sollte auch immer positiv sein
      newCanvasDiagonal[1]=Math.abs(newCanvasDiagonal[0]*canvasDiagonal[1]/canvasDiagonal[0]);
      
      console.log(canvasDiagonal);
      console.log(newCanvasDiagonal);
      
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
            
      drawScreen();
    }
}
