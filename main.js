const canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");

const car = new Car({
    position : {
        x:100,
        y:100,
    },
    width : 30,
    height : 50
})


function animation(){
    requestAnimationFrame(animation);
    canvas.height = window.innerHeight;
    car.draw();
    car.update();
}

animation();


