$(document).ready(function() {

  // animals search buttons array that will populate into the index.html
  var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbill", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"
  ];

  // function to make buttons from the array 'animals' and add them into the html
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();


    // loop through the array and create a button for each index
    for (var i = 0; i < arrayToUse.length; i++) {
      // modify the search array into buttons
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }
  // on click function for when you click on an animal search button
  $(document).on("click", ".animal-button", function() {
    $("#animals").empty();
    $(".animal-button").removeClass("active");
    $(this).addClass("active");

    // query the giphy API using my own API key
    var type = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=CKcBl8dHqzcH6wRXHzuYB6y5H6hXI2Cm&limit=10";

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
        var animalDiv = $("<div class=\"animal-item\">");

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

        animalDiv.append(p);
        animalDiv.append(animalImage);

        // append to searches div in the html
        $("#animals").append(animalDiv);
      }
    });
});

// changing the animated state of the gif on/off by clicking
$(document).on("click", ".animal-image", function() {

  // declaring the state
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

// add animal buttons when you submit a search
$("#add-animal").on("click", function(event) {
  event.preventDefault();

  // new animal being created
  var newAnimal = $("input").eq(0).val();

  // add new search to the array
  if (newAnimal.length > 2) {
    animals.push(newAnimal);
  }

  // populate the buttons from the array into the html
  populateButtons(animals, "animal-button", "#animal-buttons");
  return false;
});

populateButtons(animals, "animal-button", "#animal-buttons");
});
