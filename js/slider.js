$(document).ready(function(){ //charge le script quand la page est chargée
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


});