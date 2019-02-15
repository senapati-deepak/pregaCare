$(document).ready(function() {
    // Defining the Login Feature.
    $("#login").submit(function(event) {
        event.preventDefault();
        var uid = $("#username").val();
        var pwd = $("#password").val();
        var type = $("#type").val();
        $.post("/api/login", {userid: uid, password: pwd, type: type}, function(data) {
            console.log(data);
        });
    });
});