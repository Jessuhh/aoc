import { getInput } from "utils";

// const input = getInput("2022/01/test.txt", "\n\n");
const input = getInput("2022/01/input.txt", "\n\n");

const getMostCalories = () =>
    input.reduce((mostCaloriesPreviously: number, elf: string) => {
        const caloriesList = elf.split("\n").map(Number);
        const totalCalories = caloriesList.reduce((a, b) => a + b, 0);

        return totalCalories > mostCaloriesPreviously ? totalCalories : mostCaloriesPreviously;
    }, 0);

// Part 1
// console.log(getMostCalories());

const getThreeMostCalories = () =>
    input.reduce<number[]>(
        (mostCaloriesPreviously: number[], elf: string) => {
            const caloriesList = elf.split("\n").map(Number);
            const totalCalories = caloriesList.reduce((a, b) => a + b, 0);

            const sortedMostCaloriesPreviously = mostCaloriesPreviously.sort((a, b) => a - b);
            if (totalCalories > sortedMostCaloriesPreviously[0]) sortedMostCaloriesPreviously[0] = totalCalories;

            return sortedMostCaloriesPreviously;
        },
        [0, 0, 0]
    );

// Part 2
console.log(getThreeMostCalories().reduce((a, b) => a + b, 0));
