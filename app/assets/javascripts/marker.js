var MarkerObject = function(coords, associatedAttraction){
  this.defaultIcon = '/red-dot.png';

  this.marker = new google.maps.Marker({
    position: coords,
    map: mapObject.map,
    zIndex: nextZIndex(),
    icon: this.defaultIcon
  }),

  this.associatedAttraction = associatedAttraction || new Attraction(),
  this.listenForUserInteraction();
};

MarkerObject.prototype.listenForUserInteraction = function(){
  var thisMarker = this;
  var thisAttraction = thisMarker.associatedAttraction;

  google.maps.event.addListener(thisMarker.marker, 'click', function(){

    var thisListItem = $('#attraction' + thisAttraction._id);

    thisMarker.changeListItemBackgroundColor(thisListItem)
    thisMarker.changeMarkerColor();

    $('#attraction-list').prepend(thisListItem);
  });
};

MarkerObject.prototype.changeListItemBackgroundColor = function(thisListItem){
  if (typeof LAST_MARKER_CLICKED !== 'string') {
    var lastAttraction = LAST_MARKER_CLICKED.associatedAttraction;
    var lastListItem = $('#attraction' + lastAttraction._id);
    lastListItem.css('background-color', 'white');
  }
  thisListItem.css('background-color', 'purple');
}

MarkerObject.prototype.changeMarkerColor = function(){

  if (typeof LAST_MARKER_CLICKED !== 'string') {
    LAST_MARKER_CLICKED.marker.setIcon('/red-dot.png');
  };

  LAST_MARKER_CLICKED = this;

  this.marker.setIcon('/purple-dot.png');
  this.marker.setZIndex(nextZIndex());
};

var MarkerCollection = function(attractions){
  this.attractions = attractions;
};

MarkerCollection.prototype.loadMarkers = function(){
  var thisCollection = this;
    $.each(this.attractions, function(i,item){
      thisCollection.loadMarker(item);
    });
  };

MarkerCollection.prototype.loadMarker = function(attraction){

  var latitude = attraction.longlat.coordinates[1];
  var longitude = attraction.longlat.coordinates[0];
  var coords = new google.maps.LatLng(latitude, longitude);

  var marker = new MarkerObject(coords, attraction);
  new Attraction(attraction, marker, route);
};

window.zindex = 0;

function nextZIndex() {
  return window.zindex += 1;
}

var LAST_MARKER_CLICKED = 'set me!';
