import { getInput } from "utils";

// const input = getInput("2022/04/test.txt");
const input = getInput("2022/04/input.txt");

const part1 = () => {
    return input
        .map((pair): number => {
            const ranges = pair.split(",").map((range) => range.split("-").map((num) => parseInt(num)));
            // First range containing the second range
            if (ranges[0][0] <= ranges[1][0] && ranges[1][1] <= ranges[0][1]) return 1;
            // Second range containing the first range
            if (ranges[1][0] <= ranges[0][0] && ranges[0][1] <= ranges[1][1]) return 1;
            return 0;
        })
        .reduce((a, b) => a + b, 0);
};

console.log(part1());

const part2 = () => {
    return input
        .map((pair): number => {
            const ranges = pair.split(",").map((range) => range.split("-").map((num) => parseInt(num)));
            // First range overlapping the second range
            if (ranges[0][0] <= ranges[1][0] && ranges[1][0] <= ranges[0][1]) return 1;
            if (ranges[0][0] <= ranges[1][1] && ranges[1][1] <= ranges[0][1]) return 1;
            // Second range overlapping the first range
            if (ranges[1][0] <= ranges[0][0] && ranges[0][0] <= ranges[1][1]) return 1;
            if (ranges[1][0] <= ranges[0][1] && ranges[0][1] <= ranges[1][1]) return 1;
            return 0;
        })
        .reduce((a, b) => a + b, 0);
};

console.log(part2());
