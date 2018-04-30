// Enemies our player must avoid
var Enemy = function(index) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speedX = Math.floor(Math.random() * 4) + 1;
    this.x = -100;
    this.y = enemiesStartYpositions[Math.floor(Math.random() * 3)];
    this.index = index;


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speedX * 100;
    if (this.x > 550) {
        delete this;
    }

    // Losing Condition
    // Detecting a collision between this enemy and the player
    if (Math.abs(player.x - this.x) < 75 && Math.abs(player.y - this.y) < 80 ) {
        // Reset player position
        player.x = 200;
        player.y = 380;
        scoreLabel.innerText = --score;
        console.log("You hit an enemy");

    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;
}

Player.prototype.update = function(dt) {
    // Winning Condition
    if (player.y <= 35)
    {
        player.x = 200;
        player.y = 380;
        scoreLabel.innerText = ++score;
    }

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    const xStep = 101;
    const yStep = 83;
    if (key == 'up') {
        if (player.y > -35) {
            player.y -= yStep;
        }
    }
    else if (key == 'down') {
        if (player.y < 380) {
            player.y += yStep;
        }
    }
    else if (key == 'right') {
        if (player.x < 402) {
            player.x += xStep;
        }
    }
    else if (key == 'left') {
        if (player.x > -2) {
            player.x -= xStep;
        }
    }

    console.log(player.x, player.y);
}


// Game Variables
const enemiesStartYpositions = [48, 131, 214];
let score = 0;
let scoreLabel;

document.addEventListener("DOMContentLoaded", function(event) {
    scoreLabel = document.getElementById("score");
  });


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];

let interval = setInterval(generateEnemy, 1100);
// Place the player object in a variable called player
let player = new Player();

function generateEnemy() {
    if (allEnemies.length == 20) {allEnemies.splice(0, 10);}
    allEnemies.push(new Enemy(allEnemies.length));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
