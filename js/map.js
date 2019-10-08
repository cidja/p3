$(document).ready(function(){ //charge le script quand la page est chargée
  class Map{
  constructor() {
    this.map;
    this.initMap();
    this.loadMarkers(this.map);
    this.initRerservationListener();
    this.canvas = new Canvas();
    this.timer = new Timer();
    this.timer.restartExistingTimer();
    this.stockInfosNomPrenom();
  }
 
/*------------------------------
          Initialisaton de la map
------------------------------*/
//Source: https://nouvelle-techno.fr/actualites/2018/05/11/pas-a-pas-inserer-une-carte-openstreetmap-sur-votre-site 
//Source : https://leafletjs.com/
  initMap(){ 
    this.map = L.map('map').setView([48.69, 6.18], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    
  } //fin initMap

/*----------------------------------
 Initialisation de l'api
----------------------------------*/
  loadMarkers(map) {
    let jcdecauxApi = 'https://api.jcdecaux.com/vls/v1/stations?contract=nancy&apiKey=87166a79118dbedb3a843f9471b4c86be316f142';
    ajaxGet(jcdecauxApi, function (reponse){
      let contrats = JSON.parse(reponse);
      //Affichage de chaque markers
      console.log(contrats);

      //Création des icones de couleur 
      let LeafIcon = L.Icon.extend({
        options: {
          iconSize: [40, 50],
        iconAnchor: [0, 50],
        popupAnchor: [21, -45]
        }
      })

      
      const greenIcon = new LeafIcon({iconUrl: 'img/veloVert.png'}) 

      const orangeIcon = new LeafIcon({iconUrl : 'img/veloOrange.png'});

      const orangeIconBarree = new LeafIcon({iconUrl : 'img/veloOrangeBarree.png'})
      
      const redIcon = new LeafIcon({iconUrl : '/img/veloRouge.png'});
           
      for(let stations of contrats) {
        //initialisation de toutes les variables que je récupère du tableau api (stations)
        let coordsLat = stations.position.lat; //récupère les positions latitude
        let coordsLong = stations.position.lng; // récupère les positions longitude
        let name = stations.name;
        let nameConvert = name.substr(8); // suppression du numéro des stations avant pour la mise en page
        let addresse = stations.address;
        let nbPlaces = stations.bike_stands;
        let nbPlacesDispo = stations.available_bike_stands;
        let velosDisponible = stations.available_bikes;
        let status = stations.status;
        let lastUpdate = stations.last_update;

       //Condition pour afficher les fleches de couleur en fonction des résultats
          if(status === "OPEN"){ //Si status station open 
            if(velosDisponible > 3){ //Si nombre de vélos disponible > 3 on affiche icon verte 
              let marker = L.marker([coordsLat, coordsLong], {icon : greenIcon}).addTo(map);
              marker.bindPopup(`Station -> ${nameConvert} <br> adresse -> ${addresse} <br> Nombre de places -> ${nbPlaces} <br> Vélos disponible -> <strong>${velosDisponible}</strong>`);
              marker.on('click', function(){
              document.getElementById('conteneurstation').style.display = 'flex';
              $("#nomstation").html("Pour réserver un vélo à la station : " + nameConvert); //affiche le nom de la station dans la balise span avec l'id reponseNomStation
                /*$('#reponseAdresse').html(addresse); // etc...
                $('#reponseNbrePlaces').html(nbPlaces); // etc...
                $("#reponseVelosDisponible").html(velosDisponible); //etc..*/
              });

            } 
            else if((velosDisponible <= 3) & (velosDisponible > 0)) { //Sinon on affiche icon orange 
              let marker = L.marker([coordsLat, coordsLong], {icon : orangeIcon}).addTo(map);
              marker.bindPopup(`Station -> ${nameConvert} <br> adresse -> ${addresse} <br> Nombre de places -> ${nbPlaces} <br> Vélos disponible -> <strong>${velosDisponible}</strong>`);
              marker.on('click', function(){
                document.getElementById('conteneurstation').style.display = 'flex';
                $("#reponseNomStation").html(nameConvert);
                $('#reponseAdresse').html(addresse);
                $('#reponseNbrePlaces').html(nbPlaces);
                $("#reponseVelosDisponible").html(velosDisponible);
              });
            }
            else if(velosDisponible = 0) { //Si aucun vélo disponible affiche image orange barrée
              let marker = L.marker([coordsLat, coordsLong], {icon : orangeIconBarree}).addTo(map);
              marker.bindPopup(`Station -> ${nameConvert} <br> adresse -> ${addresse} <br> Nombre de places -> ${nbPlaces} <br> Vélos disponible -> <strong>${velosDisponible}</strong>`);
            }
          } 
          else { //Sinon affiche redIcon
            document.getElementById('conteneurstation').style.display = 'flex';
            let marker = L.marker([coordsLat, coordsLong], {icon : redIcon}).addTo(map);
            marker.on('click', function(){
              $("#reponseNomStation").html(nameConvert);
              $('#reponseAdresse').html(addresse);
              $('#reponseNbrePlaces').html(nbPlaces);
              $("#reponseVelosDisponible").html(velosDisponible);
            });
          } 
        } //fin de for
    });
  } //fin loadMarkers

  //utilisé quand le client va fermer ou actualiser son navigateur les  infos restent
    stockInfosNomPrenom(){ //on stock le nom et prénom dans un localstorage pour qu'ils soient prérempli au rechargement
      const nom = document.getElementById('nom');
      const prenom = document.getElementById('prenom');
      localStorage.setItem("nom", nom);
      localStorage.setItem("prenom", prenom);

      if(nom !== null){
        nom = localStorage.getItem('nom');
      }
      if(prenom !== null){
        prenom = localStorage.getItem('prenom');
      }
    }
//----------------------------------------------------------------
//        Bloc réservation de la station

  initRerservationListener(){
    const boutonReserver = document.getElementById('boutonreserver');
    boutonReserver.addEventListener('click', function (){
      this.canvas.clear();
      if (this.station.available_bikes > 0){
        confirmation.style
      }
    })
  }


} //Fin de l'objet map
new Map;

  
  
});
