import { getInput } from "utils";

// const input = getInput("2023/08/test.txt", "\n\n");
const input = getInput("2023/08/input.txt", "\n\n");

type Element = {
    element: string;
    left: string;
    right: string;
};

let instructions = input[0];
const network = input[1].split("\n");

console.log(instructions);

const elements: Element[] = network.map((element) => {
    return {
        element: element.substring(0, 3),
        left: element.substring(7, 10),
        right: element.substring(12, 15),
    };
});

// console.log(elements);
function partOne() {
    let currentElement = "AAA";
    let steps = 0;

    while (currentElement !== "ZZZ") {
        if (steps > instructions.length - 1) instructions += instructions.repeat(1);
        const instruction = instructions[steps];

        const element = elements.find((element) => element.element === currentElement);
        if (instruction === "L") {
            currentElement = element?.left ?? "ERROR";
        }

        if (instruction === "R") {
            currentElement = element?.right ?? "ERROR";
        }
        steps++;

        if (currentElement === "ERROR") {
            console.log("Big oopsie");
        }
        // console.log(steps);
    }
    return steps;
}

// console.log(partOne());

// TODO: detect loops
// Calculate when in a loop an element is at an element ending on Z
// Calculate this for every element loop
// Calculate where all the elements end on Z
function partTwo() {
    let currentElements = elements.filter((element) => element.element[2] === "A");
    // console.log(currentElements);
    let steps = 0;

    const allElementsEndWithZ = (elements: Element[]) => elements.every((element) => element.element[2] === "Z");
    while (!allElementsEndWithZ(currentElements)) {
        if (steps > instructions.length - 1) instructions += instructions.repeat(1);
        const instruction = instructions[steps];
        // console.log(steps);
        // console.log(currentElements);
        // console.log(instruction);

        const newElements: Element[] = [];
        currentElements.forEach((currentElement) => {
            if (instruction === "L") {
                newElements.push(
                    elements.find((element) => element.element === currentElement.left) ?? {
                        element: "ERROR",
                        left: "ERROR",
                        right: "ERROR",
                    }
                );
            }

            if (instruction === "R") {
                newElements.push(
                    elements.find((element) => element.element === currentElement.right) ?? {
                        element: "ERROR",
                        left: "ERROR",
                        right: "ERROR",
                    }
                );
            }
        });

        steps++;
        currentElements = newElements;
        // console.log(steps);

        if (
            currentElements.includes({
                element: "ERROR",
                left: "ERROR",
                right: "ERROR",
            })
        ) {
            console.log("Big oopsie");
        }
    }
    return steps;
}

console.log(partTwo());
