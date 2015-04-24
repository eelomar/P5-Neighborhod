var markerInitilization=[{
	name:'House',
	Lat:38.472324,
	Lng:-0.793430,
	comment:'La house chula',
	visible:true,
	dragg:false
},{
	name:'Pedro',
	Lat:38.472330,
	Lng:-0.7943,
	comment:'pero que pollo el tipi',
	visible:true,
	dragg:false

},{
	name:'Lolo',
	Lat:38.4730,
	Lng:-0.7942,
	comment:'otro polluelo',
	visible:true,
	dragg:false

}];
try{
var Generalmap = new google.maps.Map(document.getElementById("map-canvas"), {
	zoom: 15,
	center: new google.maps.LatLng(38.472324, -0.793430),
	mapTypeId: google.maps.MapTypeId.ROADMAP
});}catch(e){alert('We are experiencing problems loading the Google Maps interface. ' +
                            'We apologise for the inconvenience. Please try again later');}

var CustomMarker = function(data){
	this.name=ko.observable(data.name);
	this.comment=ko.observable(data.comment);
	this.Lat = ko.observable(data.Lat);
	this.Lng = ko.observable(data.Lng);
	this.dragg=ko.observable(data.dragg);
	this.fullSearch=ko.computed(function(){return (this.name()+" "+this.comment()).toLowerCase();},this);
	//console.log(this.fullSearch());
	this.visible=ko.observable(data.visible);

	this.marker_point = new google.maps.Marker({
		position: new google.maps.LatLng(this.Lat(), this.Lng()),
		title: this.name(),
		draggable: this.dragg(),
		icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
	});


	this.VisibilityMap=ko.computed(function (){
		if (this.visible()==false){ 
			this.marker_point.setMap(null);
		}else {
			this.marker_point.setMap(Generalmap);}
	},this);

	//Mark in table and map with marker has the mouse over
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
	google.maps.event.addListener(this.marker_point, 'mouseover', function() {
		this.marker_point.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png'); 
	}.bind(this));
 	google.maps.event.addListener(this.marker_point, 'mouseout', function() {
		this.marker_point.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
 	}.bind(this));
	
	//to show windows info from table

	var infowindow = new google.maps.InfoWindow({
 	 content:"Hello World!"+""+this.name()
  	});

	this.addInfo=function(){
		//search();
		Generalmap.setCenter(this.marker_point.getPosition());
		infowindow.open(Generalmap,this.marker_point);
		
	};

	//to show windows info from marker
	google.maps.event.addListener(this.marker_point, 'click', function() {
		this.addInfo();
 	}.bind(this));
	
    //if you just need to update it when the user is done dragging
    google.maps.event.addListener(this.marker_point, 'dragend', function() {
    	var pos = this.marker_point.getPosition();
    	this.Lat(pos.lat());
    	this.Lng(pos.lng());
    }.bind(this));

};


var ViewModel=function(){
	var self=this;
	this.query= ko.observable("");

	this.markerList=ko.observableArray([]);
	//initialize array markers
	markerInitilization.forEach(function(marker){
		self.markerList.push(new CustomMarker(marker));
	});
	//filter elements hide in table and in map
	this.filteredMarkers = ko.dependentObservable(function() {
		var filter = this.query().toLowerCase();
		//put all the markers if no query
		if (!filter) {
			this.markerList().forEach(function(marker){marker.visible(true);});
			return this.markerList();
		} else {
			//check if query match with marker
			return ko.utils.arrayFilter(this.markerList(), function(marker) {
				if (marker.fullSearch().match(filter)!=null){
					marker.visible(true);
					return true;
				}else{
					marker.visible(false);
					return false;
				}
			});
		}
	},this);

};

ko.applyBindings(new ViewModel());

