let intervalID = null;
class Timer{
    constructor(){
        this.textTimer = document.getElementById('texttimer');
        this.sectionTimer = document.getElementById('timer');
        this.restartExistingTimer();
        
    }

    start(stationAddress) {
        this.stationAddress = stationAddress;
        clearInterval(this.intervalID);
        this.time = 1200;
        if(intervalID !== null){
            clearInterval(intervalID);
        }
        intervalID = setInterval(() => {
            sessionStorage.setItem("station", this.stationAddress);
            sessionStorage.setItem("timer", this.time);
            const{minutes, seconds} = this.getMinutesAndSeconds(this.time);
            $('#texttimer').show(2000);
            this.textTimer.innerHTML =
            `Vous avez bien réservé un vélo à <span>${this.stationAddress}<span> pour une durée de <span>${minutes}:${seconds}</span>`;
            this.updateTime();
            if (this.time === 0){
                clearInterval(this.intervalID);
                this.textTimer.innerHTML =
                `Votre réservation à la station <span>${this.stationAddress}</span> a expirée !`;
                sessionStorage.clear("station", "timer");
            }
        }, 1000)
        document.getElementById('annulation').addEventListener('click', this.stopTime());
    }
    updateTime(){
        this.time = this.time -1; //on décrémente de 1 toutes les 1000 millisecondes (1sec)
        sessionStorage.setItem("timer", this.time);
    }

    restartExistingTimer(){
        if(sessionStorage.getItem("station") && sessionStorage.getItem('timer')){
            this.start(sessionStorage.getItem('station'), sessionStorage.getItem('timer'));
        }
    }

    stopTime(){ // pour arrêter le chrono
        $('#annulation').on("click", function(){
        clearInterval(intervalID);
        sessionStorage.removeItem("timer"); // Suppression du sessionStorage pour timer (donc quand clic sur annuler supprime session timer plus de temps allouer)
        $('#texttimer').hide(2000);
        $('#texteannulation').show(); // Affiche  réservation annulée
        setTimeout(function () {
            $('#texteannulation').hide(1000); //cache test
        },2000);
        setTimeout( function() {
            $('#infosReservation').hide(1000);
        },3000)
       
        
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
