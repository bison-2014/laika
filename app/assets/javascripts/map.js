//= require polyline

      var directionsDisplay;
      var directionsService = new google.maps.DirectionsService();
      var map;

      function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer();

        var mapOptions = {
          // optional zoom and center
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        directionsDisplay.setMap(map);

        calcRoute();
      }

      function calcRoute() {

        var start = new google.maps.LatLng(41.953819, -87.654750); // Chicago
        var end = new google.maps.LatLng(38.637548, -90.205010); // St. Louis
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
          // console.log(response)

          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);

            //return response
            // retrieve the polyline
            // console.log(decodePolyline(response));
            var polyline = decodePolyline(response);
            createPolygonFromPolyline(polyline);
          }
        });
      }



      function decodePolyline(response) {
        var coord_array = polyline.decode(response.routes[0].overview_polyline);
        return coord_array.map(function(coordinate) {
          return [coordinate[1], coordinate[0]];
        })
      }

      function createPolygonFromPolyline(polyline) {
        var line = {
            type:"Feature",
            geometry:{
             type:"Polygon",
             coordinates: polyline,
           },
           properties:{}
         }
        var polygon = turf.buffer(line, 25, 'miles')

        $.ajax({
          url: '/maps/search',
          type: 'post',
          beforeSend: function(xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name=csrf-token]').attr('content'))},
          data: polygon
        })
        .done(function(){
          console.log("done!!!")
        })

      }



      //set an event listener on the window so that initialize() is called on load

      google.maps.event.addDomListener(window, 'load', initialize);

