// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require_tree .

$( document ).ready(function() {
  $(function(){ $(document).foundation(); });

  $("body").on("click", ".add_waypoint a", function(event){
    event.preventDefault();

    $("#new_waypoint").show();
    $(".add_waypoint a").hide();
  });

  $("body").on("click", "#close_waypoint", function(event){
    event.preventDefault();
    $("#new_waypoint").hide();
    $("#new_waypoint input").val(null);
    $(".add_waypoint a").show();
  });

  $("body").on("click", "#close_waypoint", function(event){
    event.preventDefault();
    $("#new_waypoint").hide();
    $("#new_waypoint input").val(null);
    $(".add_waypoint a").show();
  });

  $("body").on("click", ".login", function(event){
    event.preventDefault();
    $(".get_route").hide();
    $(".signup_form").hide();
    $(".login_form").show();
  });

  $("body").on("click", ".signup", function(event){
    event.preventDefault();
    $(".get_route").hide();
    $(".login_form").hide();
    $(".signup_form").show();
  });

});