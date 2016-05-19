$(document).ready(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
    	$("#loc").html("");
        $("#error").append("Geolocation is not supported by this browser.");
    }
    $("#customsearch").on("click",function(){
    	$(".search").css("display","initial");
    	$("#searchtitle").html("");
    	$("#searchtitle").append("Custom Location Search");
    	$(".lead").html("");
    	$("#latitude").html("");
    	$("#longitude").html("");
    	$("#placelist").html("");
    });
    $("#search-btn").on("click",function(){
    	var loc=$("#search-box").val().trim();
    	$.ajax({
    	url:"/cgi-bin/artistatwork/search.py",
    	data:{"location":loc},
    	type:"POST",
    	success:function(data){
    		var json=JSON.parse(data);
				if(json["status"]!="OK")
				{
					$("#error").append("Location Not Found !! Please Try After Sometime!!");
				}
				else
				{
					var lat=json["results"][0]["geometry"]["location"]["lat"]
					var long=json["results"][0]["geometry"]["location"]["lng"]
					getData(lat,long);
				}	
    		}
    	});
	});
	$("#usersearch").on("click",function(){
		location.reload();
	});
});
function showPosition(position) {
	var lat=Cookies.get("latitude");
	var long=Cookies.get("longitude");
	if(lat==undefined || long==undefined){
    Cookies.set("latitude",position.coords.latitude);
    Cookies.set("longitude",position.coords.longitude);
    }
    getData(lat,long);
}
function getData(lat,long){
$("#latitude").html("");
$("#longitude").html("");
$("#latitude").append("<b>Latitude </b>"+lat);
$("#longitude").append("<b>Longitude </b>"+long);
$("#placelist").html("");
$('#myPleaseWait').modal('show');
    $.ajax({
    	url:"/cgi-bin/artistatwork/main.py",
    	data:{location:lat+","+long},
    	type:"POST",
    	success:function(data){
    		$('#myPleaseWait').modal('hide');
    		var json=JSON.parse(data)
    		if(json["status"]!="OK")
    		{
    			$("#error").append("Request To API Failed!! Please Try After Sometime!!");
    		}
    		else
    		{
    			$.each(json["results"],function(value){
    				$("#placelist").append("<a class='list-group-item m1' href='#id"+json["results"][value]["place_id"]+"'>"+json["results"][value]["name"]+"</a>");
    			});
    		}
    	}
    });
    $(document).on("click",'a[href^=#id]',function(){
    var id=String($(this).attr("href"))
    var placeid=id.substr(3)
    $('#myPleaseWait').modal('show');
    $.ajax({
    	url:"/cgi-bin/artistatwork/main1.py",
    	data:{"placeid":placeid},
    	type:"POST",
    	success:function(data){
    		$('#myPleaseWait').modal('hide');
    		$("#myModal").modal('show');
    		var json=JSON.parse(data);
    		$("#modtitle").html("");
    		$("#modtitle").append(json["result"]["name"]);
    		$("#modbody").html("");
    		$("#modbody").append('<p style="font-size: 14px;"><b>Address:- </b>'+json["result"]["formatted_address"]+'</p>');
    		$("#modbody").append('<p style="font-size: 14px;overflow:auto !important;"><b>Maps Url:- </b><a target=_blank href='+json["result"]["url"]+'>'+json["result"]["url"]+'</a></p>');
    		$("#modbody").append('<p style="font-size: 14px;"><b>Vicinity:- </b>'+json["result"]["vicinity"]+'</p>');
    		$("#modbody").append('<p style="font-size: 14px;"><b>Type of Place </b></p>');
    		$("#modbody").append('<img style="float:right;" src="'+json["result"]["icon"]+'"></img>');
    		$.each(json["result"]["types"],function(value){
    			$("#modbody").append('<p style="font-size: 14px;">'+toCamelCase(json["result"]["types"][value]).replace(/\_/g," ")+'</p>');
    		});
    	}
    });
    });
    $("#myModal").on("hidden.bs.modal", function(){
    	$("#modtitle").html("");
    	$("#modbody").html("");
    });
}
function toCamelCase(string) {
    return string.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}
