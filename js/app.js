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
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(this.Lat(), this.Lng()),
		title: this.name(),
		map: Generalmap,
		draggable: false
	});
	
};


var ViewModel=function(){
	var self=this;
	
	this.markerList=ko.observableArray([]);
	//initialize array markers
	markerInitilization.forEach(function(marker){
		self.markerList.push(new CustomMarker(marker));
	});

	this.currentMarker=ko.observable(this.markerList()[0]);

	this.incrementCounter=function(){
		self.currentCat().ClickCount(self.currentCat().ClickCount()+1);
	};

//	this.setCat=function(thisCat){
//		self.currentCat(thisCat);
//	}
};


ko.applyBindings(new ViewModel());

