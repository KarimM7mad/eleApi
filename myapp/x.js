window.onload = function() {
	//canvas initialization
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	//dimensions
	var W = canvas.width;
	var H = canvas.height;
	//Variables
	var speed = 0;
	var new_speed = 0;
	var speedChange = 0;
	var color = "green"; //green looks better to me
	var bgcolor = "#222";
	var text;
	var animation_loop, redraw_loop;
	//speed data from
	var avgSpeed;
	var distancee;
	var throttlePosition;

	function init() {
		//Clear the canvas everytime a chart is drawn
		ctx.clearRect(0, 0, W, H);
    //Lets add the text
    ctx.fillStyle = color;
    ctx.font = "30px bebas";
    if (speed >= 0 && speed <= 180) {
      text = speed + "km/hr";
      if (speed > 120 && speed < 170) {
        color = "green";
      } else if (speed > 170) {
        color = "yellow";
      }
    } else if (speed > 180) {
      text = "MAX km/hr";
      color = "red";
    } else {
      text = "0 km/hr";
    }
    //Lets center the text
    //deducting half of text width from position x
    text2 = "\nAverage Speed = "+avgSpeed+" km/hr";
    text3 = "\nDistance = "+distancee+" km";
    text4 = "\nthrottlePosition = "+throttlePosition+" n";

    text_width = ctx.measureText(text).width;
    text_width2 = ctx.measureText(text2).width;
    text_width3 = ctx.measureText(text3).width;
    text_width4 = ctx.measureText(text4).width;


    //adding manual value to position y since the height of the text cannot
    //be measured easily. There are hacks but we will keep it manual for now.
    ctx.fillText(text, W / 2 - text_width / 2, H / 2 + 50);
    ctx.fillText(text2, W / 2 - text_width2 / 2, H / 2 + 120);
    ctx.fillText(text3, W / 2 - text_width3 / 2, H / 2 + 190);
    ctx.fillText(text4, W / 2 - text_width4 / 2, H / 2 + 260);


    //Background 360 degree arc
    ctx.beginPath();
		ctx.strokeStyle = bgcolor;
		ctx.lineWidth = 30;
		ctx.arc(W / 2, H / 2, 200, Math.PI, 2 * Math.PI, false); //you can see the arc now
		ctx.stroke();
		//gauge will be a simple arc
		//Angle in radians = angle in speed * PI / 180
		var radians = (speed + 1) * Math.PI / 180;
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.lineWidth = 30;
		//The arc starts from the rightmost end. If we deduct 90 speed from the angles
		//the arc will start from the topmost end
		ctx.arc(W / 2, H / 2, 200, Math.PI, radians + Math.PI, false);
		//you can see the arc now
		ctx.stroke();

  }

	function draw() {
		//Cancel any movement animation if a new chart is requested
		if (typeof animation_loop != undefined)
			clearInterval(animation_loop);
		//random degree from 0 to 360
		//connect to the server and get the data to be shown
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				tmpObj = JSON.parse(this.responseText);
        new_speed = tmpObj.speed;
				avgSpeed = tmpObj.avgSpeed;
        distancee = tmpObj.distance;
        throttlePosition = tmpObj.throttlePosition;
			}
		};
		//place API Link here
		xmlhttp.open("GET", "http://127.0.0.1:8000/lastNeferaReadings/", true);
		xmlhttp.send();
		speedChange = new_speed - speed;
		//This will animate the gauge to new positions
		//The animation will take 1 second
		//time for each frame is 1sec / speedChange
		animation_loop = setInterval(animate_to, 300 / speedChange);
	}
	//function to make the chart move to new speed
	function animate_to() {
		//clear animation loop if speed reaches to new_speed
		if (speed == new_speed)
			clearInterval(animation_loop);
		if (speed < new_speed)
			speed++;
		else
			speed--;
		init();
	}
	//Lets add some animation for fun
	draw();
	redraw_loop = setInterval(draw, 500); //Draw a new chart every 1/2 seconds
}
