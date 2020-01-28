$(document).ready(function() {

  // animals search buttons array that will populate into the index.html
  var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbill", "pygmy goat", "chicken", "capybara", "teacup pif=g", "serval", "salamander", "frog"
  ];

  // function to make buttons from the array 'animals' and add them into the html
  function populateButtons(searchArray, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    // loop through the array and create a button for each index
    for(var i = 0; i < searchArray.length; i++){
      // modify the search array into buttons
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", searchArray[i]);
      a.text(searchArray[i]);
      $(areaToAddTo).append(a);
    }
  }

  // on click function for when you click on an animal search button
  $(document).on("click", ".searchButton", function() {
    $("#searches").empty();
    $(".searchButton").removeClass("active");
    $(this).addClass("active");

    // query the giphy API using my own API key
    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=CKcBl8dHqzcH6wRXHzuYB6y5H6hXI2Cm&limit=10";

    // ajax api call
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    // display gifs when an aminal is searched
    .then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        // variable for the div being modified
        var searchDiv = $("<div class=\"animal-item\">");

        // store the rating of the gifs
        var rating = results[i].rating;

        // paragraph tag to contain the rating
        var p = $("<p>").text("Rating: " + rating);

        // make the gifs still until they are clicked an they begin animation
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var animalImage = $("<img>");
        animalImage.attr("src", still);
        animalImage.attr("data-still", still);
        animalImage.attr("data-animate", animated);
        animalImage.attr("data-state", "still");
        animalImage.addClass("animal-image");

        searchDiv.append(p);
        searchDiv.append(animalImage);

        // append to searches div in the html
        $("#searches").append(searchDiv);
      }
    });
  });
  populateButtons(animals, "animal-button", "#searches");
});