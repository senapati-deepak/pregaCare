$(document).ready(function() {
    // Defining the Login Feature.
    $("#com-form").submit(function(event) {
        event.preventDefault();
        var title = $("#title").val();
        var content = $("#content").val();
        $.post("/api/new_complaint", {title: title, content: content}, function(data) {
            console.log(data);
            swal("Complaint Filed!", "", "success");
            $("#title").val("");
            $("#content").val("");
        }); 
    });


});