class Reserv {
    constructor() {
        this.tempsRestant = $(".timer");
        this.siTemps = sessionStorage.getItem("Timer");
        this.countdown;
        this.btnAnnuler = $(".annuler");
        this.btnAnnulerOui = $("#yesReserv");
        this.btnFermer = $(".fermeture");

        this.btnAnnuler.click(this.clearReserv.bind(this));
        this.btnAnnulerOui.click(this.clearReserv.bind(this));
        this.btnAnnuler.click(this.msgAnnuler.bind(this));
        this.btnAnnulerOui.click(this.msgAnnuler.bind(this));
        this.btnFermer.click(this.btnFermeture.bind(this));
    }

    time(secondes) {
        const temps = Date.now();
        const apres = temps + secondes * 1000;
        this.countdown = setInterval(() => {
            let secondsLeft = Math.round((apres - Date.now()) / 1000);
            if (secondsLeft <= 0) {
                this.clearReserv(this.countdown);
                $(".reservation").css("display", "none");
                $(".expired").css("display", "block");
                $(".expiredMsg").text("Votre réservation a expiré");
            } else {
                this.tempsRestant.text(this.affcherTimer(secondsLeft));
            }
            sessionStorage.setItem("Timer", secondsLeft);

        }, 1000);
    }

    affcherTimer(secondes) {
        let minutes = Math.floor(secondes / 60);
        let second = secondes % 60;
        let afficheTemps = `${minutes}:${second < 10 ? "0" : ""}${second}`;
        return afficheTemps;
    }

    clearReserv() {
        clearInterval(this.countdown);
        sessionStorage.removeItem("Timer");
        $(".reservation").css("display", "none");
    }

    reservActive() {
        if (this.siTemps > 0) {
            this.time(this.siTemps);
            $(".reservation").css("display", "block");
            $(".nomReserv").text(sessionStorage.getItem("Nom"));
            $(".station").text(sessionStorage.getItem("Station"));
        }
        this.startReserv()
    }
    startReserv() {
        $("#reserForm").click((e) => {
            if (sessionStorage.getItem("Timer") > 0) {
                $(".reservCours").css("display", "block");
                $("#reserForm").css("display", "none");
                $("#noReserv").click(() => {
                    e.preventDefault();
                    $("#formInfo").css("display", "none");
                    $(".reservCours").css("display", "none");
                })
                $("#yesReserv").click(() => {
                    e.preventDefault();
                    $(".name").css("display", "block");
                    $(".infoStation").css("display", "none");
                    $(".reservCours").css("display", "none");
                    $("#reserForm").css("display", "none");
                    $(".name").css("display", "block");
                    $(".infoStation").css("display", "none");
                })
            } else {
                $("#reserForm").css("display", "none");
                $(".name").css("display", "block");
                $(".infoStation").css("display", "none");
            }
        })
        this.nameReserv()
    }

    nameReserv() {
        $("#nom").val(localStorage.getItem("Nom"));
        $("#prenom").val(localStorage.getItem("Prenom"));
        $("#signer").click((e) => {
            e.preventDefault();
            if ($("#prenom").val() === "" || $("#nom").val() === "") {
                $(".erreur").text("Veuilez ajouter votre nom et prénom !");
                $(".erreur").css("color", "red");
            } else {
                localStorage.setItem("Nom", $("#nom").val());
                localStorage.setItem("Prenom", $("#prenom").val());
                sessionStorage.setItem("Nom", $("#nom").val());
                $("#canva").css("display", "block");
                $(".name").css("display", "none");
                $(".erreur").css("display", "none");
            }
        });
        this.comfirmReserv()
    }

    comfirmReserv() {
        $("#reserSignature").click((e) => {
            this.tempsRestant.text("20:00")
            e.preventDefault();
            if ($(".erreurVide").text() === "") {
                canvas.effacer();
                this.time(1200);
                $(".nomReserv").text(sessionStorage.getItem("Nom"));
                $(".station").text(sessionStorage.getItem("Station"));
                $(".reservation").css("display", "block");
                $("#canva").css("display", "none");
                $("#formInfo").css("display", "none");
            }
        })
    }

    btnFermeture() {
        $("#canva").css("display", "none");
        $("#formInfo").css("display", "none");
        $(".name").css("display", "none");
        $(".reservCours").css("display", "none");
    }

    msgAnnuler() {
        $(".expired").css("display", "block");
        $(".expiredMsg").text("Vous avez annulé votre réservation");
        setTimeout(() => {
            $(".expired").css("display", "none");
        }, 3000);
    }
}