function Letter(x) {
    this.display = x;
    this.guessed = false;
}

Letter.prototype.render = function() {
    if (this.display === ' ') {
        return ' ';
    } if (this.guessed === true) {
        return this.display;
    } else {
        return '_';
    }
}

Letter.prototype.guess = function(x) {
    if (x === this.display) {
        this.guessed = true;
    }
}

module.exports = Letter;


