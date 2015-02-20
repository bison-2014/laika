//= require polyline



//-------

var directionsService = new google.maps.DirectionsService();

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();

  mapObject = new MapObject();

  directionsDisplay.setMap(mapObject.map);

  route = new Route(START, END);
}



var MapObject = function(){
  this.mapOptions = {
    styles: styles,
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map = new google.maps.Map(document.getElementById('map_canvas'), this.mapOptions);

  this.drawer = new Drawer();
}

//-------Route----------

var Route = function(start, end, waypts){
  this.start = start;
  this.end = end;
  this.waypts = waypts || [];

  this.calculateRoute();
}

Route.prototype.calculateRoute = function(){
  var waypts = []
  if (PITSTOP) {
    waypts.push({
        location: PITSTOP,
        stopover: true,
    })
  }

  App.Waypoints.items.forEach(function(waypoint) {
    var lng = waypoint.attrData.longlat.coordinates[0];
    var lat = waypoint.attrData.longlat.coordinates[1];
    var coords = new google.maps.LatLng(lat, lng);

    waypts.push({
        location: coords,
        stopover: true,
    });
  });
  this.waypts = waypts;

  var request = {
    origin: this.start,
    destination: this.end,
    waypoints: this.waypts,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  };


  directionsService.route(request, function(response, status){
    if (status == google.maps.DirectionsStatus.OK) {

      decoder = new PolylineDecoder()
      route.polyline = decoder.decodePolyline(response);
      polygon = new Polygon(route.polyline)
            route.displayRoute(response, true)

      var distance = 0;
      var duration = 0;
      response.routes[0].legs.forEach(function(leg) {
        distance += leg.distance.value;
        duration += leg.duration.value;
      });

      $('#distance-counter').text(Math.round(distance / 1609.34) + " miles")

      $('#duration-counter').text(parseInt(duration / 3600) + " hrs " + parseInt((duration % 3600) / 60) + " mins")
    }
  });
};


Route.prototype.displayRoute = function(response){
  directionsDisplay.setDirections(response);
}

Route.prototype.addWaypoint = function(attraction) {
  App.Waypoints.items.push(attraction);
  attraction.marker.marker.setMap(null)
  route.calculateRoute();
}

Route.prototype.removeWaypoint = function(attraction) {
    var index = App.Waypoints.items.indexOf(attraction);
    if (index >= 0) {
      App.Waypoints.items.splice(index, 1);
      route.calculateRoute();
    }
}

//----polyline decoder-----

var PolylineDecoder = function(response){}

PolylineDecoder.prototype.decodePolyline = function(response){
  var coord_array = polyline.decode(response.routes[0].overview_polyline);
  return coord_array.map(function(coordinate) {
    return [coordinate[1], coordinate[0]];
  })
}

//-------Polygon!------------

var Polygon = function(polyline){
  this.geoJson = this.createGeoJsonFromPolyline(polyline)

  this.searchWithin(this.geoJson)

  mapObject.drawer.draw(this.geoJson);
}

Polygon.prototype.createGeoJsonFromPolyline = function(polyline) {
  var line = {
    type:"Feature",
    geometry:{
      type:"LineString",
      coordinates: polyline
     }
   }

  var polygon = turf.buffer(line, 25, 'miles')
  return polygon
}

Polygon.prototype.searchWithin = function(polygon){
  $.ajax({
    url: '/maps/search',
    type: 'post',
    beforeSend: function(xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name=csrf-token]').attr('content'))},
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(polygon),
})
  .success(function(response){
    App.AttractionCollection.add(response.attractions);
  })
}

//---------Draw-er---------------------
var Drawer = function(){
  this.bufferedPolygon = new google.maps.Polygon({});
}

Drawer.prototype.createLatLongObjects = function(geoJsonObject){
  var latLongArray = []
  var coordArray = geoJsonObject.features[0].geometry.coordinates[0]

  coordArray.forEach(function(coord){
    latLongArray.push(new google.maps.LatLng(coord[1], coord[0]))
    return latLongArray
  })

  return latLongArray
}

Drawer.prototype.draw = function(geoJsonObject){
  var coordsToDraw = this.createLatLongObjects(geoJsonObject);

  this.bufferedPolygon.setMap(null);

    this.bufferedPolygon = new google.maps.Polygon({
      paths: coordsToDraw,
      strokeColor: '#49a789',
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: '#49a789',
      fillOpacity: 0.35
  });

  this.bufferedPolygon.setMap(mapObject.map);

}


//------------Markers----------------

// function loadMarkers(attractions){
//     $.each(attractions, function(i,item){
//       loadMarker(item);
//     });
//   }

// function loadMarker(attraction){

//   var latitude = attraction.longlat.coordinates[1];
//   var longitude = attraction.longlat.coordinates[0];
//   var coords = new google.maps.LatLng(latitude, longitude);

//   var marker = new google.maps.Marker({
//     position: coords,
//     map: mapObject.map
//   });

//   // new InfoBox(attraction, marker)
//   new Attraction(attraction, marker, route)
// }

//-----------InfoBox----------------

// var InfoBox = function(attraction, marker){
//   this.contentString ='<div>' +
//                       '<p>' +
//                       attraction.name +
//                       '</p>' +
//                       '<p> Interest Areas: ' +
//                       attraction.yelp_categories[0][0] +
//                       '</p>' +
//                       '<p> Rating: ' +
//                       attraction.rating +
//                       '</p>' +
//                       '<p> Number of Reviews: ' +
//                       attraction.review_count +
//                       '</p>' +
//                       '</div>',
//   this.popup = new google.maps.InfoWindow({content: this.contentString});
//   this.addClickListener(marker)
// }

// InfoBox.prototype.addClickListener = function(marker){
//   var myThis = this
//   google.maps.event.addDomListener(marker, 'click', function(){
//     myThis.popup.open(mapObject.map, marker);
//   });
// }

//------------misc DOM operations-------------------

google.maps.event.addDomListener(window, 'load', initialize);

google.maps.event.addDomListener(window, "resize", function() {
    var center = mapObject.map.getCenter();
    google.maps.event.trigger(mapObject.map, "resize");
    mapObject.map.setCenter(center);
  });
