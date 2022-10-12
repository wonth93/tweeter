/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.


$(document).ready(function() {

  // load tweets from /tweets to home page
  const loadTweets = function() {
    
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(tweets) {
        renderTweets(tweets);
      },
    });

  }

  loadTweets();


  // Get all the tweets from a data file
  const renderTweets = function(tweets) {
    
    $('#tweet-container').empty();
    for (let i = tweets.length - 1; i >= 0; i--) {
      const $tweet = createTweetElement(tweets[i]);
      $('#tweet-container').append($tweet);
    }

    // hover on and off the footer button
    $(".function").hover(function() {
      $(this).css('color', 'orange');
    }, function() {
      $(this).css('color', '#545149');
    })
  
    // hover on and off the tweet box; shadow effect
    $('.tweet').hover(function() {
      $(this).css('box-shadow', '5px 5px #888888');
    }, function() {
      $(this).css('box-shadow', 'none');
    })

  }


  // Prevent XSS with Escaping
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  // Create tweet box element to index.html
  const createTweetElement = function(dataObj) {
    const $tweet = `<article class="tweet">
    <header class="user-info">
    <div>
      <img src='${dataObj.user.avatars}' class="icon"></img>
      <span>${dataObj.user.name}</span>
    </div>
    <span class="handle">${dataObj.user.handle}</span>
  </header>
  <p>${escape(dataObj.content.text)}</p>
  <footer>
    <span>${timeago.format(dataObj.created_at)}</span>
    <div>
      <button class="function">
        <i class="fa-solid fa-flag"></i>
      </button>
      <button class="function">
        <i class="fa-solid fa-retweet"></i>
      </button>
      <button class="function">
        <i class="fa-solid fa-heart"></i>
      </button>
    </div>
  </footer>
    </article>`

    return $tweet;
  }


  // Event listener for submit
  const $form = $('.tweeter-form');
  const errorMsgArea = $("#errorMsgArea");
  const error = $('#error');
  error.hide();
  $form.on('submit', function(event) {
    
    // Prevent default form submission behaviour
    event.preventDefault();

    // Serialize the form data
    const serializedData = $(event.target).serialize();
    
    // Condition validation
    const tweet = $(this).find('textarea');
    const tweetLength = tweet.val().length;

    if (tweetLength === 0) {
      error.slideUp();
      errorMsgArea.text('Please enter your tweet!');
      error.slideDown();
    } else if (tweetLength > 140) {
      error.slideUp();
      errorMsgArea.text('Your tweet is too long!')
      error.slideDown();
    } else {
      error.slideUp();
      $.post('/tweets', serializedData, function(response) {
        loadTweets();
      });
    }
    
  });

});