//= require polyline



//-------

var directionsService = new google.maps.DirectionsService();

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();

  mapObject = new MapObject();

  directionsDisplay.setMap(mapObject.map);

  route = new Route(START, END, PITSTOP);
}

var MapObject = function(){
  this.mapOptions = {
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map = new google.maps.Map(document.getElementById('map_canvas'), this.mapOptions);

  this.drawer = new Drawer();
}

//-------Route----------

var Route = function(start, end, waypts){
  this.start = start; // birmingham
  this.end = end; // pensacola
  this.waypts = waypts || [];

  this.calculateRoute();
}

Route.prototype.calculateRoute = function(){
  var request = {
    origin: this.start,
    destination: this.end,
    waypoints: this.pitstop,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(response, status){
    if (status == google.maps.DirectionsStatus.OK) {

      decoder = new PolylineDecoder()
      route.polyline = decoder.decodePolyline(response);
      polygon = new Polygon(route.polyline)
      route.displayRoute(response, true)
    }
  });
};


Route.prototype.displayRoute = function(response){
  directionsDisplay.setDirections(response);
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
    markerCollection = new MarkerCollection(response.attractions);
    markerCollection.loadMarkers()
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
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
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
