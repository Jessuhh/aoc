import { getInput } from "utils";

// const input = getInput("2022/10/test.txt");
const input = getInput("2022/10/input.txt");

const part1 = () => {
    const cycles = [20, 60, 100, 140, 180, 220];
    let signalStrength = 0;
    let X = 1;
    let cycle = 1;
    input.forEach((line) => {
        // noop
        if (line === "noop") {
            checkCyle(cycle, X);
            cycle++;
        }

        // addx
        if (line.startsWith("addx")) {
            const V = parseInt(line.split(" ")[1]);
            checkCyle(cycle, X);
            cycle++;
            checkCyle(cycle, X);
            X += V;
            cycle++;
        }
    });

    function checkCyle(cycle: number, X: number) {
        if (cycles.includes(cycle)) {
            console.log(`Cycle: ${cycle}, X: ${X}, Signal Strength: ${cycle * X}`);
            signalStrength += cycle * X;
        }
    }

    return signalStrength;
};

// console.log(part1());

const part2 = () => {
    let X = 1;
    let cycle = 1;
    let pixel = 0;
    const screen = [""];
    input.forEach((line) => {
        // noop
        if (line === "noop") {
            draw();
            checkCyle();
            pixel++;
            cycle++;
        }

        // addx
        if (line.startsWith("addx")) {
            const V = parseInt(line.split(" ")[1]);
            draw();
            checkCyle();
            pixel++;
            cycle++;
            draw();
            checkCyle();
            X += V;
            pixel++;
            cycle++;
        }
    });

    function checkCyle() {
        if (cycle % 40 === 0) {
            // New screen line
            screen.push("");
            pixel = -1;
        }
    }

    function draw() {
        if (pixel === X - 1 || pixel === X || pixel === X + 1) {
            screen[screen.length - 1] += "#";
        } else {
            screen[screen.length - 1] += ".";
        }
    }

    screen.forEach((line) => {
        console.log(line);
    });
};

part2();
