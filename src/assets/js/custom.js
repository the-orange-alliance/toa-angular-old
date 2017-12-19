/**
 * Created by Kyle Flynn on 5/29/2017.
 */
$(document).ready(function () {
  $("nav").find(".toggleable").on("click", "a", function () {
    $('.navbar-collapse.in').collapse('hide');
  });
});



/* FOR THE SEARCH FUNCTION */
$(function(){
  $("#showSearch").click(function(e) {
    e.preventDefault();
    $('#qnimate').addClass('popup-box-on');
    document.getElementById("ftc_search").focus();
  });

  $("#removeSearch").click(function (e) {
    e.preventDefault();
    $('#qnimate').removeClass('popup-box-on');
  });
})
