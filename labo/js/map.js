    let map = L.map('map').setView([48.69, 6.18], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


/*----------------------------------
 Initialisation de l'api
----------------------------------*/

    let jcdecauxApi = 'https://api.jcdecaux.com/vls/v1/stations?contract=nancy&apiKey=87166a79118dbedb3a843f9471b4c86be316f142';
    ajaxGet(jcdecauxApi, function (reponse){
      let contrats = JSON.parse(reponse);
      //Affichage de chaque markers
      console.log(contrats);
      
      for(let valeur of contrats) {
        let coordsLat = valeur.position.lat; //récupère les positions latitude
        let coordsLong = valeur.position.lng; // récupère les positions longitude
        console.log(coordsLong);
        console.log(coordsLat);
        var marker = L.marker([coordsLat, coordsLong]).addTo(map);
        marker;
        
      }
    });
      
      
        
 
/*--------------------------------
Initilisation des markers
--------------------------------*/
  

/*
//test api
ajaxGet('https://api.jcdecaux.com/vls/v1/stations?contract=nancy&apiKey=87166a79118dbedb3a843f9471b4c86be316f142', function (reponse){
  let resultat = JSON.parse(reponse);
  for(i = 0 ; i < resultat.length; i++){
    console.log(resultat[i].name);
    console.log('voici l\'adresse des stations ' + resultat[i].address);
  }
});*/
