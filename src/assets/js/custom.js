/**
 * Created by Kyle Flynn on 5/29/2017.
 */
$(document).ready(function () {
  $("nav").find(".toggleable").on("click", "a", function () {
    $('.navbar-collapse.in').collapse('hide');
  });
});