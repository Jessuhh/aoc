import { getInput } from "utils";

// const input = getInput("2023/02/test.txt");
const input = getInput("2023/02/input.txt");

const partOne = input.map((line) => {
    const gameId = parseInt(line.split(":")[0].replace("Game ", ""));
    const game = line.split(":")[1].trim();
    const sets = game.split(";");

    for(const set of sets) {
        const cubes = set.split(",");
        for(const cube of cubes) {
            if(cube.includes("red")) {
                const red = parseInt(cube.replace("red", "").trim());
                if(red > 12) return 0;
            }
            if (cube.includes("green")) {
                const green = parseInt(cube.replace("green", "").trim());
                if (green > 13) return 0;
            }
            if (cube.includes("blue")) {
                const blue = parseInt(cube.replace("blue", "").trim());
                if (blue > 14) return 0;
            }
        }
    }

    return gameId;
}).reduce((previousValue, currentValue) => previousValue + currentValue);

// console.log(partOne);

const partTwo = input
    .map((line) => {
        const game = line.split(":")[1].trim();
        const sets = game.split(";");

        let highestRedCount= 0, highestGreenCount = 0, highestBlueCount = 0;
        for (const set of sets) {
            const cubes = set.split(",");
            for (const cube of cubes) {
                if (cube.includes("red")) {
                    const red = parseInt(cube.replace("red", "").trim());
                    if(red > highestRedCount) highestRedCount = red;
                }
                if (cube.includes("green")) {
                    const green = parseInt(cube.replace("green", "").trim());
                    if (green > highestGreenCount) highestGreenCount = green;
                }
                if (cube.includes("blue")) {
                    const blue = parseInt(cube.replace("blue", "").trim());
                    if (blue > highestBlueCount) highestBlueCount = blue;
                }
            }
        }

        return highestRedCount * highestGreenCount * highestBlueCount;
    })
    .reduce((previousValue, currentValue) => previousValue + currentValue);

console.log(partTwo);