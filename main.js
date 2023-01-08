//draw the road
const canvas = document.getElementById("myCanvas");
canvas.width = 500;

//draw a car
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.98);
const car = new Car(road.getLaneCenter(2), canvas.width / 2, 30, 50, "mainCar",);
//generate new car on the road
const traffic = [
    new Car(road.getLaneCenter(1), -canvas.width / 2, 30, 50, "randomCar", 5.5)
]

//animation
animate();

function animate(){
    for(let i = 0; i < traffic.length; ++i){
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);

    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0,-car.y + canvas.height * 0.7);

    road.draw(ctx);
    for(let i = 0; i < traffic.length; ++i){
        traffic[i].draw(ctx, "red");
    }
    car.draw(ctx, "green");

    ctx.restore();
    requestAnimationFrame(animate);
}