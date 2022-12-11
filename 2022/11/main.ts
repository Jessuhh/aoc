import { getInput } from "utils";
import Monkey, { Operation, Test } from "./Monkey.ts";

// const input = getInput("2022/11/test.txt", "\n\n");
const input = getInput("2022/11/input.txt", "\n\n");

// Input parsing
const Monkeys = input.map((monkey) => {
    const values = monkey.split("\n").map((line) => line.trim());
    // Starting items
    const startingItems = new Array<number>();
    values[1].split(" ").forEach((value, index) => {
        if (index > 1) startingItems.push(parseInt(value));
    });
    // Operation
    const operation: Operation = {
        operator: values[2].split(" ")[4],
        value1: values[2].split(" ")[3] === "old" ? "old" : parseInt(values[2].split(" ")[3].trim()),
        value2: values[2].split(" ")[5] === "old" ? "old" : parseInt(values[2].split(" ")[5].trim()),
    };
    // Test
    const test: Test = {
        value: parseInt(values[3].split(" ")[3].trim()),
        true: parseInt(values[4].split(" ")[5].trim()),
        false: parseInt(values[5].split(" ")[5].trim()),
    };
    return new Monkey(startingItems, operation, test);
});

const part1 = () => {
    // 20 rounds
    for (let i = 0; i < 20; i++) {
        Monkeys.forEach((monkey) => {
            monkey.items.forEach((item) => {
                monkey.inspectCount++;
                // Operation
                let newWorryLevel = monkey.executeOperation(item);
                // Divide by 3
                newWorryLevel = Math.floor(Number(newWorryLevel) / 3);
                // Execute test
                const nextMonkey = monkey.executeTest(newWorryLevel);
                // Remove item from current monkey
                monkey.items = monkey.items.slice(1);
                // Give to next monkey
                Monkeys[nextMonkey].items.push(newWorryLevel);
            });
        });
    }
    const sorted = Monkeys.map((monkey) => monkey.inspectCount).sort((a, b) => b - a);
    return sorted[0] * sorted[1];
};

// console.log(part1());

const MagicNumber = Monkeys.map((monkey) => monkey.test.value).reduce((a, b) => a * b);

const part2 = () => {
    // 10000 rounds
    for (let i = 1; i <= 10000; i++) {
        Monkeys.forEach((monkey) => {
            monkey.items.forEach((item) => {
                // Operation
                let newWorryLevel = monkey.executeOperation(item);
                // Try to keep big number small(er)
                newWorryLevel %= MagicNumber;
                // Execute test
                const nextMonkey = monkey.executeTest(newWorryLevel);
                // Remove item from current monkey
                monkey.items = monkey.items.slice(1);
                // Give to next monkey
                Monkeys[nextMonkey].items.push(newWorryLevel);
                monkey.inspectCount++;
            });
        });
    }
    const sorted = Monkeys.map((monkey) => monkey.inspectCount).sort((a, b) => b - a);
    console.log(sorted);
    return sorted[0] * sorted[1];
};

console.log(part2());
