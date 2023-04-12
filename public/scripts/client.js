/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function (tweets) {
    // Loop through the tweets and append each one to the tweets container
    const $tweets = $('#tweets');
    $tweets.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweet.find('#postedDate').text(timeago.format(tweet.created_at));
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
    const $form = $('#tweet-form');

  $form.submit(function(event) {
    event.preventDefault();

    const $textarea = $form.find('textarea');

    if ($('#tweet-text').val() === '' || null) {
        appendError('You cannot post a blank tweet');
    } else if ($('#tweet-text').val().length > 140) {
        appendError('Your tweet is too long!');
    };

    // Submit the form via AJAX
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $form.serialize(),
      success: function(response) {
        loadTweets(renderTweets);
        $textarea.val(''); 
      },
      error: function(xhr, status, error) {
        console.error(status + ': ' + error);
      }
    });
  });

  //function to load tweets
  function loadTweets() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(tweets) {
        console.log(tweets);
        const $tweets = $('#tweets');
        $tweets.empty();
        for (const tweet of tweets) {
          const $tweet = createTweetElement(tweet);
          $tweet.find('#postedDate').text(timeago.format(tweet.created_at));
          $tweets.prepend($tweet);
        }
      },
      error: function(xhr, status, error) {
        console.error(status + ": " + error);
      }
    });
  }

    loadTweets();
});