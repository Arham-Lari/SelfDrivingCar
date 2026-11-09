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

        this.controls = new Controls();
    }

    draw(){
      ctx.beginPath();
      ctx.rect(
            this.position.x - this.width/2,
            this.position.y - this.height/2,
            this.width,
            this.height
        );
        ctx.fill();
    }

    update(){
        if(this.controls.forward){
            this.speed += this.acceration;
        }

        if(this.controls.backword) {
            this.speed -=this.acceration; 
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

        this.position.y -= this.speed; 
    }
}
