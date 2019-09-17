/**
 *
 * MAP & MARKERS 
 *
 *
 */

class MapObj {
    constructor(api) {
        this.api = api;
        this.map = null;
        this.marker = null;
        this.markers = [];
        this.initMap();
    }

    // intégration de la Gmap
    initMap() {
        var Options = {
            center: {
                lat: 45.75,
                lng: 4.85
            },
            zoom: 12
        }

        this.map = new google.maps.Map(document.getElementById('map'), Options);
        this.callVelovObj();
    }

    // Regroupement des markers en utilisant la librairie js Markerclusterer.
    markersCluster() {
        let markerCluster = new MarkerClusterer(this.map, this.markers, {
            imagePath: "images/m/",
        });
    }

    callVelovObj() {
        ajaxGet(this.api, reponse => {
            var stations = JSON.parse(reponse);
            stations.forEach(station => {
                var MarkerIcon = {
                    url: "images/marker1.png",
                    labelOrigin: new google.maps.Point(32, 38)
                };

                if(station.status === 'CLOSED' || station.available_bikes === 0){
                	
	                this.marker = new google.maps.Marker({
	                    position: station.position,
	                    icon: MarkerIcon,
	                    title: station.title,
	                    label: {
	                        text: String(station.available_bikes),
	                        fontSize: "10px",
	                        color: "#fff",
	                        fontWeight: "bold",
	                    },
	                    animation: google.maps.Animation.DROP
	                });
                } else {
	            	this.marker = new google.maps.Marker({
	                    position: station.position,
	                    icon:{
		                    url: "images/marker_green.png",
		                    labelOrigin: new google.maps.Point(32, 38)
	                	},
	                    title: station.title,
	                    label: {
	                        text: String(station.available_bikes),
	                        fontSize: "10px",
	                        color: "#fff",
	                        fontWeight: "bold",
	                    },
	                    animation: google.maps.Animation.DROP
	            	});
            	}
                this.markers.push(this.marker);
                let Stations = new Station(station, this.marker);
                Stations.markerSelected();
            });
            this.markersCluster();
        });
    }
}