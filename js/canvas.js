$(document).ready(function(){
class Canvas{
    constructor() { //Constructeur de l'objet canvas
    //source pour le canvas : http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/#demo-simple
    this.canvas = document.getElementById('canvas').getContext('2d'); //On cible l'élément canvas et on défini le context
    this.draw();
    
    
    }

    draw(){ //méthode draw pour le dessin
        
        let context = this.canvas;
        $('#canvas').mousedown(function(e){
            let mouseX = e.pageX - this.offsetLeft;
            let mouseY = e.pageY - this.offsetTop;
                  
            paint = true;
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            redraw();
          });
          $('#canvas').mousemove(function(e){
            if(paint){
              addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
              redraw();
            }
          });

          $('#canvas').mouseup(function(e){ // si bouton souris relaché on arrête de paint
            paint = false;
          });

          $('#canvas').mouseleave(function(e){ // Si souris sort du cadre on arrête de paint
            paint = false;
          });

          let clickX = new Array();
          let clickY = new Array();
          let clickDrag = new Array();
          let paint;
          
          function addClick(x, y, dragging)
          {
            clickX.push(x);
            clickY.push(y);
            clickDrag.push(dragging);
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
}
new Canvas;
}); //Fin de la function ready