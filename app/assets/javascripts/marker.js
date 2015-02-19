var MarkerObject = function(coords, associatedAttraction){
  this.defaultIcon = '/red-dot.png';

  this.marker = new google.maps.Marker({
    position: coords,
    map: mapObject.map,
    zIndex: nextZIndex(),
    icon: this.defaultIcon
  });

  this.associatedAttraction = associatedAttraction;
  this.listenForUserInteraction();
};

MarkerObject.prototype.listenForUserInteraction = function(){
  var markerObject = this;
  // var thisAttraction = thisMarker.associatedAttraction;

  google.maps.event.addListener(markerObject.marker, 'click', function() {

    // Send a callback to the attraction object that this marker has been clicked
    markerObject.associatedAttraction.onMarkerClicked();

    // Change the marker color
    markerObject.changeMarkerColor();
  });
};

MarkerObject.prototype.changeMarkerColor = function(){

  if (typeof LAST_MARKER_CLICKED !== 'string') {
    LAST_MARKER_CLICKED.marker.setIcon('/red-dot.png');
  };

  LAST_MARKER_CLICKED = this;

  this.marker.setIcon('/purple-dot.png');
  this.marker.setZIndex(nextZIndex());
};

window.zindex = 0;

function nextZIndex() {
  return window.zindex += 1;
}

var LAST_MARKER_CLICKED = 'Set me!';
