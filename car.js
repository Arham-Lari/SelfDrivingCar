class Car{
    constructor({
     position,
     width,
     height,
     color,
    }){
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;

        this.speed = 0;
        this.acceration = 0.2;
        this.max_speed = 3;
        this.friction = 0.05;
        this.angle = 0;

        this.sensor = new Sensor(this);
        this.controls = new Controls();
    }

    draw(ctx){
      ctx.save();
      ctx.translate(this.position.x,this.position.y);
      ctx.rotate(-this.angle)
      ctx.beginPath();
      ctx.rect(
            - this.width/2,
            - this.height/2,
            this.width,
            this.height
        );
        ctx.fill();
        ctx.restore();

        this.sensor.draw(ctx);
    }

    update(){
        //move forward
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

        //sensor update method
        this.sensor.update();
    }
}
