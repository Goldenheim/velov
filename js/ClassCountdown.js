/**
 *
 * COUNTDOWN method
 *
 *
 */

class Timer {
    constructor(delai){
        this.time = delai/1000;      
        this.startDecrease();
        this.currentReservation = $("#timerText");
        this.cancelResa = $("#current_booking");
    }
  
    startDecrease(){ 
        let chrono = setInterval(() =>{
        this.interval = chrono;
        this.time--; 
        if(this.time > 0){         
            this.calcMinutes();     
            this.calcSeconds();
            // Afficher le résultat dans l'élément timerText
            this.currentReservation.show();
            this.currentReservation.text("Temps restant: " + this.minute + " min " + this.second + " sec ");
        } else{
            clearInterval(this.interval);
            Formulaire.nameResa.text("Aucune réservation en cours");
            this.currentReservation.text("Votre réservation à expirée");
            this.cancelResa.css("display", "none");
            sessionStorage.clear();  
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
        sessionStorage.clear();
        this.currentReservation.text('');
    }
    
    calcMinutes(){
        this.minute =Math.floor(this.time/60);
    }
    
    calcSeconds(){
        this.second = Math.floor(this.time-(this.minute*60));
    }
}




