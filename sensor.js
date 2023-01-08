class Sensor{
    constructor(car){
        this.car = car;
        this.ray = 5; //number of sensor rays
        this.rayLength = 350; //length of sensor ray
        this.raySpread = Math.PI / 2; //angle of spread
        this.rays = [];
    }

    update(){
        this.#castRay();
    }

    #castRay(){
        this.rays = [];
        for(let i = 0; i < this.ray; ++i){
            const rayAngle = lerp(
                this.raySpread / 2, 
                -this.raySpread / 2, 
                this.ray == 1 ? 0.5: (i / (this.ray - 1))
            ) + this.car.angle;

            const start = {x: this.car.x, y: this.car.y};
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            };
            this.rays.push([start, end]);
        }
    }

    draw(ctx){
        for(let i = 0; i < this.ray; ++i){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#7F9B74";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );
            ctx.stroke();
        }
    }
}