//draw the road
const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width = 500;

//draw a car
const ctx = canvas.getContext("2d");
const car = new Car(canvas.width / 2, canvas.width / 2, 30,50);

//animation
animate();

function animate(){
    car.update();
    car.draw(ctx);
    requestAnimationFrame(animate);
}