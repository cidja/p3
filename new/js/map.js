class Map{
    constructor(){
        this.initmap();
        this.loadMarker(this.map); //propriété pour charger les marqueurs image

    }


    //------------Fonction initialisation de la map
    initmap(){
        this.map = L.map('map').setView([48.69, 6.18], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    } // Fin initmap();

    loadMarker(map){
        let jcdecauxApi = 'https://api.jcdecaux.com/vls/v1/stations?contract=nancy&apiKey=87166a79118dbedb3a843f9471b4c86be316f142'; //Sélection contrat nancy
        ajaxGet(jcdecauxApi, function(reponse){
            let contrat = JSON.parse(reponse);
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

            for(let infos of contrat){
                //Initialisation de toutes les variables que l'on récupère du tableau
                let name = infos.name.substr(8); //Nom de la station 
                let address = infos.address; // Adresse de la station
                let coordsLat = infos.position.lat; // Lattitude de la station (pour le placement sur la carte)
                let coordsLong = infos.position.lng; // Longitude de la sation (pour le placement sur la carte)
                let bikeStands = infos.bike_stands; // Nombre de STATIONNEMENT vélos
                let availableBikeStands = infos.available_bike_stands; // Nombre de STATIONNEMENT DE VELO LIBRE
                let availableBikes = infos.available_bikes; // Nombre de vélos LIBRES
                let status = infos.status; // Status de la station ("OPEN" OR "CLOSE")
                let lastUpdate = infos.last_update; // Affiche temps de dernier mise à jour des infos
                if(status === "OPEN"){
                    if(availableBikes > 3){ // Si nombre de vélos supérieur à 3 on affiche une icone verte
                        let marker = L.marker([coordsLat, coordsLong], {icon : greenIcon}).addTo(map);
                        marker.bindPopup(`
                        Station -> ${name} 
                        <br>
                        adresse -> ${address}
                        <br> 
                        Nombre de places -> ${bikeStands} 
                        <br>
                        Vélos disponible -> <strong>${availableBikes}</strong>`);
                    }else if((availableBikes <= 3) & (availableBikes > 0)) { //Sinon on affiche icon orange 
                        let marker = L.marker([coordsLat, coordsLong], {icon : orangeIcon}).addTo(map);
                        marker.bindPopup(`
                        Station -> ${name} 
                        <br>
                         adresse -> ${address}
                        <br> 
                        Nombre de places -> ${bikeStands} 
                        <br>
                        Vélos disponible -> <strong>${availableBikes}</strong>`);

                }
            }
        };
        })
    }
} //Fin class Map
new Map();