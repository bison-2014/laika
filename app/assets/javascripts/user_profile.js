$(document).ready(function(){
  $('body').on("click", ".category-main-name", function(){
      $(this).find('.subcategory-names').slideToggle('slow');
      $('.la').removeClass('fa-caret-down').addClass('fa-caret-right');
      $(this).find('.la').removeClass('fa-caret-right').addClass('fa-caret-down');
  })
})
