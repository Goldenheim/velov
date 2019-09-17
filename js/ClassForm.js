
class Form {
    /**
     * @param  {string} regexName 
     */
    constructor(regexName) {
        this.regexName = regexName; // Correspond à une chaîne avec caractères spéciaux acceptés   
        this.name = $("#name");
        this.surName = $("#surName");
        this.helpBox = $("#regex_Help");
        this.validationButton = $("#validation");
        this.cancelBtn = $("#cancel");
        this.resetBtn = $("#reset");
        this.signContainer = $("#reservation_Sign");
        this.resaBtn = $("#reservation_btn");
        this.nameResa = $(".status_reservation");
        this.cancelResa = $("#current_booking");
        this.init();
        //smooth animation
        this.scrollTo = target => {
            if (target.length) {
                $("html, body")
                    .stop()
                    .animate({
                        scrollTop: target.offset()
                            .top
                    }, 1500);
            }
        };
        // reset du formulaire 
        this.formReset = () => {
            this.name.val("");
            this.surName.val("");
            this.helpBox.text("");
        };
    }

    init() {
    	this.cancel();
        this.reset();
        this.regexControl("name");
        this.regexControl("surName");
        this.refresh();
    }

    //Bouton d'annulation
    cancel() {
        this.cancelBtn.click(e => {
            this.validationButton.css("display", "none");
            Canevas.clear_canvas();
            this.formReset();
            this.signContainer.fadeOut(500);
        });
    }

    //Bouton reset
    reset() {
        this.resetBtn.click(e => {
            this.formReset();
            //vider le canvas
            Canevas.clear_canvas();
            this.validationButton.css("display", "none");
        });
    }

    regexControl(type) {
        document.getElementById(type).addEventListener("input", e => {
            if (document.getElementById(type).value.length < 1) {
                this.helpBox.text("");
            } else if (!this.regexName.test(e.target.value)) {
                switch (type) {
                    case "name":
                        var prenom = "le prénom est invalide";
                        this.helpBox.text(prenom);
                        $("#regex_Help").css("color", "red");
                        break;
                    case "surName":
                        var nom = "le nom est invalide";
                        this.helpBox.text(nom);
                        $("#regex_Help").css("color", "red");
                        break;
                }
            } else {
                this.helpBox.text("");
            }
        });
    }

    resBlock() {
        this.resaBtn.click(e => {
            if (sessionStorage.getItem("endDate") != null) {
                $('#cancel_current_booking').modal({fadeDuration: 250});
                this.updateResa(this.Countdown);
            } else {
                Canevas.canvasEvents();
                // on le fait apparaitre en se déroulant
                this.signContainer.fadeIn(1000);
                this.scrollTo($("#reservation_Sign")); // smooth animation vers l'ancre 
            }
            e.stopPropagation();	     	
        });
    }

    webStorage() {
    	sessionStorage.setItem("endDate", this.expiration);
    	sessionStorage.setItem("name", this.nameStation); // On enregistre le nom de la station	

    	// sauvegarde locale du formulaire 
        let firstName = document.getElementById("name").value;
        localStorage.setItem("valNameForm", firstName);

        let lastName = document.getElementById("surName").value;
        localStorage.setItem("valSurNameForm", lastName);
    }

    refresh() {
    let reservation = sessionStorage.getItem("endDate");
    let name = sessionStorage.getItem("name");	
    	if(reservation){		
            let endDate = Number(reservation);
            let newTime = endDate - Date.now();
            this.Countdown = new Timer(newTime);
            this.cancelCurrentResa("#stopResa",this.Countdown);
            $(".status_reservation").text("Vous avez réservé 1 vélo sur la station " + name);
            this.cancelResa.css("display", "block"); // on affiche le bouton 'Annulation'

    	} else {
    		this.nameResa.text("Aucune réservation en cours");
    	}
    }

    // Bouton de validation de réservation 
    validation(name) {
        this.validationButton.click(e => {
            if (Formulaire.helpBox.text() != "" || $("#name").val().length <= 0 || $("#surName").val().length <= 0) {    
                $("#valid_Help").text("les informations sont incorrectes");                    
                $("#valid_Help").fadeIn(1000);    
                } else { 
                if (sessionStorage.getItem("endDate")) {
                    this.Countdown.stop();
                }     
                this.cancelResa.css("display", "block"); // on affiche le bouton d'annulation
                this.signContainer.hide('slow');
                this.nameStation = name;
                //Affichage de la réservation
                this.nameResa.text("Vous avez réservé 1 vélo sur la station " + name);
                this.Countdown = new Timer(1200000);
                this.expiration = Date.now() + (this.Countdown.time * 1000);
                this.webStorage();
                this.cancelCurrentResa("#stopResa",this.Countdown);
            }
        });

        this.validationButton.blur(e => {
            $("#valid_Help").fadeOut(2000);
        });
    }

    cancelCurrentResa(id, timer) {
        $(id).click(e => {
            timer.stop();
            this.nameResa.text("Votre réservation à bien été annulée");
            this.cancelResa.css("display", "none");
        });
    }   
}