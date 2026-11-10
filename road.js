class Road{
    constructor(x,width,lanecount = 3){
        this.x = x,
        this.width = width;     
        this.lanecount = lanecount;

        this.left = x- width/2;
        this.right = x+ width/2;

        const infinity = 100000;
        this.bottom = + infinity;
        this.top = -infinity;

        const topleft = {x:this.left, y:this.top};
        const topright = {x:this.right,y:this.top};
        const bottomleft = {x:this.left,y:this.bottom};
        const bottomright = {x:this.right,y:this.bottom};
        this.border = [
            [topleft,bottomleft],
            [topright,bottomright],
        ]
    }

    getLaneCenter(laneIndex){
        const lanewidth = this.width/this.lanecount;
        return this.left + lanewidth/2+
            Math.min(laneIndex,this.lanecount-1)*lanewidth;
    }

    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for(let i = 1 ; i < this.lanecount  ; i++){

            const x = lerp(
                this.right,
                this.left,
                i/this.lanecount,
            )

            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom)
            ctx.stroke();

        }

        ctx.setLineDash([]);
            this.border.forEach(bound =>{
                ctx.beginPath();
                ctx.moveTo(bound[0].x,bound[0].y);
                ctx.lineTo(bound[1].x,bound[1].y)
                ctx.stroke();
            })
    }

}

