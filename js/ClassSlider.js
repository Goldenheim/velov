/**
 *  
 */

class Slider {
    constructor() {
        this.$figure = $("#slide figure");
        this.indexFigure = this.$figure.length - 1; // on définit l'index du dernier élément
        this.i = 0; // on initialise un compteur
        this.$currentFigure = this.$figure.eq(this.i);
        this.figureCss = this.$figure.css("display", "none");
        this.currentFigureCss = this.$currentFigure.css("display", "block"); // image affichée
        this.next = () => {
            this.$figure.css("display", "none"); // on cache les images
            this.$currentFigure = this.$figure.eq(this.i); // on définit la nouvelle image
            this.$currentFigure.css("display", "block"); // puis on l'affiche
        };
        this.stop = () => {
            clearTimeout(this.timeOut); // stop function TimeOut
            $(".fa-pause").css("display", "none");
            $(".fa-play").css("display", "block");
        }
        this.timeOut = "";
        this.slideFigure(); // on lance la fonction une première fois
        this.currentNavigation();
        this.keyNav();
    }

    // Défilement automatique du slider

    slideFigure() {
        this.timeOut = setTimeout(() => {

            if (this.i < this.indexFigure) { // si le compteur est inférieur au dernier index
                this.i++;
            } else { // sinon, on le remet à 0 (première image)
                this.i = 0;
            }

            this.$figure.fadeOut(1000);
            this.$currentFigure = this.$figure.eq(this.i);
            this.$currentFigure.fadeIn(1000);

            this.slideFigure(); // relancer la fonction à la fin

        }, 5000); // interval à 5sec 
    }

    currentNavigation() {
        // Défilement manuel du slider: flèches écran

        $(".next").click(e => { // image suivante
            
            this.stop();
            this.i++; // on incrémente le compteur

            if (this.i <= this.indexFigure) { //on passe au slide suivant
                this.next();
            } else if (this.i > this.indexFigure) { //on revient au 1er slide
                this.i = 0;
                this.next();
            }

        });

        $(".prev").click(e => { // image précédente

            this.stop();
            this.i--;

            if (this.i >= 0) { //on passe au slide précédent
                this.next();
            } else if (this.i < 0) { // On passe au dernier slide
                this.i = this.indexFigure;
                this.next();
            };

        });

        // stop & play btns

        $(".fa-pause").click(e => {
            this.stop();
        });

        $(".fa-play").click(e => {
            $(".fa-play").css("display", "none");
            $(".fa-pause").css("display", "block");
            this.slideFigure();
        });
    }

    // Défilement accessibilité clavier

    keyNav() {

        $(window).keydown(e => {
            switch (e.keyCode) {
                case 37:
                    this.i--; // on décrémente le compteur
                    this.stop();
                    if (this.i >= 0) {
                        this.next();
                    } else if (this.i < 0) { // retour sur le dernier slide
                        this.i = this.indexFigure;
                        this.next();
                    }

                    break;
                case 39:
                    this.i++; // on incrémente le compteur
                    this.stop();
                    if (this.i <= this.indexFigure) {
                        this.next();
                        this.next();
                    } else if (this.i > this.indexFigure) { //on revient au 1er slide
                        this.i = 0;
                        this.next();
                    }

                    break;
            }
        });
    }
}