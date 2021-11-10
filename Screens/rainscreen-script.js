let screen_height = screen.height;
let screen_width = screen.width;

var config = {
    type: Phaser.AUTO,
    width: screen_width,
    height: screen_height,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
};

var game = new Phaser.Game(config);
var collection = [];

function preload ()
{
    this.load.image('blank','Assets/raindrop.png');
}

function create ()
{
    this.cameras.main.setBackgroundColor("#000032");
    for (let index = 0; index < 100; index++) {
        collection.push(new Raindrop(this.add.image(0,0,'blank')));
    }
}

function update ()
{
    collection.forEach(element => {
        element.update();
    });
}


class Raindrop {
    constructor(object) {
        this.object = object;
        this.object.x = Math.random()*screen_width;
        this.object.y = -Math.random()*800;
        this.speed = (Math.random()+1)*5;
    }

    reset() {
        this.object.x = Math.random()*screen_width;
        this.object.y = -Math.random()*800;
        this.speed = (Math.random()+1)*5;
    }

    update() {
        this.object.y += this.speed;
        if (this.object.y >= screen_height) {
            this.reset();
        }
    }
}