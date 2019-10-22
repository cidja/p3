let intervalID = null;
class Timer{
    constructor(){
        this.textTimer = document.getElementById('texttimer');
        this.sectionTimer = document.getElementById('timer');
        this.restartExistingTimer();
        this.canvas = new Canvas();
    }

    start(stationAddress) {
        this.stationAddress = stationAddress;
        clearInterval(intervalID);
        if(sessionStorage.getItem("timer") == undefined){ //fonction qui va vérifier si temps déja défini si non règle le temps à 1200 sec (20 minutes)
            sessionStorage.setItem('timer', 1200);
        }
        this.time = sessionStorage.getItem("timer");
        if(intervalID !== null){
            clearInterval(intervalID);
        }
        intervalID = setInterval(() => {
            sessionStorage.setItem("station", this.stationAddress);
            sessionStorage.setItem("timer", this.time);
            const{minutes, seconds} = this.getMinutesAndSeconds(this.time);
            this.textTimer.innerHTML =
            `Vous avez bien réservé un vélo à <span class="infosimportantes">${this.stationAddress}<span> votre réservation expirera dans :  <span class="infosimportantes">${minutes}:${seconds}</span>`;
            this.updateTime();
            if (this.time === 0){
                clearInterval(intervalID);
                this.textTimer.innerHTML =
                `Votre réservation à la station <span>${this.stationAddress}</span> a expirée !`;
                sessionStorage.removeItem("station", "timer");
            }
        }, 1000) //appelé toutes les secondes
        document.getElementById('annulation').addEventListener('click', this.stopTime());
    }
    updateTime(){
        this.time = this.time -1; //on décrémente de 1 toutes les 1000 millisecondes (1sec)
        sessionStorage.setItem("timer", this.time); // on stock dans sessionStorage le timer
    }

    restartExistingTimer(){
        if(sessionStorage.getItem("station") && sessionStorage.getItem('timer')){
            this.start(sessionStorage.getItem('station'), sessionStorage.getItem('timer'));
        }
    }

    stopTime(){ // pour arrêter le chrono
        $('#annulation').on("click", function(){
        clearInterval(intervalID);
        //this.canvas.clear();
        sessionStorage.removeItem("timer"); // Suppression du sessionStorage pour timer (donc quand clic sur annuler supprime session timer plus de temps allouer)
        $('#texttimer').text(""); // réecriture de texttimer pour indiquer vide permet à la condition du bouton valider de fonctionner 
        $('#texteannulation').show(); // Affiche  réservation annulée
        setTimeout(function () {
            $('#texteannulation').hide(1000); //cache test
        },2000);       
    });

    }

    getMinutesAndSeconds() {
        let minutes = Math.floor(this.time  /60);
        let seconds = this.time - minutes * 60;

        if(seconds < 10){
            seconds =  `0${seconds}`;
        }
        if(minutes < 10){
            minutes = `0${minutes}`;
        }
        return {
            minutes,
            seconds
        };
    }
   

}
