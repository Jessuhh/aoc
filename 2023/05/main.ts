import { getInput } from "utils";

// const input = getInput("2023/05/test.txt", "\n\n");
const input = getInput("2023/05/input.txt", "\n\n");

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

    type Range = {
        from: number;
        range: number;
    };

    const seedRanges: Range[] = [];
    for (let i = 0; i < seedsRange.length; i += 2) {
        const from = seedsRange[i];
        const range = seedsRange[i + 1];
        seedRanges.push({ from, range });
    }
    console.log(seedRanges);
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
    }).reverse();

    let lowest;
    let location = 1;
    while (!lowest) {
        // console.log("");
        // console.log(`Trying location: ${location}`);
        let seed = location;

        maps.forEach((map) => {
            // console.log(`------- New Map ---------`)
            // console.log(`Seed: ${seed}`)
            let done = false;
            map.reverse().forEach((transformer) => {
                if (done) return;
                // console.log(`Transformer: ${transformer.source} -> ${transformer.source + transformer.range - 1} = ${transformer.destination} -> ${transformer.destination + transformer.range - 1} (${transformer.range} | Δ${transformer.destination - transformer.source})`)
                if (transformer.destination <= seed && seed < transformer.destination + transformer.range) {
                    const difference = transformer.destination - transformer.source;
                    // console.log(`Seed transformed from: ${seed} to: ${seed + difference} `);
                    seed -= difference;
                    done = true;
                }
            });
        });

        seedRanges.forEach((seedRange) => {
            // console.log(`Seedrange: ${seedRange.from} -> ${seedRange.from + seedRange.range - 1} (${seedRange.range})`)
            if (seedRange.from < seed && seed < seedRange.from + seedRange.range) {
                lowest = location;
            }
        });
        // console.log(`Final seed: ${seed}`)
        location++;
    }
    return lowest;
}

// 3100559 is too low
// 9357724 is too low
console.log(partTwo());
