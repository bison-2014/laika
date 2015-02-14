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
    });

  });

});


// function loadMarkers(){

//   console.log("loaging markers...")

//   // load marker jSon data
//   $.getJSON(markerFile, function(data) {

//     // loop all the markers
//     $.each(data.markers, function(i,item){

//       // add marker to map
//       loadMarker(item);
//       });
//     });
//   }

// function loadMarker(markerData){
//   // parse through the
// }