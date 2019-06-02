var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

//var sign = document.querySelector("#text");
//sign.innerHTML = "HELLO";

/*
c.fillStyle = "rgba(255, 0, 0, 0.5)"
c.fillRect(100, 100, 100, 100);

c.beginPath();
c.moveTo(300,300);
c.lineTo(300,100);
c.strokeStyle = "e4e4e4";
c.stroke();

c.beginPath();
c.arc(300,50,50,0,Math.PI * 2,false);
c.strokeStyle = "blue";
c.stroke();
*/
var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

var colorArray = [
    '#3D527A', 
    '#7DBBD6', 
    '#FC7969', 
    '#5A1917', 
    '#D95551',
];

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;
        
        if (mouse.x - this.x < 80 && mouse.x - this.x > -80 && mouse.y - this.y < 80 && mouse.y - this.y > -80) {
            if (this.radius < 80) {
                this.radius += 1;
            }
        }else if (this.radius > 5) {
            this.radius -= 1;
        }
        
        this.draw();
    }
}




var circleArray = [];

for (var i = 0; i < 500; i++) {
    var radius = 50;
    var x = Math.random() * (canvas.width - radius * 2) + radius;
    var y = Math.random() * (canvas.height - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerWidth);
    
     
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
    
animate();

/*
function movecircle() {
    requestAnimationFrame(movecircle);
    c.beginPath();
    c.lineWidth = 10;
    c.arc(x, y, radius)
}
*/


