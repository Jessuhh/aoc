import { getInput } from "utils";

// Test input
/*
const input = getInput("2022/05/test.txt").slice(5);
const stacks = [["Z", "N"], ["M", "C", "D"], ["P"]];
*/

// Real input
const input = getInput("2022/05/input.txt").slice(10);
const stacks = [
    ["Q", "W", "P", "S", "Z", "R", "H", "D"],
    ["V", "B", "R", "W", "Q", "H", "F"],
    ["C", "V", "S", "H"],
    ["H", "F", "G"],
    ["P", "G", "J", "B", "Z"],
    ["Q", "T", "J", "H", "W", "F", "L"],
    ["Z", "T", "W", "D", "L", "V", "J", "N"],
    ["D", "T", "Z", "C", "J", "G", "H", "F"],
    ["W", "P", "V", "M", "B", "H"],
];

const part1 = () => {
    input.forEach((line) => {
        const instructions = line.split(" ");
        const amount = parseInt(instructions[1]);
        const from = parseInt(instructions[3]) - 1;
        const to = parseInt(instructions[5]) - 1;
        for (let i = 0; i < amount; i++) {
            stacks[to].push(stacks[from].pop() ?? "");
        }
    });
    return stacks.map((stack) => stack.pop()).join("");
};

// console.log(part1());

const part2 = () => {
    input.forEach((line) => {
        const instructions = line.split(" ");
        const amount = parseInt(instructions[1]);
        const from = parseInt(instructions[3]) - 1;
        const to = parseInt(instructions[5]) - 1;
        stacks[to].push(...stacks[from].splice(-amount));
    });
    return stacks.map((stack) => stack.pop()).join("");
};

console.log(part2());
