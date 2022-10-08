/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {

  const loadTweets = function() {
    
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(tweets) {
        renderTweets(tweets);
      }
    });

  }

  loadTweets();




  const renderTweets = function(tweets) {
    $('#tweet-container').empty();
    for (let i = tweets.length - 1; i >= 0; i--) {
      const $tweet = createTweetElement(tweets[i]);
      $('#tweet-container').append($tweet);
    }
  }




  const createTweetElement = function(dataObj) {
    const $tweet = `<article class="tweet">
    <header class="user-info">
    <div>
      <img src='${dataObj.user.avatars}' class="icon"></img>
      <span>${dataObj.user.name}</span>
    </div>
    <span class="handle">${dataObj.user.handle}</span>
  </header>
  <p>${dataObj.content.text}</p>
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




  const $form = $('.tweeter-form');
  $form.on('submit', function(event) {
    event.preventDefault();
    const serializedData = $(event.target).serialize();
    const tweet = $(this).find('textarea');
    const tweetLength = tweet.val().length
    

    if (tweetLength === 0) {
      alert('Please enter your tweet!');
    } else if (tweetLength > 140) {
      alert('The max length is 140');
    } else {
      $.post('/tweets', serializedData, function(response) {
        loadTweets();
      })
    }


  });
});










console.log('client.js is connected')