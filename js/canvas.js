//source: https://www.developpez.net/forums/d1970440/javascript/general-javascript/canvas-signature-js-pur-poo/
class Canvas{
  constructor(){
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 3;
    this.draw = false;
    this.mousePosition = { 
      x: 0,
      y: 0 
    };
    this.lastPosition = this.mousePosition;
    this.eventListener();
  }

  eventListener(){
    //Souris
    let self= this;
    this.canvas.addEventListener("mousedown", function(e){
      self.draw = true;
      self.lastPosition = self.getMposition(e);
    });

    this.canvas.addEventListener("mousemove",  function(e){
      self.mousePosition = self.getMposition(e);
      self.canvasResult();
    });
    
    //quand le clic de la souris est relevé on ne "dessine plus" n'importe où sur le document
    document.addEventListener("mouseup", function (e){
      self.draw = false;
    });

    //pour le tactile
    this.canvas.addEventListener("touchstart", function (e) {
      self.mousePosition = self.getTposition(e);
       var touch = e.touches[0];
       var mouseEvent = new MouseEvent("mousedown", {
           clientX: touch.clientX,
           clientY: touch.clientY
       });
       self.canvas.dispatchEvent(mouseEvent);
   });

   this.canvas.addEventListener("touchmove", function (e) {
       var touch = e.touches[0];
       var mouseEvent = new MouseEvent("mousemove", {
           clientX: touch.clientX,
           clientY: touch.clientY
       });
       self.canvas.dispatchEvent(mouseEvent);
   });

   this.canvas.addEventListener("touchend", function (e) {
       var mouseEvent = new MouseEvent("mouseup", {});
       self.canvas.dispatchEvent(mouseEvent);
   });




 //Effacer    
    document.getElementById("effacercanvas").addEventListener("click", function(e){
    self.clearCanvas()
    });
  } // Fin eventListener()

  //renvoi les coordonnées de la souris
  getMposition(mouseEvent){
    if(this.draw){
      let oRect = document.getElementById("canvas").getBoundingClientRect();
      return{
        x: mouseEvent.clientX - oRect.left,
        y: mouseEvent.clientY - oRect.top
      };
    }
  } //fin getMposition

  // Renvoie les coordonnées du pad 
  getTposition(touchEvent) {
    var oRect = this.canvas.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - oRect.left,
        y: touchEvent.touches[0].clientY - oRect.top
    };
}

  // Dessin du canvas
  canvasResult(){
    if (this.draw) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
      this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
      this.ctx.stroke();
      this.lastPosition = this.mousePosition;
      }
    } // fin canvasResult()
  // Vide le dessin du canvas
  clearCanvas(){
      this.canvas.width = this.canvas.width;
      this.ctx.lineWidth = 3;
  }
  
}



   new Canvas();