class Sensor{
    constructor(car){
        this.car = car;
        this.ray = 5; //number of sensor rays
        this.rayLength = 350; //length of sensor ray
        this.raySpread = Math.PI / 2; //angle of spread
        this.rays = [];
        this.readings = []; //if there is a border and how far is it
    }

    update(roadBorders){
        this.#castRay();
        this.readings = [];
        for(let i = 0; i < this.rays.length; ++i){
            this.readings.push(
                this.#getReading(this.rays[i], roadBorders)
            );
        }
    }

    #getReading(ray, roadBorders){
        let touches = [];

        for(let i = 0; i < roadBorders.length; i++){
            const touch = getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if(touch){
                touches.push(touch);
            }
        }

        if(touches.length == 0)
            return null;
        else{
            const offsets = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(e => e.offset == minOffset);
        }
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
            let end = this.rays[i][1];
            if(this.readings[i]){
                end = this.readings[i];
            }

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#7F9B74";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
        }
    }
}