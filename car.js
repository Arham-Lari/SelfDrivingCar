class Car{
    constructor({
     position,
     width,
     height,
     color,
     controlType,
     max_speed = 3,
    }){
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;

        this.speed = 0;
        this.acceration = 0.2;
        this.max_speed = max_speed;
        this.friction = 0.05;
        this.angle = 0;
        this.damage = false;

        if(controlType != "DUMMY"){
            this.sensor = new Sensor(this);
        }
        this.controls = new Controls(controlType);
    }


    update(roadboarder){
        if(!this.damage){
        this.#move();
        this.polygon = this.#createPolygon();
        this.damage = this.#assesDamage(roadboarder);
        }
        //sensor update method
        if(this.sensor){
            this.sensor.update(roadboarder);
        }
    }

    draw(ctx){

        ctx.fillStyle = (this.damage ? "gray" : "black");
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
        for(let i = 1; i < this.polygon.length ; i++){
            ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
        }
        ctx.fill();

        if(this.sensor){
            this.sensor.draw(ctx);
        }
    }

    #assesDamage(roadboarder){
        for(let i = 0; i < roadboarder.length ; i++){
            if(polygonIntesection(this.polygon,roadboarder[i])){
                return true;
            }
        }
        return false;
    }

    #createPolygon(){
        const points = [];
        const rad = Math.hypot(this.width,this.height)/2;
        const alpha = Math.atan2(this.width,this.height);
        points.push({
            x:this.position.x - Math.sin(this.angle - alpha)*rad,
            y:this.position.y - Math.cos(this.angle - alpha)*rad,
        });

        points.push({
            x:this.position.x-Math.sin(this.angle + alpha)*rad,
            y:this.position.y-Math.cos(this.angle + alpha)*rad,
        })

        points.push({
            x:this.position.x - Math.sin(Math.PI+this.angle - alpha)*rad,
            y:this.position.y - Math.cos(Math.PI+this.angle - alpha)*rad,
        })

        points.push({
            x:this.position.x - Math.sin(Math.PI+this.angle + alpha)*rad,
            y:this.position.y - Math.cos(Math.PI+this.angle + alpha)*rad,
        })

        return points;
    }

    #move(){

        if(this.controls.forward){
            this.speed += this.acceration;
        }

        //move backward
        if(this.controls.backword) {
            this.speed -=this.acceration; 
        }

        //move right
        if(this.speed != 0){
            const flip = this.speed > 0? 1: -1;
        if(this.controls.right){
            this.angle -= 0.03*flip;
        }

        //moveleft
        if(this.controls.left){
            this.angle += 0.03*flip;
        }
        }

        if(this.speed > this.max_speed){
            this.speed = this.max_speed;
        }

        if(this.speed < -this.max_speed/2){
            this.speed = -this.max_speed/2;
        }

        if(this.speed > 0){
            this.speed -= this.friction;
        }

        if(this.speed < 0){
            this.speed += this.friction;
        }

        if(Math.abs(this.speed) < this.friction){
            this.speed = 0;
        }

        this.position.x -= Math.sin(this.angle)* this.speed;
        this.position.y -=  Math.cos(this.angle)* this.speed;

    }
}
