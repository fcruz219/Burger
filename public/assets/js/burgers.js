$(function() {
    $(".change-eaten").on("click", function(event) { 
      event.preventDefault();
    var id = $(this).data("id");
    var uneaten= $(this).data("neweaten");
    console.log(id)
      console.log(uneaten)

    if (uneaten == true){
      uneaten == false
    }
    else {
      uneaten == true
    }

    var nowdevoured = {
      devoured: uneaten
    };
    console.log(nowdevoured)
    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: nowdevoured
    }).then(
      function() {
        console.log("Burger eaten");
        // Reload the page to get the updated list
        location.reload();
      }
    );
});
})