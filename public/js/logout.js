$(document).ready(function() {
    // Defining the Login Feature.
    $("#logout-btn").on("click", function(event) {
        event.preventDefault();
        $.get("/api/logout", function(data, status) {
            console.log(data);
            location.href = "/";
        });
    });


});