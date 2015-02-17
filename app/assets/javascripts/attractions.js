var Attraction = function(attraction, marker){
  this.attraction = attraction,
  this.marker = marker,
  this.route = route,
  this.init();
}

Attraction.prototype.init = function(){
  this.loadAttraction();
  this.setListeners();
}

Attraction.prototype.loadAttraction = function(){

  var attractionInfo = this.buildAttractionInfo()

  $('#attraction-list').append(attractionInfo);
};

Attraction.prototype.buildAttractionInfo = function() {

  var item = ['<li id="attraction',
          this.attraction._id,
          '">',
          this.attraction.name,
          '<a href="#"',
          '>',
          '<button id="add',
          this.attraction._id,
          '">Add to Trip</button>',
          '</li>'
         ].join('');

  return item;
}

Attraction.prototype.setListeners = function(){
  var thisAttraction = this
  $('#attraction-list').on('click', '#add' + this.attraction._id, function(event){
    event.preventDefault();
    console.log("You clicked me!")
    thisAttraction.setAsWaypoint();
  })
}

Attraction.prototype.setAsWaypoint = function(){
  console.log("setting a waypoint!")

  var lng = this.attraction.longlat.coordinates[0]

  var lat = this.attraction.longlat.coordinates[1]

  var coords = new google.maps.LatLng(lat, lng)

  this.route.waypts.push({
        location: coords,
        stopover: true});

  this.route.calculateRoute();

  console.log("all done!")
  console.log("now the waypoints are:")
  console.log(this.route.waypts)
}
