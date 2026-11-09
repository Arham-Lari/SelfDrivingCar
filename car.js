class Car{
    constructor({
     position,
     velocity,
     width,
     height,
     color,
    }){
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.color = color;
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
}
