$(document).ready(function() {
  Trip = function(origin, destination, pitstop){
    this.origin = route.start
    this.destination = route.end
    this.pitstop = route.pitstop
    this.map_waypoints = route.waypts
    this.yelp_waypoints = App.Waypoints.getYelpData();

    console.log(this.map_waypoints)
  }

  $('#save-trip-button').click(function(event){
    event.preventDefault();
    console.log('button clicked')
    var trip = new Trip(route.start, route.end, route.pitstop, route.waypts, App.Waypoints);
    trip.save();
    console.log(trip);
  });

  Trip.prototype.save = function(){
      console.log('Saving this trip.')

      $.ajax({
        url: '/trips',
        type: 'post',
        beforeSend: function(xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name=csrf-token]').attr('content'))},
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(this)
      }).success(function(response) {
        $('#save-trip-button button').text("Trip saved");
      });
  };

});
