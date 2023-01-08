class Road{
    constructor(x, width, lane = 5){
        this.x = x;
        this.width = width;
        this.lane = lane;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const inf = 1000000;
        this.top = -inf;
        this.bottom = inf;
    }

    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for(let i = 0; i <= this.lane; i++){
            const x = lerp(
                this.left,
                this.right,
                i / this.lane
            );

            if(i > 0 && i < this.lane){
                ctx.setLineDash([20,20]);
            }
            else{
                ctx.setLineDash([]);
            }

            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
    }
}
