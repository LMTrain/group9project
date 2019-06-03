
  // Initial array of items
  var items = ['Adapters', 'Allergy Medicines', 'Bandana', 'Barrettes', 'Belt', 'Blanket', 'Bobby Pins', 'Book', 'Camera', 'Carry-On', 'Charger', 'Comb', 'Deodorant', 'Duffel Bag', 'Ear Plugs', 'Electric Converters', 'E-reader', 'Eye Drops', 'Eye Mask', 'Face lotion with SPF', 'Face Wash', 'First Aid Kit', 'Flash Light', 'Fleece', 'Floss', 'Hair Brush', 'Hair Conditioner', 'Hair Shampoo', 'Hair Ties', 'Hand Sanitizer', 'Hat', 'Insect Repellent', 'iPad', 'Language Guides', 'Laptop', 'Laxative Medicines', 'Lip Balm', 'Maps', 'Moisturizer', 'Moleskin', 'Mouthwash', 'Nail clippers', 'Padlocks', 'Rain Jacket', 'Rolling Luggage', 'Scarf', 'Scissors', 'Shaving Kit', 'Shorts', 'Sleepwear', 'Socks', 'Sun Visor', 'Sunburn Relief', 'Sunglasses', 'Sunscreen', 'Thermometer', 'Toothbrush', 'Toothpaste', 'Travel Backpack', 'Travel Guides', 'Travel Pillow', 'Travel Towel', 'Tweezers', 'Umbrella', 'Underwear', 'Wheeled Backpack', 'Windbreaker'];

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

  var config = {
    apiKey: "AIzaSyAzNfLsyx0G7i0wRGEVn5vY65NPHSS2q4A",
    authDomain: "groupproject1-66056.firebaseapp.com",
    databaseURL: "https://groupproject1-66056.firebaseio.com/",
    projectId: "groupproject1-66056",
    storageBucket: "groupproject1-66056.appspot.com",
    messagingSenderId: "771982143498",
    appId: "1:771982143498:web:f5ed32150586ee6e"
};
firebase.initializeApp(config);
// puts the firebase into a variable
var database = firebase.database();


// Initial Values
var location = "";
var item = "";

$("#add-location").click(function (event) {
  event.preventDefault();

  var location = $("#location-input").val().trim();
  var item = $("#item-input").val().trim();
  
  var newItem = {
  location: location,
  item: item,
  
  };

  // Uploads train data to the database
  database.ref().push(newItem);
  
  $("#location-input").val("");
  $("#item-input").val("");
  
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var location = childSnapshot.val().name;
  var item = childSnapshot.val().role;

  var newRow = $("<tr>").append(
    $("<td>").text(location),
    $("<td>").text(item),
      
  );

  // Append the new row to the table
  $("table > tbody").append(newRow);
});