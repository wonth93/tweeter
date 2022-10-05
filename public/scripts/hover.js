$(document).ready(function() {
  // hover on and off the footer button
  $(".function").hover(function() {
    $(this).css('color', 'orange');
  }, function() {
    $(this).css('color', '#545149');
  })

  // hover on and off the tweet box; shadow effect
  $('.tweet-container').hover(function() {
    $(this).css('box-shadow', '5px 5px #888888');
  }, function() {
    $(this).css('box-shadow', 'none');
  })
});