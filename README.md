// English version :

# Objectives: 
 - Develop a "Single Page Application" page simulating a bicycle reservation in a city. 
 - The user must be able to reserve a bike from his browser (provided that there are still bikes available at the station!) the reservation is then validated for 20 minutes.
 - the application must be developed in JAVASCRIPT and display a map with the list of bike rental stations 
 - NO SERVER SIDE CODE 
 
 3 distinct parts :
 - Slideshow:
    - the logic of the slideshow must be written by me, no plugins allowed.
    - the slideshow automatically switches to the next slide every 5 seconds
    - the user can pause it
    - The user can manually move backwards or forwards with a mouse click, as well as with the left and right keys of the keyboard.
    
 - bike map :
      - map displaying in real time the list of bike stations and their availability.
      - The location and status of each station is provided via JC Decaux's OpenData platform.
      - the map must be dynamically generated via LEAFLETJS
      
      
 - reservation of a bicycle :
      - you must be able to reserve a bike by indicating your name, surname and signature.
      - The reservation data will be stored in the browser using the api WEB STORAGE and displayed below the panel with a dynamic countdown of the remaining time with expiry of the reservation.
      - A reservation expires AUTOMATICALLY after 20 minutes and also when the browser CLOSES.
      - There can only be one reservation at a time. If a new reservation takes place, it replaces the previous one.


// French version

# Objectifs: 
 - Développer une page de type "Single Page Application" simulant une réservation de vélos dans une ville. 
 - L'utlisateur doit pouvoir réserver un vélo depuis son navigateur (a condition qu'il restes des vélos disponibles à la station !) la réservation est alors validée pour 20 minutes.
 - l'application doit être développée en JAVASCRIPT et afficher une carte avec la liste des stations de location de vélos 
 - AUCUN CODE COTE SERVEUR 
 
 3 parties distinctes :
 - Diaporama :
    - la logique du diaporama doit être écrite par mes soins, interdiction de plugins
    - le diaporama passe automatiquement a la diapo suivante toutes les 5 secondes
    - l'utilisateur peut le mettre en pause
    - l'utilisateur peut reculer ou avancer manuellement à l'aide d'un clic de souris, ainsi qu'avec les touches gauches et droite de son clavier.
    
 - carte des vélos :
      - carte affichant en temps réel la liste des stations de vélos ainsi que leur disponibibilité
      - la localisation et l'état de chaque station est fourni via la plateforme OpenData de JC Decaux.
      - la carte doit être générée dynamiquement via LEAFLETJS
      
      
 - réservation d'un vélo :
      - on doit pouvoir réserver un vélo en indiquant son nom, prénom et sa signature.
      - Les données de réservation seront stockées dans le navigateur à l'aide de l'api WEB STORAGE et affichées en dessous du panneau avec un décompte dynamique du temps restant avec expiration de la réservation.
      - Une réservation expire AUTOMATIQUEMENT au bout de 20 minutes et également lorsque le navigateur se REFERME
      - Il ne peut y avoir qu'une seule réservation à la fois. Si une nouvelle réservation a lieu, elle remplace la précédente.
