//draw the road
const canvas = document.getElementById("myCanvas");
canvas.width = 500;

//draw a car
const ctx = canvas.getContext("2d");
const car = new Car(canvas.width / 2, canvas.width / 2, 30,50);

//animation
animate();

function animate(){
    car.update();
    canvas.height = window.innerHeight;
    car.draw(ctx);
    requestAnimationFrame(animate);
}