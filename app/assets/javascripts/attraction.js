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


  var li = $('<li><span class="small-6 columns attr_name">' + this.attrData.name + '<p><strong> ' + this.attrData.yelp_categories[0][0] + '</strong><br>' + this.attrData.city + ', ' + this.attrData.state + ' | Yelp Rating: ' + this.attrData.rating + '</p>' +'</span></li>')
  var add_button = $('<span class="add-button"><i class="fa fa-plus"></i> Add to Trip</span>')
  var close_button = $('<span class="remove-button">X</span><br><br>')

  return li.append(add_button).append(close_button)
}

App.Attraction.prototype.setListItemListeners = function(){
  var self = this;

  // Set a listener that will handle list item clicks
  $(this.$listItem).on('click', function(event){
    event.preventDefault();

    $('li.active').removeClass('active')
    self.$listItem.addClass('active')

    // move map marker and color marker
    mapObject.map.panTo(self.marker.marker.getPosition());
    self.marker.changeMarkerColor();
  });

  // Set a listener that will handle list item "add button "
  $(this.$listItem).on('click', '.add-button', function(event) {
    event.preventDefault();

    self.$listItem.find('.add-button').text('Stop Saved').removeClass('add-button')
    self.$listItem.removeClass('active').addClass('saved')
    route.addWaypoint(self);
  });

  // Set a listener that will handle list item "add button "
  $(this.$listItem).on('click', '.remove-button', function(event) {
    event.preventDefault();

    // hide DOM element
    self.$listItem.hide(400);

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
