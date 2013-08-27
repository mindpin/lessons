Star Demo
===================================  

利用 Javascript 跟 Html5 提供的 API 画出星星在画布移动的效果 <br />
在 Firefox 或者 Chrome下运行 <br />

### 该功能由三个文件组成: 

1, 向量类 Vector.js <br />
2, 球类 Ball.js <br/ >
3, 功能演示 Demo.js <br /> 



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
