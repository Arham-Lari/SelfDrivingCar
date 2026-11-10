class Sensor{
    constructor(car){
        this.car = car;
        this.raycount = 3;
        this.raylenght = 100;
        this.rayspread = Math.PI/4;

        this.rays = [];
    }

    update(){
        this.rays = [];
        for(let i = 0 ; i < this.raycount ; i++){
            const RayAngle = lerp(
                this.rayspread,
                -this.rayspread,
                i/(this.raycount - 1)
            );

            const start = {x:this.car.position.x,y:this.car.position.y};
            const end = {
                x:this.car.position.x - Math.sin(RayAngle)*this.raylenght,
                y:this.car.position.y - Math.cos(RayAngle)*this.raylenght,
            }

            this.rays.push([start,end]);
        }
    }

    draw(ctx){
        for(let i =0 ; i< this.raycount ; i++){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokestye = "yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                this.rays[i][1].x,
                this.rays[i][1].y,
            );
            ctx.stroke();
        }
    }
}
