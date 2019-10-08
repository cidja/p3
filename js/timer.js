$(document).ready(function(){ //charge le script quand la page est chargée
class Timer{
    constructor(){
        this.textTimer = document.getElementById('texttimer');
        this.sectionTimer = document.getElementById('timer');
    }

    start(stationAddress, startTime) {
        this.stationAddress = stationAddress;
        clearInterval(this.intervalID);
        this.time = startTime;
        this.intervalID = setInterval(() => {
            this.sectionTimer.style.display = "block";
            sessionStorage.setItem("station", this.stationAddress);
            sessionStorage.setItem("timer", this.time);
            const{minutes, seconds} = this.getMinutesAndSeconds(this.time);
            this.textTimer.innerHTML =
            `Vous avez bien réservé un véla à <span>${this.stationAddress}<span> pour une durée de <span>${minutes}:${seconds}</span>`;
            this.updateTime();
            if (this.time === 0){
                clearInterval(this.intervalID);
                this.textTimer.innerHTML =
                `Votre réservation à la station <span>${this.stationAddress}</span> a expirée !`;
                sessionStorage.clear("station", "timer");
            }
        }, 1000)
    }
    updateTime(){
        this.time= this.time -1;
        sessionStorage.setItem("timer", this.time);
    }

    restartExistingTimer(){
        if(sessionStorage.getItem("station") && sessionStorage.getItem('timer')){
            this.start(sessionStorage.getItem('station'), sessionStorage.getItem('timer'));
        }
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

});