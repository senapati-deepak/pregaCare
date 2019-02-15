$(document).ready(function () {

    console.log("page loaded");

    var message ;

    navigator.geolocation.getCurrentPosition(function (position) {

        console.log("here");
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        message = "The following patient is in an emergency\nName : Maitree \nContact : 876542087 \nAddress : Plot 35 , Surya Nagar";
        message = encodeURI(message);
    });
    $("#notification-btn").click(function () {
         console.log("http://api.msg91.com/api/sendhttp.php?sender=MSGIND&route=4&mobiles=7008996005&authkey=232467ACIKcpWuJmw5b7820fa&country=91&message=" + message);
         $.get("http://api.msg91.com/api/sendhttp.php?sender=MSGIND&route=4&mobiles=7008996005&authkey=232467ACIKcpWuJmw5b7820fa&country=91&message=" + message , function (data, status) {
             alert("Successfully submited");
             console.log("data : " + data);
             console.log("status : " + status);
         }); 
    });
});