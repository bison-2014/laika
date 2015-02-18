var Attraction = function(attraction, marker, route){
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
  var $attractionInfo = $(this.buildAttractionInfo());

  $attractionInfo.data('attraction', this);

  $('#attraction-list').append($attractionInfo);
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
          '" class="add-button">Add to Trip</button>',
          '</li>'
         ].join('');

  return item;
}

Attraction.prototype.setListeners = function(){
  var thisAttraction = this


  $('#attraction-list').on('click', '#attraction' + this.attraction._id, function(event){
    event.preventDefault();
    thisAttraction.setListInteraction();
  })
}


Attraction.prototype.setListInteraction = function(){
  var listItem = $('#attraction' + this.attraction._id);
  $('#attraction-list').prepend(listItem);
}

Attraction.prototype.setAsWaypoint = function(){

  var lng = this.attraction.longlat.coordinates[0]
  var lat = this.attraction.longlat.coordinates[1]
  var coords = new google.maps.LatLng(lat, lng)

  this.route.waypts.push({
        location: coords,
        stopover: true});

  this.route.calculateRoute();
}

$(function() {
  $('#attraction-list').on('click', '.add-button', function(event){
    event.preventDefault();

    var thisAttraction = $(this).closest("li").data("attraction");
    thisAttraction.setAsWaypoint();
  });

});
