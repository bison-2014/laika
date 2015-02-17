var MarkerObject = function(coords, associatedAttraction){
  this.defaultIcon = '/red-dot.png'

  this.marker = new google.maps.Marker({
    position: coords,
    map: mapObject.map,
    zIndex: nextZIndex(),
    icon: this.defaultIcon
  }),

  this.associatedAttraction = associatedAttraction,
  this.setClickListener();

}

MarkerObject.prototype.setClickListener = function(){
  var thisMarker = this
  google.maps.event.addListener(thisMarker.marker, 'click', function(){

    LAST_MARKER_CLICKED.setIcon('/red-dot.png')
    thisMarker.marker.setIcon('/purple-dot.png')
    LAST_MARKER_CLICKED = thisMarker.marker;

    thisMarker.marker.setZIndex(nextZIndex())

    // console.log(thisMarker.associatedAttraction)
    var attraction = thisMarker.associatedAttraction._id

    $('#attraction-list')

  })
}


var MarkerCollection = function(attractions){
  this.attractions = attractions
}

MarkerCollection.prototype.loadMarkers = function(){
  var thisCollection = this
    $.each(this.attractions, function(i,item){
      thisCollection.loadMarker(item);
    });
  }

MarkerCollection.prototype.loadMarker = function(attraction){

  var latitude = attraction.longlat.coordinates[1];
  var longitude = attraction.longlat.coordinates[0];
  var coords = new google.maps.LatLng(latitude, longitude);

  var marker = new MarkerObject(coords, attraction)
  new Attraction(attraction, marker, route)

}

var LAST_MARKER_CLICKED = new google.maps.Marker({});

window.zindex = 0;

function nextZIndex() {
  return window.zindex += 1;
}