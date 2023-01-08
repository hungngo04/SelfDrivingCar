//draw the road
const canvas = document.getElementById("myCanvas");
canvas.width = 500;

//draw a car
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.98);
const car = new Car(road.getLaneCenter(2), canvas.width / 2, 30,50);

//animation
animate();

function animate(){
    car.update(road.borders);
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0,-car.y + canvas.height * 0.7);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}