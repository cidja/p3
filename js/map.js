//$(document).ready(function(){ charge le script quand la page est chargée
  class Map{
  constructor() {
    this.map;
    this.initMap();
    this.loadMarkers(this.map);
    this.initRerservationListener();
    this.canvas = new Canvas();
    this.timer = new Timer();
    this.timer.restartExistingTimer();
    this.clearCanvas();
    this.nom = document.getElementById('nom');
    this.prenom = document.getElementById('prenom');
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
              marker.bindPopup(`
              Station -> ${nameConvert} 
              <br>
               adresse -> ${addresse}
              <br> 
              Nombre de places -> ${nbPlaces} 
              <br>
              Vélos disponible -> <strong>${velosDisponible}</strong>`);
              $(marker).on('click', function() {
              $('#conteneurstation').show(1000); //jquery affiche le div conteneur station au click sur un marker 
              $('#choixstation').html("Station sélectionnée :  <span id=\"reservation\">" + nameConvert); // Affiche le nom de la station au dessus du formulaire de renseignement du nom et prénom pour bien confirmer au client quelle station il sélectionne
              });

            } 
            else if((velosDisponible <= 3) & (velosDisponible > 0)) { //Sinon on affiche icon orange 
              let marker = L.marker([coordsLat, coordsLong], {icon : orangeIcon}).addTo(map);
              marker.bindPopup(`
              Station -> ${nameConvert} 
              <br>
               adresse -> ${addresse}
              <br> 
              Nombre de places -> ${nbPlaces} 
              <br>
              Vélos disponible -> <strong>${velosDisponible}</strong>`);
              $(marker).on('click', function(){
              $('#conteneurstation').show(1000); //jquery affiche le div conteneur station au click sur un marker 
              $('#choixstation').html("Station sélectionnée : " + nameConvert); // Affiche le nom de la station au dessus du formulaire de renseignement du nom et prénom pour bien confirmer au client quelle station il sélectionne
              });
            }
            
            else if(velosDisponible = 0) { //Si aucun vélo disponible affiche image orange barrée
              let marker = L.marker([coordsLat, coordsLong], {icon : orangeIconBarree}).addTo(map);
              marker.bindPopup('Désolé plus aucun vélos disponible actuellement sur cette station');
            }
          } 
          else{ //Sinon affiche redIcon
            let marker = L.marker([coordsLat, coordsLong], {icon : redIcon}).addTo(map);
            marker.bindPopup("Cette station est fermée pour le moment veuillez nous excusez pour le dérangement.");
            };
          }  //fin de for
    });
  } //fin loadMarkers()

  
  //utilisé quand le client va fermer ou actualiser son navigateur les  infos restent
    stockInfosNomPrenom(){ //on stock le nom et prénom dans un localstorage pour qu'ils soient prérempli au rechargement
      localStorage.setItem("nom", this.nom);
      localStorage.setItem("prenom", this.prenom);
      if(this.nom !== null){
        this.nom = localStorage.getItem('nom');
      }
      if(this.prenom !== null){
        this.prenom = localStorage.getItem('prenom');
      }
    } // Fin stockInfosNomPrenom()
 
    effaceUtilisateur(){ //si rajout d'un bouton pour effacer les préremplissage nom prenom
      localStorage.removeItem("nom");
      localStorage.removeItem("prenom");

    } // Fin effaceUtilisateur()
//----------------------------------------------------------------
//        Bloc réservation de la station

  initRerservationListener(){
        $('#validationbouton').on('click',  () =>{
        $('#conteneurstation').hide(1500);
        const station = $('#reservation').text();
        if($('#texttimer').text() !== "" && !$('#texttimer').text().startsWith("Votre réservation à la station")){
          alert("erreur vous avez déjà une réservation merci de l'annulez avant de reprendre un nouveau vélo"); // Affiche message alert en pop-up
          // $('#sireservation').html("erreur vous avez déjà une réservation merci de l'annulez avant de reprendre un nouveau vélo");
        }else{
        $('#infosReservation').show(1000); //montre div infosReservationavec une animation sur 1000
        this.confirmation(station);
        }
        
      });
  } //fin initRerservationListener()

  confirmation(textStation){ //méthode pour lancer le timer start de l'objet start
    this.timer.start(textStation);
  }

  clearCanvas(){
    $('#effacercanvas').on('click', () =>{
      this.canvas.clear();
    })
  }

} //Fin de l'objet map
new Map;

  
  
//});
