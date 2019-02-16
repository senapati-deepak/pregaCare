$(document).ready(function() {
    // Defining the Login Feature.
    $("#com-form").submit(function(event) {
        event.preventDefault();
        var title = $("#title").val();
        var content = $("#content").val();
        $.post("/api/new_complaint", {title: title, content: content}, function(data) {
            console.log(data);
            alert("Complaint Filed!");
            location.reload();
        });
    });


});