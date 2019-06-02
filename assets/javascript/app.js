
  // Initial array of items
  var items = ['Backpack', 'ipad', "iPhone",'HP Laptop', 'Helmet', 'Loveseats', 'Coffee Table', 'Futons', 'Book Case', 'Bikes', 'Chess Game', 'Toy Cars', 'Puzzle Board', 'TV Stands'];

  // displayitemInfo function re-renders the HTML to display the appropriate content
  function displayitemInfo() {

    var item = $(this).attr("data-name");
    var queryURL = "assets/javascript/get_response.php?query="+item;
    // var queryURL = "http://api.walmartlabs.com/v1/items/206672856?apiKey=vng9pukufs97mcyyjs5ps266";
    // Creating an AJAX call for the specific item button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Creating a div to hold the item
      console.log(response);
        var results = JSON.parse(response).items;
        
       
        $("#items-view").empty();

        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var itemDiv = $("<div class='item'>");                        
            var p = $("<p>").text("$" + results[i].salePrice);  
            var pN = $("<p>").text(results[i].name);                    
            var image = $("<img>");
            var cR = $("<p>").text("Ratings: " + results[i].customerRating);
            image.attr("src", results[i].thumbnailImage); 
            image.attr("data-still", results[i].thumbnailImage);
            // image.attr("data-animate", results[i].images.fixed_height_downsampled.url);
            image.attr("data-state", "still");
            image.on("click", function () {          
             
            });
            itemDiv.append(pN);              
            itemDiv.append(p);     
            itemDiv.append(image);
            itemDiv.append(cR);            
            $("#items-view").prepend(itemDiv);
        }      
    });
  }
  // Function for displaying item data
  function renderButtons() {

    
    $("#buttons-view").empty();

    // Looping through the array of items
    for (var i = 0; i < items.length; i++) {
      
      var a = $("<button>");      
      a.addClass("item-btn");      
      a.attr("data-name", items[i]);      
      a.text(items[i]);     
      $("#buttons-view").append(a);
    }
  }

  
  $("#add-item").on("click", function(event) {
    event.preventDefault();
    
    var item = $("#item-input").val().trim();
    items.push(item);
   
    renderButtons();
    // Clear the textbox when done
    $("#item-input").val("");
  });
  
  $(document).on("click", ".item-btn", displayitemInfo);
 
  renderButtons();
