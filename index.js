let word = require("./word.js");
let inquirer = require('inquirer');
let wordBank = ['biscuits and gravy', 'pancakes', 'waffles', 'bacon', 'eggs benedict', 'french toast', 'hash browns', 'corned beef hash', 'denver omelet'];
let guessesLeft = 15;
let wordObj = '';
let currentWord = '';
let guessedArr = [];

function newGame () {
    currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    wordObj = new word(currentWord);
    guessesLeft = 15;
    guessedArr = [];
    play();
}

function play () {
    console.log('\nGuesses left: ' + guessesLeft + '\n');
    let string = wordObj.displayWord();
    console.log(string + '\n');

    inquirer.prompt([
        {
            type: 'input',
            message: 'guess a letter.',
            name: 'guess'
        },    
    ]).then(answers => {
        let answer = answers.guess.toLowerCase();
        wordObj.letterGuessed(answer);
        let letters = /^[A-Za-z]+$/;
        if (guessedArr.includes(answer)) {
            console.log('\n*You already guessed that letter. Try again.*');
        } else if (!answer.match(letters)) {
            console.log("\n*That's not a letter, try again.*");
        } else if (answer.length !== 1) {
            console.log('\n*Please guess a single letter.*');
        } else {
            guessesLeft--;
            guessedArr.push(answer);
        }

        let comparedString = wordObj.displayWord().replace(/ /g,'');
        if (comparedString === currentWord.replace(/ /g,'')) {
            console.log("\nYou won! The word was '" + currentWord + "'.\n");
            playAgain();
        } else if (guessesLeft === 0) {
            console.log("\nYou ran out of guesses. The word was '" + currentWord + "'.\n");
            playAgain();
        } else {
            play();
        }
    });        
}

function playAgain () {
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Would you like to play again?.',
            name: 'confirm',
            default: true
        },    
    ]).then(answers => {
        if (answers.confirm === true) {
            newGame();
        }
    }); 
}

newGame();