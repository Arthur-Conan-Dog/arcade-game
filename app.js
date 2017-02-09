// Global constants
// Basic physical information
var ENTITY_WIDTH = 100;
var ENTITY_LENGTH = 80;
var BASE_SPEED = 10;

// States of game
var LOADING = 1;
var PLAYING = 2;
var WON = 3;
var LOSE = 4;
var END = 0;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -ENTITY_WIDTH;
    this.y = ENTITY_LENGTH * Math.floor((Math.random() * 10) % 3 + 1);
    this.speed = (Math.random() + 1) * BASE_SPEED;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 400 + ENTITY_WIDTH)
        this.reset();
    this.x += dt * this.speed;
};

// Reset the enemy's location
Enemy.prototype.reset = function() {
    this.x = - ENTITY_WIDTH;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    Enemy.call(this);
    this.sprite = 'images/char-horn-girl.png';
    this.x = 200;
    this.y = 400;
    this.state = LOADING;
};

// Delegate Player Class to Enemy Class
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

// Update the player's position
Player.prototype.update = function() {
    if (this.state == LOADING) {
        // show welcome munu

        // choose character

        this.state = PLAYING;
    }

    if (this.state == PLAYING) {
        if (this.y == 0) {
            this.state = WON;
        }

        for (var i = 0; i < allEnemies.length; i++) {
            if ((this.y == allEnemies[i].y) &&
                (this.x - allEnemies[i].x < ENTITY_WIDTH / 2) &&
                (allEnemies[i].x - this.x < ENTITY_WIDTH / 2)){
                // print info
                // console.log('hit!');
                this.reset();
                allEnemies[i].reset();
            }
        }
    }

    if (this.state == WON){
        console.log('You win!');
        this.state = END;
    }

    if (this.state == LOSE) {
        console.log('You lose!');
        this.state = END;
    }

    if (this.state == END) {
        // press any key to esc
        console.log('press any key to end this game.');
    }
};

// Reset the player's location
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

Player.prototype.handleInput = function(key_pressed){
    switch(key_pressed){
        case 'left':
            if(this.x - ENTITY_WIDTH >= 0)
                this.x -= ENTITY_WIDTH;
            break;
        case 'right':
            if(this.x + ENTITY_WIDTH <= 400)
                this.x += ENTITY_WIDTH;
            break;
        case 'up':
            if(this.y - ENTITY_LENGTH >= 0)
                this.y -= ENTITY_LENGTH;
            break;
        case 'down':
            if(this.y + ENTITY_LENGTH <= 400)
                this.y += ENTITY_LENGTH;
            break;
        default:
            break;
    }
};

// Draw the player on the screen
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
    // print info
    // console.log(allEnemies[i]);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    // print info
    // console.log(e.keyCode);
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
