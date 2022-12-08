import { getInput } from "utils";

// const input = getInput("2022/08/test.txt").map((line) => line.split(""));
const input = getInput("2022/08/input.txt").map((line) => line.split(""));

const part1 = () => {
    let count = 0;
    input.forEach((treeRow, row) => {
        treeRow.forEach((treeHeight, col) => {
            // Trees on the edge of the map are always visible from the outside
            if (row === 0 || row === input.length - 1 || col === 0 || col === treeRow.length - 1) {
                count++;
                return;
            }

            // Check to the left
            let treeIsVisible = true;
            for (let k = col - 1; k >= 0; k--) {
                if (input[row][k] >= treeHeight) {
                    treeIsVisible = false;
                    break;
                }
            }
            if (treeIsVisible) {
                count++;
                return;
            }

            // Check to the right
            treeIsVisible = true;
            for (let k = col + 1; k < treeRow.length; k++) {
                if (input[row][k] >= treeHeight) {
                    treeIsVisible = false;
                    break;
                }
            }
            if (treeIsVisible) {
                count++;
                return;
            }

            // Check above
            treeIsVisible = true;
            for (let k = row - 1; k >= 0; k--) {
                if (input[k][col] >= treeHeight) {
                    treeIsVisible = false;
                    break;
                }
            }
            if (treeIsVisible) {
                count++;
                return;
            }

            // Check below
            treeIsVisible = true;
            for (let k = row + 1; k < input.length; k++) {
                if (input[k][col] >= treeHeight) {
                    treeIsVisible = false;
                    break;
                }
            }
            if (treeIsVisible) {
                count++;
                return;
            }
        });
    });

    return count;
};

console.log(part1());

const part2 = () => {
    let highestScenicScore = 0;
    input.forEach((treeRow, row) => {
        treeRow.forEach((treeHeight, col) => {
            // Trees on the edge of the map always have a scenic score of 0 so we ignore them
            if (row === 0 || row === input.length - 1 || col === 0 || col === treeRow.length - 1) {
                return;
            }

            // Check to the left
            let scenicScore = 1;
            let viewDistance = 0;
            for (let k = col - 1; k >= 0; k--) {
                viewDistance++;
                if (input[row][k] >= treeHeight) {
                    break;
                }
            }
            scenicScore *= viewDistance;

            // Check to the right
            viewDistance = 0;
            for (let k = col + 1; k < treeRow.length; k++) {
                viewDistance++;
                if (input[row][k] >= treeHeight) {
                    break;
                }
            }
            scenicScore *= viewDistance;

            // Check above
            viewDistance = 0;
            for (let k = row - 1; k >= 0; k--) {
                viewDistance++;
                if (input[k][col] >= treeHeight) {
                    break;
                }
            }
            scenicScore *= viewDistance;

            // Check below
            viewDistance = 0;
            for (let k = row + 1; k < input.length; k++) {
                viewDistance++;
                if (input[k][col] >= treeHeight) {
                    break;
                }
            }
            scenicScore *= viewDistance;

            if (scenicScore > highestScenicScore) {
                highestScenicScore = scenicScore;
            }
        });
    });

    return highestScenicScore;
};

console.log(part2());
