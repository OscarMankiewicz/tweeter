$(document).ready(function() {
    $("#tweet-text").on('input', function () {
        //Counts the amount of times a key was inputted
        const charsCount = $(this).val().length

        //finds the counter element
        const counterElement = $(this).parent().find(".counter");
        const charsLeft = 140 - charsCount;

        //Change the color of the counter element when chars are below 140
        counterElement.text(charsLeft);

        if (charsLeft < 0) {
            counterElement.css('color', 'red')
        } else {
            counterElement.css('color', '#545149')
        }

        
    });
  });