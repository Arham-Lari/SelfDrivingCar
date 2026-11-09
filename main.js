const canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");

const car = new Car({
    position : {
        x:road.getLaneCenter(1),
        y:100,
    },
    width : 30,
    height : 50
})

const road = new Road(canvas.width/2,canvas.width);


function animation(){
    requestAnimationFrame(animation);
    canvas.height = window.innerHeight;
    road.draw(ctx);
    car.draw(ctx);
    car.update();
}

animation();


