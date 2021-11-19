var selection_tab = document.getElementsByClassName("screen-selection")[0];
let screen_height = screen.height;
let screen_width = screen.width;
var global_reference;
var hsv_wheel = Phaser.Display.Color.HSVColorWheel();

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
    this.load.image('raindrop','/Screens/Assets/raindrop.png');
    this.load.image('firefly','/Screens/Assets/firefly.png');
    this.load.image('dvd','/Screens/Assets/dvd.png');
}

function create ()
{
    toggle_selection_tab();
    toggle_selection_tab();

    global_reference = this;
    this.input.on('pointerdown', toggle_selection_tab);

    console.log("Made entirely by ajian_nedo#8797");
    SetScreen(0);
}

function update ()
{
    collection.forEach(element => {
        element.update();
    });
}


function SetScreen(index) {
    collection.forEach(element => {
        element.destroy();
        element = null;
    });
    collection = [];
    [
        function () {Raindrop.initialize()},
        function () {Fireflies.initialize()},
        function () {DVD.initalize()}
    ][index].call();
}


function toggle_selection_tab() {
    if(selection_tab.style.width=="0vw") {
        selection_tab.style.width = "15vw";
    } else {
        selection_tab.style.width = "0vw";
    }
}

class ScreenObject {
    update() {

    }

    reset() {

    }

    destroy() {
        this.object.destroy();
        this.object = null;
    }
}

class DVD extends ScreenObject {
    static initalize() {
        for (let i = 0; i < 1; i++) {
            collection.push(new DVD(global_reference.add.image(0,0,'dvd')));
        }
        global_reference.cameras.main.setBackgroundColor("#000000");
    }

    constructor(object) {
        super();

        this.object = object;
        this.object.x = Math.random() * screen_width;
        this.object.y = Math.random() * screen_height;

        this.speed = 5;
        this.movement_x = Math.random() >= 0.5 ? 1 : -1;
        this.movement_y = Math.random() >= 0.5 ? 1 : -1;
    }

    update() {
        let next_x = this.object.x + (this.movement_x * this.speed);
        let next_y = this.object.y + (this.movement_y * this.speed);
        let change_color = false;

        if(next_x >= screen_width) {
            this.movement_x = -1;
            change_color = true;
        } else if(next_x <= 0) {
            this.movement_x = 1;
            change_color = true;
        }

        if(next_y >= screen_height) {
            this.movement_y = -1;
            change_color = true;
        } else if(next_y <= 0) {
            this.movement_y = 1;
            change_color = true;
        }

        if(change_color) {
            this.changeColor();
        }

        this.object.x += this.movement_x * this.speed;
        this.object.y += this.movement_y * this.speed;
    }

    changeColor() {
        let i = ~~(Math.random() * 359);
        this.object.setTint(hsv_wheel[i].color);
    }
}

class Raindrop extends ScreenObject {
    static initialize() {
        for (let index = 0; index < 100; index++) {
            collection.push(new Raindrop(global_reference.add.image(0,0,'raindrop')));
        }
        global_reference.cameras.main.setBackgroundColor("#000032");
    }

    constructor(object) {
        super();

        this.object = object;
        this.object.x = Math.random() * screen_width;
        this.object.y = -Math.random() * 800;
        this.depth = (Math.random() * 16) + 8;
        this.object.setTint(0xffffff*1);
    }

    reset() {
        this.object.x = Math.random() * screen_width;
        this.object.y = -Math.random() * 800;
    }

    update() {
        this.object.y += this.depth;
        if (this.object.y >= screen_height) {
            this.reset();
        }
    }
}

class Fireflies extends ScreenObject {
    static initialize() {
        for (let index = 0; index < 100; index++) {
            collection.push(new Fireflies(global_reference.add.image(0,0,'firefly')));
        }
        global_reference.cameras.main.setBackgroundColor("#000000");
    }

    constructor(object) {
        super();

        this.object = object;
        this.object.x = Math.random() * screen_width;
        this.object.y = Math.random() * screen_height;
        this.direction = Math.random() * 360;
        this.target_direction = Math.random() * 360;

        this.flicker = new GameValue(0, 360, 1, Math.random()*100);
    }

    update() {
        this.flicker.regenerate();
        if(this.flicker.percent() == 1) {
            this.flicker.affect_value(0);
        }

        // Colour
        let _c = Math.sin((this.flicker.percent() * 360) * Math.PI/180);
        if(_c <= 0) {
            _c = 0;
        }

        let _colour = 0xffffff * _c * 0.003;
        this.object.setTint(_colour);
        //

        // Direction
        let diff = this.direction - this.target_direction;
        if(Math.abs(diff) > 20) {
            this.direction -= diff * 0.01;
        } else {
            this.target_direction = Math.random() * 360;
        }
        // 

        // Movement
        let radian_direction = this.direction * (Math.PI/180);
        this.object.x += Math.cos(radian_direction);
        this.object.y += Math.sin(radian_direction);

        if(this.object.x > screen_width) {
            this.object.x = 0;
        } else if(this.object.x < 0) {
            this.object.x = screen_width;
        }

        if(this.object.y > screen_height) {
            this.object.y = 0;
        } else if (this.object.y < 0) {
            this.object.y = screen_height;
        }
        //
    }
}

class GameValue {
    constructor(min, max, regenerate, initial_percent = 100) {
        this.min = min;
        this.max = max;
        this.value = (this.max - this.min) * (initial_percent / 100);
        this.regeneration = regenerate;
    }

    regenerate() {
        this.value += this.regeneration;
        this.clamp();
    }

    affect_value(percent) {
        this.value = (this.max - this.min) * (percent / 100);
        this.clamp();
    }

    percent() {
        return (this.value/(this.max-this.min));
    }

    clamp() {
        if(this.value >= this.max)
        {
            this.value = this.max
        } else if (this.value <= this.min) {
            this.value = this.min;
        }
    }
}
