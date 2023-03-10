class Road{
    constructor(x, width, lane = 5){
        this.x = x;
        this.width = width;
        this.lane = lane;

        this.left = x - width / 2.1; 
        this.right = x + width / 2.1;

        const inf = 1000000;
        this.top = -inf;
        this.bottom = inf;

        const topLeft = {x: this.left, y: this.top};
        const topRight = {x: this.right, y: this.top};
        const bottomLeft = {x: this.left, y: this.bottom};
        const bottomRight = {x: this.right, y: this.bottom};

        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }

    getLaneCenter(laneIndex){
        const laneWidth = this.width / this.lane;
        return this.left + laneWidth / 2 + Math.min(laneIndex, this.lane - 1) * laneWidth;
    }

    draw(ctx){
        ctx.lineWidth = 8;
        ctx.strokeStyle = "white";

        for(let i = 1; i <= this.lane - 1; i++){
            const x = lerp(
                this.left,
                this.right,
                i / this.lane
            );

            ctx.setLineDash([40,40]);
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
        
        ctx.setLineDash([]);
        this.borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
    }
}
