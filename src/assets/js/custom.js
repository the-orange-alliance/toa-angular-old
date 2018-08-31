$(function(){
  // Search function
  $("#showSearch").click(function(e) {
    e.preventDefault();
    $('#qnimate').addClass('popup-box-on');
    document.getElementById("ftc_search").focus();
  });

  $("#removeSearch").click(function (e) {
    e.preventDefault();
    $('#qnimate').removeClass('popup-box-on');
  });
});
