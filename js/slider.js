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
  let slideImages_1 = ['1','2','3','4'];
  let mySlider = new slider('diap1', slideImages_1, 'img/', 5000);
  
  //Activation des fonctions au clic//
  //Activate function to click//
  $('#next').on('click', function(){
    mySlider.next();
  });
  
  $('#prev').on('click', function(){
    mySlider.prev();
  });
  $(document).keydown(function (e) {
    if (e.keyCode === 37){
      mySlider.prev();
    }
    else if (e.keyCode === 39){
      mySlider.next();
    }
  });


/*$(document).ready(function(){ //charge le script quand la page est chargée
    class Slider{
    constructor(){
        this.imageSlider = document.querySelector('#slider').querySelector('#imgSlider'); // On initialise une propriété de l'objet Slider 
        this.flecheGauche = document.querySelector('#flecheGauche');
        this.flecheDroite = document.querySelector('#flecheDroite');
        this.index = 0; // Initialisé a 0
        this.image = [ 
            1, 2, 3, 4 //ajouter des numéros en fonction du nombre d'images dans le dossier img (leur donner le nom 1.png, 2.png etc...)
        ];
        this.listener(); // propriété d'écoute
    }
    suivant(){
        this.index++;
        if(this.index > this.image.length ){
            this.index =1; 
        }
        this.imageSlider.setAttribute('src',`img/${this.index}.png`);
        };
    
    precedent(){
        this.index--;
        if(this.index < 1){
            this.index = this.image.length ;
        }
        this.imageSlider.setAttribute('src',`img/${this.index}.png`);
        };
    
    clavier(e) {
        const code = e.keyCode;
        switch(code){
            case 39:
                this.suivant();
                break;
            case 37:
                this.precedent();
                break;
        }
    }
    
    listener(){
        flecheDroite.addEventListener('click', () => {
            this.suivant()});
        flecheGauche.addEventListener('click', () =>{
            this.precedent();
        })
        document.addEventListener('keydown', (e) =>{
            this.clavier(e);
        })
    }
    };
 
new Slider();


});*/