/**
 *
 * STATION 
 *
 *
 */
class Station {
    constructor(station, marker) {
        this.name = station.name;
        this.address = station.address;
        this.opening = station.status;
        this.bikes = station.available_bikes;
        this.stands = station.available_bike_stands;
        this.paiement = station.banking;
        this.marker = marker;
        this.beforeSelect = $("#no_station__select"); 
        this.noBikes = $("#no_Bikes");
        this.station = station;
    }

    // converti booléen en texte pour le terminal de paiement
    convertBanking(bank) {
        let banking = "";
        if (bank == true) {
            banking = "Oui";
        } else {
            banking = "Non";
        };
        return banking
    }

    // Traduit 'open et 'close' en fr pour 'station.status'
    statusFr(status) {
        let reponse = "";
        if (status == "OPEN") {
            reponse = "Ouverte";
        } else if (status == "CLOSED") {
            reponse = "Fermée";
            $("#statStation").css("color", "#E10203");
        };
        return reponse
    }

    colorStatus(status, id) {
        if (status == "OPEN") {       
            $(id).css("color", "#02d116");
        } else {
            $(id).css("color", "#E10203");
        };
    }

    markerSelected() {
        this.marker.addListener("click", e => {
            Formulaire.scrollTo($("#current__station"));

            //Configuration des infos sur <aside>
            this.beforeSelect.hide(1000, 'swing'); // on cache le texte explicatif
            $("#station__Selected").show();

            // récupération des différentes infos de la station

            const infosContainer = document.getElementById("station__Selected");
                infosContainer.innerHTML= "";
            const name = document.createElement("h2");
                name.id = "nameStation";
                name.appendChild(document.createTextNode(this.name));

            const address = document.createElement("p");
                address.id = "addressStation";
                address.appendChild(document.createTextNode(this.address));

            const status = document.createElement("p");
                status.id = "statStation";
                status.appendChild(document.createTextNode(this.statusFr(this.opening)));

            const bikes = document.createElement("p");
                bikes.appendChild(document.createTextNode(`Vélo(s) disponible(s) : ${this.bikes}`));
            
            const stands = document.createElement("p");
                stands.appendChild(document.createTextNode(`Place(s) disponible(s) : ${this.stands}`));        

            const banking = document.createElement("p");
                banking.id = "banking";
                banking.appendChild(document.createTextNode(`Terminal de paiement : ${this.convertBanking(this.paiement)}`));

            infosContainer.appendChild(name);
            infosContainer.appendChild(address);
            infosContainer.appendChild(status);
            infosContainer.appendChild(bikes);
            infosContainer.appendChild(stands);
            infosContainer.appendChild(banking);
            this.colorStatus(this.opening, "#statStation");

            //Bouton de reservation
            Formulaire.resaBtn.css("display", this.displayBtnResa(this.bikes));
            Formulaire.resBlock();
            Formulaire.validation(this.name);
        });
    }

    // affichage du bouton de réservation
    displayBtnResa(nbvelo) {
        var display = "";
        if (nbvelo > 0) {
            display = "inline-block";
            this.noBikes.css("display", "none");
        } else {
            display = "none";
            this.noBikes.css("display", "block");
        }
        return display;
    }
}