/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
    // Loop through the tweets and append each one to the tweets container
    const $tweets = $('#tweets-box');
    $tweets.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      const date = new Date(tweet.created_at);
      $tweet.find('#postedDate').text(timeago.format(date));
      $tweets.prepend($tweet);
    }
}
  

const createTweetElement = function (data) {

    // Create tweet elements
    const $tweet = $('<article>').addClass('tweets');
    const $header = $('<div>').addClass('tweet-header');
    const $name = $('<div>').attr('id', 'name');
    const $avatar = $('<img>').attr('src', data.user.avatars);
    const $username = $('<h3>').text(data.user.name);
    const $handle = $('<h3>').text(data.user.handle);
    const $content = $('<p>').attr('id', 'tweet').text(data.content.text);
    const $footer = $('<div>').addClass('tweets-footer');
    const $date = $('<h6>').attr('id', 'postedDate').text('1 day ago');
    const $flag = $('<i>').addClass('fa-solid fa-flag');
    const $retweet = $('<i>').addClass('fa-solid fa-retweet');
    const $heart = $('<i>').addClass('fa-solid fa-heart');
  
    // Append elements to tweet
    $name.append($avatar, $username);
    $header.append($name, $handle);
    $footer.append($date, $flag, $retweet, $heart);
    $tweet.append($header, $content, $footer);
  
    // Return the tweet element
    return $tweet;
}

$(document).ready(function() {
    $("#submit-tweet").on("submit", function(event) {
        event.preventDefault();
        const tweetLength = $("#tweet-text").val().length;
        if (tweetLength === 0) {
          $(".errors#error-message-1").slideDown();
          setTimeout(() => {
            $(".errors#error-message-1").slideUp();
          }, 3000);
          return;
        } else if (tweetLength > 140) {
            $("#tweet-text").val("");
            $(".errors#error-message-2").slideDown();
            setTimeout(() => {
                $(".errors#error-message-2").slideUp();
            }, 3000);
            return;
        }
        const serializedData = $(this).serialize();
        $.post('/tweets', serializedData)
          .then(function() {
            // clear the textarea and reset the character counter
            $("#tweet-text").val("");
            $(".counter").text(140);
            loadTweets();
          })
          .catch(function(err) {
            console.log('Error posting tweet:', err);
          });
      });
  //load tweets on page load
  loadTweets();

  //function to load tweets
  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets)
      },
      error: function(xhr, status, error) {
        console.log(status + ": " + error);
      }
    });
  } 
});

