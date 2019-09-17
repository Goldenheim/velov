/** 
 * @type {object}
 * @description Create a drawing line block with HTML5 Canvas
 */
class Canvas {
    /**
    * @param {string} color Determine color of drawing line 
    * @param {number} brushwidth Determine the size of drawing line
    * @param {number} width
    * @param {number} height
    */
    constructor(color, brushWidth, width, height) {
        this.canvasTouch = document.getElementById("canvas");
        this.canvas = $("#canvas");
        this.context = $("#canvas")[0].getContext("2d");
        this.color = color;
        this.brushWidth = brushWidth;
        this.width = width;
        this.height = height;
        this.canvasTouch.width = this.width;
        this.canvasTouch.height = this.height;
        this.painting = false;
        this.started = false;
        this.cursorX = 0;
        this.cursorY = 0;
    }

    /**
     * @return {[type]}
     */
    clear_canvas() {
        this.context.clearRect(0, 0, this.canvas.width(), this.canvas.height());
    }

    // Fonction qui dessine une ligne :
    drawLine(X, Y) {
        // Trait arrondi :
        this.context.lineJoin = 'round';
        this.context.lineCap = 'round';
        // Si c'est le début, j'initialise
        if (!(this.started)) {
            // Je place mon curseur pour la première fois :
            this.context.beginPath();
            this.context.moveTo(X, Y);
            this.started = true;
        }
        // Sinon je dessine
        else {
            this.context.lineTo(X, Y);
            this.context.strokeStyle = this.color;
            this.context.lineWidth = this.brushWidth;
            this.context.stroke();
        }
    };

    canvasEvents() {

        // DESKTOP 

        // Click souris enfoncé sur le canvas, je dessine :
        this.canvas.mousedown(e => {
            this.painting = true;
        });

        // Mouvement de la souris sur le canvas :
        this.canvas.mousemove(e => {
            // Si je suis en train de dessiner (click souris enfoncé) :
            if (this.painting) {
                // Set Coordonnées de la souris :
                this.cursorX = e.offsetX;
                this.cursorY = e.offsetY;
                // Dessine une ligne :
                this.drawLine(this.cursorX, this.cursorY);
                Formulaire.validationButton.css("display", "block");
            }
        });

        // Relachement du Click sur la fenêtre, j'arrête de dessiner :
        $(window).mouseup(e => {
                this.painting = false;
                this.started = false;
        });

        // MOBILE 

        this.canvasTouch.addEventListener("touchstart", e => {
            this.painting = true;
        });


        this.canvasTouch.addEventListener("touchmove", e => {
            // Si je suis en train de dessiner (pression sur l'écran) :
            if (this.painting) {
                let rect = this.canvasTouch.getBoundingClientRect();
                // Coordonnées du doigt en tenant compte de la position du canvas sur le viewport
                this.cursorX = (e.touches[0].clientX - rect.left); 
                this.cursorY = (e.touches[0].clientY - rect.top);
                this.drawLine(this.cursorX, this.cursorY);
                Formulaire.validationButton.css("display", "block");
            }
        });

        this.canvasTouch.addEventListener("touchend", e => {
            this.painting = false;
            this.started = false;
        });

        this.canvas.on("scroll touchmove mousedown mousewheel", e => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    }

}