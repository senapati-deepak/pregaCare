$(document).ready(function() {
    // Defining the Login Feature.
    $("#eve-form").submit(function(event) {
        event.preventDefault();
        var name = $("#ename").val();
        var content = $("#content").val();
        var startDate = $("#sdate").val();
        var startTime = $("#stime").val();
        var endDate = $("#edate").val();
        var endTime = $("#etime").val();
        var venue = $("#venue").val();
        $.post("/api/create_event",  {name: name, venue: venue, content: content, startDate: startDate, startTime: startTime, endDate: endDate, endTime: endTime }, function(data) {
            console.log(data);
            alert("Event Created!");
            location.reload();
        });
    });


});