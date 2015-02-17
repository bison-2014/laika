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
        loadMarkers(data)
    });

  });

});


function loadMarkers(markerObjects){

    $.each(markerObjects, function(i,item){
      loadMarker(item);
    });
  }

function loadMarker(markerObject){

  var latitude = markerObject.longlat.coordinates[1];
  var longitude = markerObject.longlat.coordinates[0];
  var coords = new google.maps.LatLng(latitude, longitude)

  var marker = new google.maps.Marker({
    position: coords,
    map: map
  });
}