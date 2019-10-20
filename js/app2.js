// Enemies our player must avoid
class Enemy {
    constructor(y) {
        this.speed = Math.random() * 3 + 1;
        this.x = -100;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += dt * this.speed * 100;
        if (this.x > 550) {
            this.x = -100;
        }


        // Losing Condition
        // Detecting a collision between this enemy and the player
        if (Math.abs(player.x - this.x) < 75 && Math.abs(player.y - this.y) < 80) {
            // Reset player position
            player.x = 200;
            player.y = 380;
            scoreLabel.innerText = --score;
            console.log("You hit an enemy");

        }


    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.x = 200;
        this.y = 380;
        this.sprite = 'images/char-boy.png';
    }

    update(dt) {
        // Winning Condition
        if (this.y <= 35) {
            this.x = 200;
            this.y = 380;
            scoreLabel.innerText = ++score;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        const xStep = 101;
        const yStep = 83;
        if (key == 'up') {
            if (this.y > -35) {
                this.y -= yStep;
            }
        } else if (key == 'down') {
            if (this.y < 380) {
                this.y += yStep;
            }
        } else if (key == 'right') {
            if (this.x < 402) {
                this.x += xStep;
            }
        } else if (key == 'left') {
            if (this.x > -2) {
                this.x -= xStep;
            }
        }

        console.log(this.x, this.y);
    }
}


// Game Variables
let score = 0;
let scoreLabel;
let allEnemies = [];

document.addEventListener("DOMContentLoaded", function (event) {
    scoreLabel = document.getElementById("score");
});

// Now instantiate your objects.
let enemy1 = new Enemy(48);
let enemy2 = new Enemy(131);
let enemy3 = new Enemy(214);

allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});