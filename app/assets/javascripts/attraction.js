var App = App || {};
App.Waypoints = App.Waypoints || { items: [] }

App.Attraction = function(attrData){
  this.attrData = attrData;
  this.init();
}

App.Attraction.prototype.init = function(){
  this.createMarker()
  this.createListItem();
}

App.Attraction.prototype.createMarker = function() {
  var latitude = this.attrData.longlat.coordinates[1];
  var longitude = this.attrData.longlat.coordinates[0];
  var coords = new google.maps.LatLng(latitude, longitude);

  this.marker = new MarkerObject(coords, this);
}

App.Attraction.prototype.createListItem = function() {
    // contruct the li
    this.$listItem = $(this.buildListItem());

    // apend to the end of the list
    $('#attraction-list').append(this.$listItem);

    this.setListItemListeners();
  }

App.Attraction.prototype.buildListItem = function() {

  var li = $('<li>' + this.attrData.name + "</li>")
  var add_button = $('<button class="add-button">Add to Trip</button>')
  var close_button = $('<button class="remove-button">X</button>')

  return li.append(add_button).append(close_button)
}

App.Attraction.prototype.setListItemListeners = function(){
  var self = this;

  // Set a listener that will handle list item clicks
  $(this.$listItem).on('click', function(event){
    event.preventDefault();

    $('li.active').removeClass('active')
    self.$listItem.addClass('active')
  });

  // Set a listener that will handle list item "add button "
  $(this.$listItem).on('click', '.add-button', function(event) {
    event.preventDefault();

    self.$listItem.addClass('saved')
    route.addWaypoint(self);
  });

  // Set a listener that will handle list item "add button "
  $(this.$listItem).on('click', '.remove-button', function(event) {
    event.preventDefault();

    // hide DOM element
    self.$listItem.hide();

    // hide marker object's marker
    self.marker.marker.setMap(null);

    // find index of the attraction if it is saved as a waypoint
    route.removeWaypoint(self);
  });
}

App.Attraction.prototype.onMarkerClicked = function() {
  // move the list item to top
  this.$listItem.remove();
  $('#attraction-list').prepend(this.$listItem);
  this.setListItemListeners()

  // set clicked list-item to active state
  $('li.active').removeClass('active')
  this.$listItem.addClass('active')
  // this.$listItem.css('background-color', 'purple')
}

App.Waypoints.getYelpData = function() {
  yelps = [];
  for(var i=0; i < this.items.length; ++i ) {
    yelps.push(this.items[i].attrData);
  }
  return yelps;
}

// $(function() {
//   $('#attraction-list').on('click', '.add-button', function(event){
//     event.preventDefault();

//     var thisAttraction = $(this).closest("li").data("attraction");
//     thisAttraction.setAsWaypoint();
//   });

// });
