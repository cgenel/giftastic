$(document).ready(function() {

  // animals search buttons array that will populate into the index.html
  var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbill", "pygmy goat", "chicken", "capybara", "teacup pif=g", "serval", "salamander", "frog"
  ];

  // function to make buttons from the array 'animals' and add them into the html
  function populateButtons(searchArray, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for(var i = 0; i < searchArray.length; i++){
      // modify the search array into buttons
      var a = $("<button");
      a.addClass(classToAdd);
      a.attr("data-type", searchArray[i]);
      a.text(searchArray[i]);
      $(areaToAddTo).append(a);
    }
  }

  // 
  $(document).on("click", ".searchbutton", function() {
    $("#animals").empty();
    $(".searchButton").removeClass("active");
    $(this).addClass("active");

    // query the giphy API using my own API key
    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "CKcBl8dHqzcH6wRXHzuYB6y5H6hXI2Cm";
  })

});