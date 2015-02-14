      var directionsDisplay;
      var directionsService = new google.maps.DirectionsService();
      var map;
      var chicago; // = new google.maps.LatLng(41.850033, -87.6500523);

      function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer();

        var mapOptions = {
          zoom: 10,
          center: chicago
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        directionsDisplay.setMap(map);

        calcRoute();
      }

      function calcRoute() {
        // set up the request's start, end and travel mode
        var start = new google.maps.LatLng(41.953819, -87.654750); // Tac Quick
        var end = new google.maps.LatLng(41.866557, -87.606751); // adler planetarium
        var waypts = [];
        var checkboxArray = document.getElementById('waypoints');

        for (var i = 0; i < checkboxArray.length; i++) {
          if (checkboxArray.options[i].selected == true) {
            waypts.push({
              location:checkboxArray[i].value,
              stopover:true});
          }
        }

        var request = {
          origin: start,
          destination: end,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING
        };

        //call .route() on the directionsService, which requests the directions. passing it request and callback function
        directionsService.route(request, function(response, status){
          console.log(response)

          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        });
      }

      //set an event listener on the window so that initialize() is called on load

      google.maps.event.addDomListener(window, 'load', initialize);

