const canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");


const road = new Road(canvas.width/2,canvas.width);

const car = new Car({
    position : {
        x:road.getLaneCenter(1),
        y:100,
    },
    width : 30,
    height : 50
})

function animation(){
    car.update(road.border);
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0,-car.position.y+canvas.height*0.5);


    road.draw(ctx);
    car.draw(ctx);


    ctx.restore();
    requestAnimationFrame(animation);
}

animation();


