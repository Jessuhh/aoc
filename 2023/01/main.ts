import { getInput } from "utils";

// const input = getInput("2023/01/test.txt");
const input = getInput("2023/01/input.txt");

const puzzleOne = input
    .map((line) => {
        const characters = line.split("");

        const first = characters.find((character) => {
            const number = parseInt(character, 10);
            if (number) {
                return true;
            }
        });

        const second = characters.reverse().find((character) => {
            const number = parseInt(character, 10);
            if (number) {
                return true;
            }
        });

        return parseInt(`${first}${second}`);
    })
    .reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
    });

// console.log(puzzleOne);

const puzzleTwo = input
    .map((line) => {
        let firstValue = Number.MAX_VALUE;
        let firstIndex = Number.MAX_VALUE;

        const characters = line.split("");

        const first = characters.find((character) => {
            const number = parseInt(character, 10);
            if (number) {
                return true;
            }
        });

        if (first) {
            if (line.indexOf(first) < firstIndex) {
                firstIndex = line.indexOf(first);
                firstValue = parseInt(first);
            }
        }

        ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].forEach((number, index) => {
            if (line.indexOf(number) < firstIndex && line.indexOf(number) !== -1) {
                firstValue = index + 1;
                firstIndex = line.indexOf(number);
            }
        });

        // Second digit, from the back
        let secondValue = Number.MAX_VALUE;
        let secondIndex = 0;

        const second = characters.findLast((character) => {
            const number = parseInt(character, 10);
            if (number) {
                return true;
            }
        });

        if (second) {
            if (line.lastIndexOf(second) > secondIndex) {
                secondIndex = line.lastIndexOf(second);
                secondValue = parseInt(second);
            }
        }

        ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].forEach((number, index) => {
            if (line.lastIndexOf(number) > secondIndex && line.lastIndexOf(number) !== -1) {
                secondValue = index + 1;
                secondIndex = line.lastIndexOf(number);
            }
        });

        return parseInt(`${firstValue}${secondValue}`); 
    })
    .reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
    });

// 56235 is too low
console.log(puzzleTwo);
