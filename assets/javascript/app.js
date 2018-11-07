var topics = ["sink", "dog", "playstation", "gun", "whiskey", "flower"];
var queryURL = "";
var animal = "";
var singleTopic = "";

//create button function
function renderButtons() {
    $("#topics-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var b = $("<button>");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#topics-view").append(b);
    };
    $("button").on("click", function() {
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=1Ap9PRfNxbH1S8pDXRJkIkh2mwOKmiPR&limit=10";
        event.preventDefault();

        $.ajax({
            url: queryURL,
            method: "GET"
        })
          .then(function(response) {
              var results = response.data;

              for (var i = 0; i < results.length; i++) {
                  var gifDiv = $("<div1>");
                  var rating = results[i].rating;
                  var p = $("<p>").text("Rating: " + rating);
                  var animal = $("<img>");

                  animal.attr("src", results[i].images.original_still.url);
                  animal.attr("data-still", results[i].images.original_still.url);
                  animal.attr("data-animate", results[i].images.original.url)
                  animal.attr("data-state", "still");
                  animal.addClass("img-responsive center-block gif");

                  gifDiv.prepend(p);
                  gifDiv.prepend(animal);

                  $("#gif-pic").prepend(gifDiv);
                  $("#rating").html(response);
              }
              $("img").on("click", function() {
                  console.log("test");
                  var state = $(this).attr("data-state");
                  if(state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                  } else if (state === "animate") {
                      $(this).attr("src", $(this).attr("data-still"))
                      $(this).attr("data-state", "still");
                  }
              });
          })
    })
}

renderButtons();


$("#add-topic").on("click", function(event){
    event.preventDefault();
    var singleTopic = $("#topic-typed").val();
    topics.push(singleTopic);
    renderButtons();


   // event.preventDefault();
    
   //var singleTopic = $("#topic-typed").val();
 

   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        singleTopic + "&api_key=1Ap9PRfNxbH1S8pDXRJkIkh2mwOKmiPR&limit=10";
    
    $.ajax({
      url: queryURL,
      method: "GET"
    })
  
    .then(function(response) {
    var results = response.data;


    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div1>");

      var rating = results[i].rating;
      

      var p = $("<p>").text("Rating: " + rating);

      var animalImage = $("<img>");
      //animalImage.attr("src", results[i].images.fixed_height.url);
      animalImage.attr("src", results[i].images.original_still.url);
      animalImage.attr("data-still", results[i].images.original_still.url)
      animalImage.attr("data-animate", results[i].images.original.url)
      animalImage.attr("data-state", "still");
      animalImage.addClass("img-responsive center-block gif")


      gifDiv.prepend(p);
      gifDiv.prepend(animalImage);

      $("#gif-pic").prepend(gifDiv);
      $("#rating").html(response);
    }

      $("img").on("click", function() {
        console.log("test"); 
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-state", "still");
          }});
  
})
})
