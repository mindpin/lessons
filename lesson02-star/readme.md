Star Demo
===================================  

利用 Javascript 跟 Html5 提供的 API 画出星星在画布移动的效果 <br />
在 Firefox 或者 Chrome下运行 <br />

[查看 Demo]: http://mindpin.github.io/lessons/lesson02-star/star.htm  <br />


### 功能说明: 

[查看 Demo]: http://mindpin.github.io/lessons/lesson02-star/star.htm  <br />

1, 在一个长方形的画布上的某一个点，会有一个或者多个大星星 <br />

2, 大星星移动时，会同时在移动过的轨道周围生成许多大小不定的小星星 <br />

3, 如果大星星在移动过程中，碰到画布的边线，会从另外一个方向上反弹 <br />

4, 小星星在移动过程中，半径会越来越小，直至消失 <br />


### 主要用到的 HTML5 相关的 API:

[HTML DOM getContext() 方法] http://www.w3school.com.cn/htmldom/met_canvas_getcontext.asp <br />
[canvas arc() 方法] http://www.w3school.com.cn/html5/canvas_arc.asp <br />
[canvas beginPath() 方法] http://www.w3school.com.cn/html5/canvas_beginpath.asp <br />
[canvas translate() 方法] http://www.w3school.com.cn/html5/canvas_translate.asp <br />
[canvas moveTo() 方法] http://www.w3school.com.cn/html5/canvas_moveto.asp <br />
[HTML DOM rotate() 方法] http://www.w3school.com.cn/htmldom/met_canvasrenderingcontext2d_rotate.asp <br />
[HTML DOM fillRect() 方法] http://www.w3school.com.cn/htmldom/met_canvasrenderingcontext2d_fillrect.asp <br />


### 该功能由三个文件组成: 


1, 向量类 Vector.js, 主要用来设置坐标位置 <br />

2, 球类 Ball.js, 封装该功能的几个核心方法<br/ >

3, 功能演示 Demo.js <br /> 


### 解题思路: 

1, 为了定位星星的位置跟移动速度，为此需要先实现一个基础的向量类 Vector，有X，Y坐标，再通过坐标的相加 (plus方法)，相减 (minus方法) 来控制移动速度跟位置, 同时星星会旋转，为此还需要一个旋转 (rotate 方法)。把这些方法都放在 Vector.js 文件中 <br />

2, 有了星星坐标后，接下来还需要一个星星类 Star, 用来画出星星的形状跟运行轨道, 把这些方法都放在 Ball.js 文件中。 <br />
Star 方法, 用来画出星星 <br />

updata 方法, 通过大星星来不断生成小星星, 同时小星星的半径在运动中会不断减少，直至消亡, 同时不断更新星星的vector坐标，使得星星看起来是在做高速移动 <br />

draw 方法, 这里会用到很多 HTML5 的方法来画出星星的移动轨道 <br />

3, 当核心功能都实现好后，最后就是在 Demo.js 这个文件中调用上面封装好的方法





### 实现步骤:


1, 新建 Vector.js 文件, 实现一个向量类 Vector, 该类有两个属性 x, y <br />


```javascript
function Vector(xx, yy)
{
  this.x = xx;
  this.y = yy;
}
```


同时需要实现在该类里面实现以下方法 <br />

plus 加法,改变当前对象
```javascript
Vector.prototype.plus = function(v)
{
  this.x += v.x;
  this.y += v.y;  
}
```

minus 减法,改变当前对象
```javascript
Vector.prototype.minus = function(v)
{
  this.x -= v.x;
  this.y -= v.y;
}
```

rotate 向量旋转，改变当前对象
```javascript
Vector.prototype.rotate = function(ang)
{  
  var ca = Math.cos (ang);
  var sa = Math.sin (ang);     
  var rx = this.x * ca - this.y * sa;
  var ry = this.x * sa + this.y * ca;
  this.x = rx;
  this.y = ry;
}
```

<br />

2, 新建 Ball.js 文件, 主要用来画出星星形状跟移动路线 <br />

先初始化 Star 类型
```javascript
function Star(x, y, r, n, color)//分别代表x,y,半径，边数，颜色
{
  this.loc = new Vector(x, y);//位置向量
  this.r = r;
  this.n = n;
  this.color = color;
  this.v = new Vector((Math.random()- .5) * 8, Math.random() * - 5 + 1);//随机速度
  this.g = new Vector(0, Math.random() * .2 + .1);//随机重力加速度
  
  this.angle = Math.random() * 3.14;//随机角度
  this.angleV = .2; //随机角速度
  this.time = 0;//时间
  this.stars = [];//子星星
  this.big = false;//默认为小星星
}
```

首先, 需要先准备以下几个方法 <br />

