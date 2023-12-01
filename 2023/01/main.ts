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
        const numbersOnly = line.replaceAll("one", "o1e").replaceAll("two", "t2o").replaceAll("three", "t3e").replaceAll("four", "f4r").replaceAll("five", "f5e").replaceAll("six", "s6x").replaceAll("seven", "s7n").replaceAll("eight", "e8t").replaceAll("nine", "n9e");


        const characters = numbersOnly.split("");

        const first = characters.find((character) => {
            const number = parseInt(character, 10);
            if (number) {
                return true;
            }
        });

        const second = characters.findLast((character) => {
            const number = parseInt(character, 10);
            if (number) {
                return true;
            }
        });

        console.log(`${first}${second}`);

        return parseInt(`${first}${second}`);

    })
    .reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
    });

// 56235 is too low
console.log(puzzleTwo);
