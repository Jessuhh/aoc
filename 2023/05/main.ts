import { getInput } from "utils";

const input = getInput("2023/05/test.txt", "\n\n");
// const input = getInput("2023/05/input.txt", "\n\n");

function partOne() {
    const seeds = input[0]
        .substring(7)
        .split(" ")
        .map((seed) => parseInt(seed));
    input.splice(0, 1);

    type Transformer = {
        source: number;
        destination: number;
        range: number;
    };

    type Map = Transformer[];

    const maps: Map[] = input.map((line) => {
        const lines = line.split("\n");
        lines.splice(0, 1);

        return lines.map((line) => {
            const values = line.split(" ").map((value) => parseInt(value));
            return { destination: values[0], source: values[1], range: values[2] };
        });
    });

    for (let i = 0; i < seeds.length; i++) {
        // console.log(`Seed: ${seeds[i]}`);

        maps.forEach((map) => {
            let transformed = false;
            map.forEach((transformer) => {
                if (transformed) return;
                if (transformer.source <= seeds[i] && seeds[i] < transformer.source + transformer.range) {
                    seeds[i] = transformer.destination + (seeds[i] - transformer.source);
                    transformed = true;
                }
            });
            // console.log(`Becomes: ${seeds[i]}`);
        });
    }

    return Math.min(...seeds);
}

// console.log(partOne());

function partTwo() {
    const seedsRange = input[0]
        .substring(7)
        .split(" ")
        .map((seed) => parseInt(seed));

    // TODO: find something better than an array / find a shortcut, don't calculate for every seed
    // TODO: use ranges instead of actual seeds.
    const seeds: number[] = [];
    for (let i = 0; i < seedsRange.length; i+=2) {
        const start = seedsRange[i];
        const end = start + seedsRange[i + 1];
        console.log(`From: ${start} To: ${end}`)
        for(let j = start; j < end; j++) {
            seeds.push(j);
        }
    }
    console.log(seeds);
    input.splice(0, 1);

    type Transformer = {
        source: number;
        destination: number;
        range: number;
    };

    type Map = Transformer[];

    const maps: Map[] = input.map((line) => {
        const lines = line.split("\n");
        lines.splice(0, 1);

        return lines.map((line) => {
            const values = line.split(" ").map((value) => parseInt(value));
            return { destination: values[0], source: values[1], range: values[2] };
        });
    });

    for (let i = 0; i < seeds.length; i++) {
        // console.log(`Seed: ${seeds[i]}`);

        maps.forEach((map) => {
            let transformed = false;
            map.forEach((transformer) => {
                if (transformed) return;
                if (transformer.source <= seeds[i] && seeds[i] < transformer.source + transformer.range) {
                    seeds[i] = transformer.destination + (seeds[i] - transformer.source);
                    transformed = true;
                }
            });
            // console.log(`Becomes: ${seeds[i]}`);
        });
    }

    return Math.min(...seeds);
}

console.log(partTwo());