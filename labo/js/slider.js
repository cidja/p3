$(document).ready(function(){ //charge le script quand la page est chargée
    class Slider{
    constructor(){
        this.imageSlider = document.querySelector('#slider').querySelector('#imgSlider'); // On initialise une propriété de l'objet Slider 
        this.flecheGauche = document.querySelector('#flecheGauche');
        this.flecheDroite = document.querySelector('#flecheDroite');
        this.index = 0; // Initialisé a 0
        this.image = [ // tableau avec les liens des différentes diapo qui seront remplacés dans le set attributes des méthodes suivant() et precedent()
            'img/1.png',
            'img/2.png',
            'img/3.png',
            'img/4.png',
        ];
        this.listener(); // propriété d'écoute
    }
    suivant(){
        this.index++;
        if(this.index > this.image.length -1){
            this.index =0; 
        }
        this.imageSlider.setAttribute('src',this.image[this.index]);
        };
    
    precedent(){
        this.index--;
        if(this.index < 0){
            this.index = this.image.length -1;
        }
        this.imageSlider.setAttribute('src',this.image[this.index]);
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


});