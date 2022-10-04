$(document).ready(function() {
  $("textarea").on('input', function() {
    const numberOfWordsLeft = 140 - $(this).val().length;
    const counter = $(this).parent().find('.counter');
    counter.text(numberOfWordsLeft);
    if (numberOfWordsLeft < 0) {
      counter.css("color", "red")
    } else {
      counter.css("color", "#545149")
    }
  });
});