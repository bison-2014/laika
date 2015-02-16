//= require polyline
var map;

var directionsService = new google.maps.DirectionsService();

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();

  var mapOptions = {
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
  directionsDisplay.setMap(map);
  route = new Route();
  route.calculateRoute();

}

//-------Route----------

var Route = function(){
  this.start = new google.maps.LatLng(33.520660,-86.80249), //Birmingham, AL
  this.end = new google.maps.LatLng(30.42130,-87.21691), //Pensacola, FL
  this.waypts = this.getWaypoints();
};

Route.prototype.getWaypoints = function(){
  var waypts = [];
  var checkboxArray = document.getElementById('waypoints');

  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected == true) {
      waypts.push({
        location: checkboxArray[i].value,
        stopover: true});
    }
  }

  return waypts;
};

Route.prototype.calculateRoute = function(){
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
    }
  });
};


Route.prototype.displayRoute = function(response, drawMe){
  drawMe = typeof drawMe !== 'undefined' ? drawMe : true;

  directionsDisplay.setDirections(response);

  if (drawMe) {
    drawer = new Drawer();
    drawer.draw(polygon.geoJson);
  };
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
    console.log(response)
    loadMarkers(response.attractions)
  })
}

//---------Draw-er---------------------
var Drawer = function(){}

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
  var coordsToDraw = this.createLatLongObjects(geoJsonObject)

    bufferedPolygon = new google.maps.Polygon({
    paths: coordsToDraw,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  bufferedPolygon.setMap(map);

}

//------------Markers----------------

function loadMarkers(attractions){
    $.each(attractions, function(i,item){
      loadMarker(item);
    });
  }

function loadMarker(attraction){

  var latitude = attraction.longlat.coordinates[1];
  var longitude = attraction.longlat.coordinates[0];
  var coords = new google.maps.LatLng(latitude, longitude);

  var marker = new google.maps.Marker({
    position: coords,
    map: map
  });

  new InfoBox(attraction, marker)
}

//-----------InfoBox----------------
var InfoBox = function(attraction, marker){
  console.log(attraction.yelp_categories);
  this.contentString ='<div>' +
                      '<p>' +
                      attraction.name +
                      '</p>' +
                      '<p> Interest Areas: ' +
                      attraction.yelp_categories[0][0] +
                      '</p>' +
                      '<p> Rating: ' +
                      attraction.rating +
                      '</p>' +
                      '<p> Number of Reviews: ' +
                      attraction.review_count +
                      '</p>' +
                      '</div>',
  this.popup = new google.maps.InfoWindow({content: this.contentString});
  this.addClickListener(marker)
}

InfoBox.prototype.addClickListener = function(marker){
  var myThis = this
  google.maps.event.addDomListener(marker, 'click', function(){
    myThis.popup.open(map, marker);
  });
}

//------------misc DOM operations-------------------

google.maps.event.addDomListener(window, 'load', initialize);

google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  });
