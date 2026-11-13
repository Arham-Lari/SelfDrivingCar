class Sensor{
    constructor(car){
        this.car = car;
        this.raycount = 4;
        this.raylenght = 100;
        this.rayspread = Math.PI/4;

        this.rays = [];
        this.readings = [];
    }

    update(roadboarders,traffic){
        this.rays = [];
        for(let i = 0 ; i < this.raycount ; i++){
            const RayAngle = lerp(
                this.rayspread,
                -this.rayspread,
                i/(this.raycount - 1)
            )+this.car.angle;

            const start = {x:this.car.position.x,y:this.car.position.y};
            const end = {
                x:this.car.position.x - Math.sin(RayAngle)*this.raylenght,
                y:this.car.position.y - Math.cos(RayAngle)*this.raylenght,
            }

            this.rays.push([start,end]);
        }

        this.readings = [];
        for(let i = 0; i< this.rays.length; i++){
            this.readings.push(
                this.#getReadings(
                    this.rays[i],
                    roadboarders,
                    traffic
                )
            )
        }
    }

    draw(ctx){
        for(let i =0 ; i< this.raycount ; i++){
            let end = this.rays[i][1];
            if(this.readings[i]){
                end = this.readings[i];
            }
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y,
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
                end.y,
            );
            ctx.stroke();
        }
    }

    #getReadings(ray,roadboarders,traffic){
        
        let touches = [];

        for(let i = 0; i< roadboarders.length ; i++){

            const touch = getInterSection(
                ray[0],
                ray[1],
                roadboarders[i][0],
                roadboarders[i][1],
            )

            if(touch){
                touches.push(touch);
            }
        }

        for(let i =0 ; i < traffic.length ; i++){
            const poly = traffic[i].polygon;
            for(let j = 0 ; j< poly.length ; j++){
                const value = getInterSection(
                    ray[0],
                    ray[1],
                    poly[j],
                    poly[(j+1)%poly.length]
                );
                if(value){
                    touches.push(value);
                }
            }
        }

        if(touches.length == 0){
            return null;
        }else{
            const offsets = touches.map(touch => touch.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(touch => touch.offset == minOffset);
        }
    }
}
