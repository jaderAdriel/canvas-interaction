

const canvas = document.getElementById("gameScreen")
const context = canvas.getContext("2d")
const colors = [
    "#ED5E93",
    "#00AAA8",
    "#564147",
]
let mouse = {
    x: null,
    y: null,
};
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
} )



canvas.addEventListener("mousemove", function(event)  {
    mouse.x = event.x;
    mouse.y = event.y;
});

let circles = createCircles(400);
animate()



function Circle(x, y, dx, dy, radius, color ="white") {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.minRadius = radius;
    this.radius = radius;
    this.color = color;

    this.draw = function() {
        
        context.beginPath();
        context.arc(this.x, this.y, this.radius ,0, Math.PI * 2 );
        context.fillStyle = this.color;
        context.fill()
    }

    this.update = function() {
        if ( this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = this.dx * -1;
        }
        if ( this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = this.dy * -1;
        }
        
        this.x += this.dx;
        this.y += this.dy;

        let maxRadius = 50;
        let area = 160
        if ((mouse.x - this.x < area/3 && mouse.x - this.x > -area/3) && 
            (mouse.y - this.y < area/4 && mouse.y - this.y > -area/4)  ) {
            if (this.radius < maxRadius) {
                this.radius += 2;
            }
        } 
        
        else if ( +this.radius   > this.minRadius) {
            this.radius -= 1
        }

        this.draw()
    }
} 

function createCircles(qtd) {
    let circles = []
    for (let i = 0; i < qtd; i++){
        let radius = Math.random() * 3 +1 ;
        let x = Math.random() *  (canvas.width - radius) + radius;
        let y = Math.random() *  (canvas.height - (radius *2)) + radius;
    
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;

        let color = colors[Math.floor(Math.random() * (colors.length ))];
    
        circles.push( new Circle(x, y, dx, dy, radius, color=color) )
    }
    return circles
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0,0, canvas.width, canvas.height )
    for (let i = 0; i < circles.length; i++) {
        circles[i].update()
    }
}


