//Création de l'objet slider et de ses caractéristiques//
//Creating the slider object and its characteristics//
class slider {
    constructor(cible, tableau, repertoire, duree) {
      this.cible = document.getElementById(cible);
      this.tableau = tableau;
      this.temp = duree;
      this.repertoir_images = repertoire;
      this.tbimage = -1;
      this.timeout = null;
      this.launchSlider();
    }
  
  //Fonction d'animation du slider//
  // Slider animation function//
    launchSlider() {
      this.tbimage++;
      this.cible.src = this.repertoir_images + this.tableau[this.tbimage] + '.png';
      if (this.tbimage === this.tableau.length - 1) {
        this.tbimage = -1;
      }
      let that = this;
      this.timeout = setTimeout(function () {
          that.launchSlider()
        },
        this.temp,
      );
    }
    
    pause() { //pour mettre en pause le diapo
      clearTimeout(this.timeout); 
      this.temp = null;
    }

  //Fonction Next et Prev//
  //Next and Prev function//
    next() {
      this.tbimage++;
      if (this.tbimage > (this.tableau.length - 1)) {
        this.tbimage = 0;
      }
      this.cible.src = this.repertoir_images + this.tableau[this.tbimage] + '.png';
      clearTimeout(this.timeout);
      this.temp = null;
    }
  
    prev(){
      this.tbimage--;
      if (this.tbimage < 0) {
        this.tbimage = this.tableau.length - 1;
      }
      this.cible.src = this.repertoir_images + this.tableau[this.tbimage] + '.png';
      clearTimeout(this.timeout);
      this.temp = null;
    }
  }
  
  //Initialisation du slider en créant le tableau d'image 1//
  //Initializing the slider by creating the picture array 1//
  let slideImages_1 = ['1','2','3'];
  let mySlider = new slider('diap1', slideImages_1, 'img/', 5000);
  
  //Activation des fonctions au clic//
  //Activate function to click//
  $('#next').on('click', function(){
    mySlider.next();
  });
  
  $('#prev').on('click', function(){
    mySlider.prev();
  });
  $("#pause").on("click", function(){
    mySlider.pause();
  });
  $("#play").on("click", function(){
    mySlider.launchSlider();
    console.log("on rentre");
  })
  $(document).keydown(function (e) {
    if (e.keyCode === 37){
      mySlider.prev();
    }
    else if (e.keyCode === 39){
      mySlider.next();
    }
  });

