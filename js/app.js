function initialize() {
		var mapOptions = {
			zoom: 15,
			center: new google.maps.LatLng(38.472324, -0.793430),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	}
