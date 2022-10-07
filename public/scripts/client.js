/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.


$(document).ready(function() {

  const createTweetElement = function(dataObj) {
    const $tweet = `<article class="tweet">
    <header class="user-info">
    <div>
      <img src='${dataObj.user.avatars}' class="fa-solid fa-poo"></img>
      <span>${dataObj.user.name}</span>
    </div>
    <span class="handle">${dataObj.user.handle}</span>
  </header>
  <p>${dataObj.content.text}</p>
  <footer>
    <span>${dataObj.created_at}</span>
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




  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }
  
  const $tweet = createTweetElement(tweetData);
  $('#tweet-container').append($tweet);
  



});










console.log('connect!!')