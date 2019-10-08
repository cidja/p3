$(document).ready(function(){
  var slider = $('.slider');
  var sliderContent = slider.children('.sliderContent');

  //Changement du slide au click sur le slider
  slider.on('click', function (e){
    slide();
 });

  //Fonction pour changer de slider
  function slide() {
    //on récupère le slide actuellement affiché
    var currentSlide = sliderContent.children('.slide.active');
    if (!currentSlide.length){
      // Si aucun slide n'a de classe active, on prend le premier par défaut
      currentSlide = currentSlide.children('.slide:first');
    }
    //On définit le nouveau slide à afficher
    var newSlide = sliderContent.next();

    //On anime le slide pour afficher le nouveau 
    sliderContent.animate({
      left : newSlide.position().left
    }, 250, function(){
      currentSlide.removeClass('active'); // On retire la classe active à l'ancien slide
      newSlide.addClass('active'); // On ajoute la classe active au nouveau slide
    });
  }
});

