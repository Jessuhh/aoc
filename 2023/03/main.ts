import { getInput } from "utils";

// const input = getInput("2023/03/test.txt").map((line) => line.split(""));
const input = getInput("2023/03/input.txt").map((line) => line.split(""));

type Location = { row: number; column: number };
type PartNumber = { number: number; location: Location };

const parts: Location[] = [];
const numbersOfParts: PartNumber[] = [];

input.forEach((line, row) => {
    line.forEach((item, column) => {
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(item)) {
            const lastNumber = numbersOfParts.pop();
            if (lastNumber) {
                if (
                    lastNumber.location.row === row &&
                    lastNumber.location.column === column - lastNumber.number.toString().length
                ) {
                    const number = `${lastNumber.number}${item}`;
                    numbersOfParts.push({ number: parseInt(number), location: lastNumber.location });
                    return;
                } else {
                    numbersOfParts.push(lastNumber);
                }
            }
            numbersOfParts.push({ number: parseInt(item), location: { row, column } });
            return;
        }

        if (!["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(item)) {
            parts.push({ row, column });
            return;
        }
    });
});

let sumOfPartNumbers = 0;

numbersOfParts.forEach((partNumber) => {
    let partDone = false;
    parts.forEach((part) => {
        if (partDone) return;
        const isAdjacentRow = partNumber.location.row - 1 <= part.row && part.row <= partNumber.location.row + 1;
        const isAdjecentColumn =
            partNumber.location.column - 1 <= part.column &&
            part.column <= partNumber.location.column + partNumber.number.toString().length;
        if (isAdjacentRow && isAdjecentColumn) {
            sumOfPartNumbers += partNumber.number;
            partDone = true;
        }
    });
});

const partOne = sumOfPartNumbers;
console.log(partOne);

const gears: Location[] = [];
const numbersOfGears: PartNumber[] = [];

input.forEach((line, row) => {
    line.forEach((item, column) => {
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(item)) {
            const lastNumber = numbersOfGears.pop();
            if (lastNumber) {
                if (
                    lastNumber.location.row === row &&
                    lastNumber.location.column === column - lastNumber.number.toString().length
                ) {
                    const number = `${lastNumber.number}${item}`;
                    numbersOfGears.push({ number: parseInt(number), location: lastNumber.location });
                    return;
                } else {
                    numbersOfGears.push(lastNumber);
                }
            }
            numbersOfGears.push({ number: parseInt(item), location: { row, column } });
            return;
        }

        if (item === "*") {
            gears.push({ row, column });
            return;
        }
    });
});

let sumOfGearNumbers = 0;

gears.forEach((gear) => {
    let gearRatio = 0;
    let gearCount = 0;
    numbersOfGears.forEach((number) => {
        const isAdjacentRow = gear.row - 1 <= number.location.row && number.location.row <= gear.row + 1;
        const isAdjecentColumn =
            gear.column - 1 <= number.location.column + number.number.toString().length - 1 &&
            number.location.column <= gear.column + 1;
            if(isAdjacentRow && isAdjecentColumn) {
                if(gearRatio === 0){
                    gearRatio += number.number;
                    gearCount++;
                } else {
                    gearRatio *= number.number;
                    gearCount++;
                }
            }
    });
    if(gearCount === 2) sumOfGearNumbers += gearRatio;
});

const partTwo = sumOfGearNumbers;
console.log(partTwo);
