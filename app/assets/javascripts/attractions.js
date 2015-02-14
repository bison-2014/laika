$(document).ready(function(){

  $('#add-attraction').click(function(event){
    event.preventDefault();

    var url = $(this).attr('href');

    $.ajax({
      url: url,
      type: "get",
      beforeSend: function(xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name=csrf-token]').attr('content'))},
      dataType: 'json'
    }).done(function(data){
        console.log(data)
        loadMarkers(data)
    });

  });

});


function loadMarkers(markerObjects){

  console.log("loaging markerObjects...")

    // loop all the markerObjects
    $.each(markerObjects, function(i,item){
      // add marker to map
      loadMarker(item);
    });
  }

function loadMarker(markerObject){
  // grab the lat and long
  var latitude = markerObject.latitude;
  var longitude = markerObject.longitude;
  var coords = new google.maps.LatLng(latitude, longitude)

  var marker = new google.maps.Marker({
    position: coords,
    map: map
  });
}