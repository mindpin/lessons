var fps = 50;//帧频
var num = 1;//大星星数量
var stars = [];//储存大星星的数组

var star_times = 2 // 原有数值是 1, 用于增加小星星数量
var decrease_times = 20 // 原有数值是 10, 增加小星星停留时间
var speed_time = 2000 // 原有数值是 1000, 控制星星飞行速度

function main()
{
	init();
	setInterval("loop()", speed_time/fps);	
}

function init()
{
	var myCanvas = document.getElementById("ground");
	var graphics = myCanvas.getContext("2d");
	graphics.fillStyle = "#000000";
	graphics.fillRect(0, 0, 800, 600);//清屏
	
	addStar(num);//加大星星
}

function loop()//循环
{
	var myCanvas = document.getElementById("main");
	var graphics = myCanvas.getContext("2d");
	
	var i, l, n, star;
	graphics.clearRect(0, 0, 800, 600);
	
	n = stars.length;//大星星数量
	
	for(i = 0 ; i < n ; i ++)
	{
		star = stars[i];
		star.updata(star_times, decrease_times);
		star.draw();
		
		// 球反弹
	  star.impact();
	}
}


function addStar(n)
{
	for(var i = 0 ; i < n ; i ++)
	{
		var star = new Star(90, 90, 10, 3, "#f96");//大星星
		star.big = true;//设置为大星星
		star.g = new Vector(0, .2);
		star.v = new Vector(5, -2);
		stars.push(star);
	}
}




