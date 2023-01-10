//draw the road
const canvas = document.getElementById("myCanvas");
canvas.width = 500;

//draw a car
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.98);

//check if user start 
var isStart = false;

//generate random cars on the road
numberOfCar = 1000;
const cars = randomCar(numberOfCar);
//best car so far
let bestCar = cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i = 0; i < cars.length; ++i){
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain")
        );
        if(i != 0){
            NeuralNetwork.mutate(cars[i].brain, 0.1);
        }
    }
}
//generate new car on the road
const traffic = [
    new Car(road.getLaneCenter(2), -canvas.width / 2, 30, 50, "randomCar", 5.5),
    new Car(road.getLaneCenter(1), -200, 30, 50, "randomCar", 5.5),
    new Car(road.getLaneCenter(0), -300, 30, 50, "randomCar", 5.5),
    new Car(road.getLaneCenter(3), 230, 30, 50, "randomCar", 5.5),
    new Car(road.getLaneCenter(2), -500, 30, 50, "randomCar", 5.5),
    new Car(road.getLaneCenter(3), -700, 30, 50, "randomCar", 5.5),
    new Car(road.getLaneCenter(1), -260, 30, 50, "randomCar", 5.5),
    new Car(road.getLaneCenter(3), -100, 30, 50, "randomCar", 5.5),
    new Car(road.getLaneCenter(3), -350, 30, 50, "randomCar", 5.5),
    new Car(road.getLaneCenter(3), -700, 30, 50, "randomCar", 5.5),
    new Car(road.getLaneCenter(2), -800, 30, 50, "randomCar", 5.5),
    new Car(road.getLaneCenter(1), -900, 30, 50, "randomCar", 5.5),
    
]

function start(){
    animate();
}


function save(){
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}


function randomCar(numberOfCar){
    const cars = [];
    for(let i = 1; i <= numberOfCar; ++i)
        cars.push(new Car(road.getLaneCenter(2), 100, 30, 50, "AI"));
    return cars;
}

function animate(){
        for(let i = 0; i < traffic.length; ++i){
            traffic[i].update(road.borders, []);
        }

        for(let i = 0; i < cars.length; ++i)
            cars[i].update(road.borders, traffic);

        bestCar = cars.find(
            c => c.y == Math.min(
                ...cars.map(c => c.y)
            )
        )

        canvas.height = window.innerHeight;

        ctx.save();
        ctx.translate(0,-bestCar.y + canvas.height * 0.7);

        road.draw(ctx);
        for(let i = 0; i < traffic.length; ++i){
            traffic[i].draw(ctx, "red");
        }


        ctx.globalAlpha = 0.2;
        for(let i = 0; i < cars.length; ++i)
            cars[i].draw(ctx, "green");

        ctx.globalAlpha = 1;
        bestCar.draw(ctx, "green", true);


        ctx.restore();
        requestAnimationFrame(animate);
}