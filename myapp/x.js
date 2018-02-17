window.onload = function() {
	//canvas initialization
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	//dimensions
	var W = canvas.width;
	var H = canvas.height;
	//Variables
	var degrees = 0;
	var new_degrees = 0;
	var difference = 0;
	var color = "blue"; //green looks better to me
	var bgcolor = "#222";
	var text;
	var animation_loop, redraw_loop;
  //speed data from server
  var speed;
  var avgSpeed;
  var distance;
  var throttlePosition;

	function init() {
		//Clear the canvas everytime a chart is drawn
		ctx.clearRect(0, 0, W, H);
		//Background 360 degree arc
		ctx.beginPath();
		ctx.strokeStyle = bgcolor;
		ctx.lineWidth = 30;
		ctx.arc(W / 2, H / 2, 200, Math.PI, 2 * Math.PI, false); //you can see the arc now
		ctx.stroke();
		//gauge will be a simple arc
		//Angle in radians = angle in degrees * PI / 180
		var radians = degrees * Math.PI / 180;
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = 30;
		//The arc starts from the rightmost end. If we deduct 90 degrees from the angles
		//the arc will start from the topmost end
		ctx.arc(W / 2, H / 2, 200, Math.PI, radians + Math.PI, false);
		//you can see the arc now
		ctx.stroke();
		//Lets add the text
		ctx.fillStyle = color;
		ctx.font = "50px bebas";
		text = Math.floor(degrees / 180 * 100) + "%";
		//Lets center the text
		//deducting half of text width from position x
		text_width = ctx.measureText(text).width;
		//adding manual value to position y since the height of the text cannot
		//be measured easily. There are hacks but we will keep it manual for now.
		ctx.fillText(text, W / 2 - text_width / 2, H / 2 + 15);
	}

	function draw() {
		//Cancel any movement animation if a new chart is requested
		if (typeof animation_loop != undefined)
      clearInterval(animation_loop);
		//random degree from 0 to 360

    new_degrees = Math.round(Math.random() * 180);

    //connect to the server and get the data to be shown
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(JSON.parse(this.response)["speed"])

          tmpstr  ="";
          tmpstr += "Speed = "+ JSON.parse(this.responseText).speed;
          tmpstr += "<br>Average Speed = "+ JSON.parse(this.responseText).avgSpeed;
          tmpstr += "<br>Distance= "+ JSON.parse(this.responseText).distance;
          tmpstr += "<br>throttlePosition = "+ JSON.parse(this.responseText).throttlePosition;
          document.getElementById('demo').innerHTML = tmpstr;
        }
    };
    xmlhttp.open("GET", "http://127.0.0.1:8000/lastNeferaReadings/", true);
    xmlhttp.send();






		difference = new_degrees - degrees;
		//This will animate the gauge to new positions
		//The animation will take 1 second
		//time for each frame is 1sec / difference in degrees
		animation_loop = setInterval(animate_to, 1000 / difference);
	}
	//function to make the chart move to new degrees
	function animate_to() {
		//clear animation loop if degrees reaches to new_degrees
		if (degrees == new_degrees)
			clearInterval(animation_loop);
		if (degrees < new_degrees)
			degrees++;
		else
			degrees--;
		init();
	}
	//Lets add some animation for fun
	draw();
	redraw_loop = setInterval(draw, 2000); //Draw a new chart every 2 seconds

}
