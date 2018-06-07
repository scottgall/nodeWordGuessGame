var letter = require("./letter.js");

function Word (x) {
    this.wordArr = [];
    for (var i = 0; i < x.length; i++) {
        this.wordArr.push(new letter(x[i]));
    }
}

Word.prototype.displayWord = function () {
    let display = '';
    for (var i = 0; i < this.wordArr.length; i++) {
        display += this.wordArr[i].render(this.wordArr[i]) + ' ';
    }
    return(display);
}

Word.prototype.letterGuessed = function (x) {
    for (var i = 0; i < this.wordArr.length; i++) {
        this.wordArr[i].guess(x);
    }
}


module.exports = Word;


