//source: https://www.developpez.net/forums/d1970440/javascript/general-javascript/canvas-signature-js-pur-poo/
class Canvas{
  constuctor(){
    this.canvas = document.getElementById("canvas").getContext("2d");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 3;
    this.draw = false;
    this.mousePosition = { x:0, y:0 };
    this.lastPosition = this.mousePosition;
    this.clearButton = document.getElementById("effacercanvas");
  }

  eventListener(){
    //Souris
    self = this;
    this.canvas.addEventListener("mousedown", function(e){
      self.draw = true;
      self.lastPosition = this.mousePosition(e);
    })

    this.canvas.addEventListener("mousemove", function (e){
      self.mousePosition = self.getMposition(e);
      self.canvasResult();
    })
    this.canvas.addEventListener("mouseup", function(e){
      self.draw = false;
    })
  }
}









/*class Canvas{
    constructor() { //Constructeur de l'objet canvas
    //source pour le canvas : http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/#demo-simple
    this.canvas = document.getElementById('canvas').getContext('2d'); //On cible l'élément canvas et on défini le context
    this.clickX = new Array();
    this.clickY = new Array();
    this.clickDrag = new Array();
    this.paint = true;
    this.draw();
    this.clear();
    
    
    }

    draw(){ //méthode draw pour le dessin
        that =this;
        let context = this.canvas;
        $('#canvas').mousedown(function(e){
            let mouseX = e.pageX - this.offsetLeft;
            let mouseY = e.pageY - this.offsetTop;
                  
            //paint = true;
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            redraw();
          });
          $('#canvas').mousemove(function(e){
            if(this.paint){
              addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
              redraw();
            }
          });

          $('#canvas').mouseup(function(e){ // si bouton souris relaché on arrête de paint
            this.paint = false;
          });

          $('#canvas').mouseleave(function(e){ // Si souris sort du cadre on arrête de paint
            this.paint = false;
          });

          
          function addClick(x, y, dragging)
          {
            that.clickX.push(x);
            that.clickY.push(y);
            that.clickDrag.push(dragging);
          }
          function redraw(){
            context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
            
            context.strokeStyle = "#df4b26"; //Couleur du trait
            context.lineJoin = "round";
            context.lineWidth = 10; //largeur du trait
                      
            for(let i=0; i < clickX.length; i++) {		
              context.beginPath();
              if(clickDrag[i] && i){
                context.moveTo(clickX[i-1], clickY[i-1]);
               }else{
                 context.moveTo(clickX[i]-1, clickY[i]);
               }
               context.lineTo(clickX[i], clickY[i]);
               context.closePath();
               context.stroke();
            }
          }
        };
   
        /*$('#effacercanvas').mousedown(function(e)
	{
		clickX_simple = new Array();
		clickY_simple = new Array();
		clickDrag_simple = new Array();
		clearCanvas_simple(); 
	});
      }
      clear(clickX, clickY, ){
        
        let ctx = this.canvas;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      }
}*/
