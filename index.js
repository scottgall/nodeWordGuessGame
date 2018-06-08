let word = require("./word.js");
let inquirer = require('inquirer');
let chalk = require('chalk');
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
        if (guessedArr.includes(answer)) {
            console.log(chalk.blueBright.bold('\n*You already guessed that letter. Try again*'));
        } else if (!answer.match(/^[A-Za-z]+$/)) {
            console.log(chalk.blueBright.bold("\n*That's not a letter, try again*"));
        } else if (answer.length !== 1) {
            console.log(chalk.blueBright.bold('\n*Please guess a single letter*'));
        } else {

            if (currentWord.indexOf(answer) > -1) {
                console.log(chalk.greenBright.bold('\nCORRECT!'));
            } else {
                console.log(chalk.redBright.bold('\nINCORRECT!'));
            }
            guessesLeft--;
            guessedArr.push(answer);
        }

        let comparedString = wordObj.displayWord().replace(/ /g,'');
        if (comparedString === currentWord.replace(/ /g,'')) {
            console.log(chalk.yellowBright.bold("\nYou won! The word was '" + currentWord + "'.\n"));
            playAgain();
        } else if (guessesLeft === 0) {
            console.log(chalk.yellowBright.bold("\nYou ran out of guesses. The word was '" + currentWord + "'.\n"));
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
        console.log('');
    }); 
}

newGame();