randomColor 返回随机颜色 <br />
```javascript
function randomColor()//随机颜色，为了是颜色亮点，各增加了100
{
  var r,g,b;
  
  r = parseInt(Math.random() * 255) + 100;
  g = parseInt(Math.random() * 255) + 100;
  b = parseInt(Math.random() * 255) + 100;  
  
  return ('rgb('+ r +','+ g + ','+  b +')');
}
```

die 设计星星的消失条件，同时返回是否已经消失 <br />
```javascript
Star.prototype.die = function()//死亡条件
{
  if(this.r < 1 || this.loc.x > 800 || this.loc.x < 0 || this.loc.y > 600 || this.loc.y < 0) return true;
  else return false;
}
```

addStar 添加小星星 <br />
```javascript
Star.prototype.addStar = function()//增加一个小星星
{
  var x, y, r, n, color;
  x = this.loc.x;
  y = this.loc.y;
  r = Math.random() * 4 + 1;
  n = parseInt(Math.random() * 4) + 3;
  color = randomColor();
  var star = new Star(x, y, r, n, color);
  this.stars.push(star);
}
```

run 改变星星的位置跟移动速度 <br />
```javascript
Star.prototype.run = function()
{
  this.loc.plus(this.v);//更新位置
  this.v.plus(this.g);//更新速度
}
```



其次, 实现两个核心方法 <br />

updata 生成新的星星，或者让半径不断减少的星星消失
```javascript
Star.prototype.updata = function(star_times = 1, decrease_time = 10)
{
  if(!this.big) //如果不是大星星就随着时间增加，半径减少
  {
    this.time ++;
    if(this.time > decrease_time) this.r -= .1;
  }
  
  else//是大星星，就不停的生成小星星
  {
    var stars = this.stars;

    for (var j = 0; j < star_times; j ++)
    {
      this.addStar();
    }

    for(var i = 0 ; i < stars.length ; i ++)
    {
      stars[i].updata(star_times, decrease_time);
      stars[i].draw();
      if(stars[i].die())//如果一个小星星死亡，就删掉它
      {
        stars.splice(i, 1);
        i --;
      }
      
    }
  }
  
  this.run();//更新
}
```

draw 画出星星移动路径
```javascript
Star.prototype.draw = function()
{  
  var myCanvas = document.getElementById("main");
  var g = myCanvas.getContext("2d");
  
  var r = this.r;
  var n = this.n;
  var color = this.color;
  var x = this.loc.x;
  var y = this.loc.y;
  
  g.save();  
  
  
  g.beginPath()  
  g.translate(x,y);
  this.angle += this.angleV;
  g.rotate(this.angle);//旋转角度
  g.moveTo(r,0);  
  
  g.fillStyle = color;  
  g.shadowColor= color; ;
  
  for (var i=0;i<n * 2 - 1;i++)//画星星形状
  {  
     g.rotate(Math.PI/n);  
     
     if(i%2 == 0) 
     {  
      g.lineTo((r/0.525731)*0.200811,0);  
     } 
     else 
     {  
      g.lineTo(r,0);  
     }
  }
  g.closePath();  
  g.fill();
  g.restore(); 
}  
```

2, 新建 Demo.js 文件, 用来调用 Vector, Ball 类里面已经实现好的接口 <br />

需要三个全局变量 <br />
var fps = 50;//帧频 <br />
var num = 1;//大星星数量 <br />
var stars = [];//储存大星星的数组 <br />

<br />
var star_times = 2 // 原有数值是 1, 用于增加小星星数量 <br />
var decrease_times = 20 // 原有数值是 10, 增加小星星停留时间 <br />
var speed_time = 2000 // 原有数值是 1000, 控制星星飞行速度 <br />

先准备以下几个方法 <br />

init 初始化一个长方形画布，并准备好相应的星星数据 <br />

```javascript
function init()
{
  var myCanvas = document.getElementById("ground");
  var graphics = myCanvas.getContext("2d");
  graphics.fillStyle = "#000000";
  graphics.fillRect(0, 0, 800, 600);//清屏
  
  addStar(num);//加大星星
}
```

loop 循环，使得星星可以在画布内不断运行

```javascript
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
    
      
    if(star.loc.x - star.r< 0 || star.loc.x + star.r> 800) //碰墙反弹
    {
      star.loc.minus(star.v);
      star.v.x *= - .99;
    }
    
    if(star.loc.y + star.r > 600 || star.loc.y - star.r < 0) 
    {
      star.loc.minus(star.v);
      star.v.y *= - .99;
    }
  }
}
```

<br />

addStar  添加大星星 <br />

main  全局入口函数
```javascript
function main()
{
  init();
  setInterval("loop()",1000/fps); 
}
```


