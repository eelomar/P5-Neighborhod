var markerInitilization=[{
	name:'House',
	Lat:38.472324,
	Lng:-0.793430,
	comment:'La house wapa'
},{
	name:'Pedro',
	Lat:38.472330,
	Lng:-0.7943,
	comment:'pero que pollo el tipi'
},{
	name:'Lolo',
	Lat:38.4730,
	Lng:-0.7942,
	comment:'otro polluelo'
}];

var Generalmap = new google.maps.Map(document.getElementById("map-canvas"), {
	zoom: 15,
	center: new google.maps.LatLng(38.472324, -0.793430),
	mapTypeId: google.maps.MapTypeId.ROADMAP
});

var CustomMarker = function(data){
	this.name=ko.observable(data.name);
	this.comment=ko.observable(data.comment);
	this.Lat = ko.observable(data.Lat);
	this.Lng = ko.observable(data.Lng);
	this.dragg=ko.observable(false);
	this.marker_point = new google.maps.Marker({
		position: new google.maps.LatLng(this.Lat(), this.Lng()),
		title: this.name(),
		map: Generalmap,
		draggable: this.dragg(),
		icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
	});

	this.hovered = function(data,event){
		var $tr = $(event.target).parent();
		$tr.addClass('success');
		this.marker_point.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');

	};

	this.unhovered = function(data,event){
		var $tr = $(event.target).parent();
		$tr.removeClass('success');
		this.marker_point.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
	};

    //if you just need to update it when the user is done dragging
    google.maps.event.addListener(this.marker_point, 'dragend', function() {
    	var pos = this.marker_point.getPosition();
    	this.Lat(pos.lat());
    	this.Lng(pos.lng());
    }.bind(this));

	// google.maps.event.addListener(this.marker_point, 'mouseover', function(event) {
 //    	console.log(this);
 //    	console.log(event);

 //         var rowId= this.rowId;
 //            $("#"+rowId).addClass("success");
 //    }.bind(this));    
};


var ViewModel=function(){
	var self=this;
	this.advanceFilter=ko.observable(false);
	this.addView=ko.observable(false);

	this.markerList=ko.observableArray([]);
	//initialize array markers
	markerInitilization.forEach(function(marker){
		self.markerList.push(new CustomMarker(marker));
	});

	this.currentMarker=ko.observable(this.markerList()[0]);

	this.toggleVisibilityFilter=function(){
		if (self.advanceFilter()){
			self.advanceFilter(false);
		}else {self.advanceFilter(true);}
	};

	this.toggleVisibilityAdd=function(){
		if (self.addView()){
			self.addView(false);
		}else {self.addView(true);}	};

//	this.setCat=function(thisCat){
//		self.currentCat(thisCat);
//	}
};


ko.applyBindings(new ViewModel());

