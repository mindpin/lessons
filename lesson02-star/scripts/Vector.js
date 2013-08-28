function Vector(xx, yy)
{
	this.x = xx;
	this.y = yy;
}


//	----------------plus--------------------------------------------------
//	加法,改变当前对象
Vector.prototype.plus = function(v)
{
	this.x += v.x;
	this.y += v.y;	
}

//	----------------minus-------------------------------------------------
//	减法,改变当前对象
Vector.prototype.minus = function(v)
{
	this.x -= v.x;
	this.y -= v.y;
}



//	----------------rotate------------------------------------------------
//	向量旋转，改变当前对象
Vector.prototype.rotate = function(ang)
{  
	var ca = Math.cos (ang);
	var sa = Math.sin (ang);     
	var rx = this.x * ca - this.y * sa;
	var ry = this.x * sa + this.y * ca;
	this.x = rx;
	this.y = ry;
} 

