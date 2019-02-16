

$(document).ready(function() {
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
            swal("Event Created!", "", "success");
            $("#ename").val("");
            $("#content").val("");
            $("#sdate").val("");
            $("#stime").val("");
            $("#edate").val("");
            $("#etime").val("");
            $("#venue").val("");
        });
    });


});