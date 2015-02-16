// $(document).ready(function(){
  var loadAttractionList = function(attraction, marker){

    var attractionInfo = ['<li id="attraction', attraction._id + '">',attraction.name,'</li>'].join('')

    $('#attraction-list').append(attractionInfo)
  }