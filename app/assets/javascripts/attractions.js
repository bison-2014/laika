$(document).ready(function(){

 // var token = $( 'meta[name="csrf-token"]' ).attr( 'content' );

 // $.ajaxSetup( {
 //  headers: {'X-CSRF-Token', token };
 // });



  $('#add-attraction').click(function(event){
    event.preventDefault();

    console.log("YOU PUSHED IT");

    // var url = $(this).attr('href');
    // console.log(url)

    // $.ajax({
    //   url: url,
    //   type: "post",
    //   data: {},
    //   dataType: 'json',
    //   success: function(response) {
    //     console.log(response)
    //   },
    //   complete: function(response) {
    //     console.log(response)
    //   }
    // });

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