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
        if(this.controls.forward) this.position.y -= 2;

        if(this.controls.backword) this.position.y += 2;
    }
}
