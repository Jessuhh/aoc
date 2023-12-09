import { getInput } from "utils";

// const input = getInput("2023/09/test.txt").map((line) => line.split(" ").map((number) => parseInt(number)));
const input = getInput("2023/09/input.txt").map((line) => line.split(" ").map((number) => parseInt(number)));

const partOne = input
    .map((numbers) => {
        const allZeroes = (array: number[]) => array.every((value) => value === 0);

        let i = 0;
        const differences: number[][] = [];
        differences.push(numbers);
        while (!allZeroes(differences[i])) {
            // console.log(differences[i]);
            const array: number[] = [];
            for (let j = 1; j < differences[i].length; j++) {
                array.push(differences[i][j] - differences[i][j - 1]);
            }
            differences.push(array);

            i++;
        }
        // console.log(differences[i])

        const reversed = differences.reverse();
        for (let j = 0; j < differences.length; j++) {
            // console.log(reversed[j]);
            if (j === 0) {
                reversed[j].push(0);
            } else {
                reversed[j].push(reversed[j][reversed[j].length - 1] + reversed[j - 1][reversed[j - 1].length - 1]);
            }
            // console.log(reversed[j]);
        }

        const finalSequence = reversed.reverse()[0];
        return finalSequence[finalSequence.length - 1];
    })
    .reduce((previousValue, currentValue) => (previousValue += currentValue));

// console.log("Part one:");
// console.log(partOne);

const partTwo = input
    .map((numbers) => {
        const allZeroes = (array: number[]) => array.every((value) => value === 0);

        let i = 0;
        const differences: number[][] = [];
        differences.push(numbers);
        while (!allZeroes(differences[i])) {
            // console.log(differences[i]);
            const array: number[] = [];
            for (let j = 1; j < differences[i].length; j++) {
                array.push(differences[i][j] - differences[i][j - 1]);
            }
            differences.push(array);

            i++;
        }
        // console.log(differences[i])

        const reversed = differences.reverse();
        for (let j = 0; j < differences.length; j++) {
            // console.log(reversed[j]);
            if (j === 0) {
                reversed[j] = [0].concat(reversed[j]);
            } else {
                const newValue = reversed[j][0] - reversed[j - 1][0];
                reversed[j] = [newValue].concat(reversed[j]);
            }
            // console.log(reversed[j]);
        }

        const finalSequence = reversed.reverse()[0];
        return finalSequence[0];
    })
    .reduce((previousValue, currentValue) => (previousValue += currentValue));

console.log("Part two:");
console.log(partTwo);
