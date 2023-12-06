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

    const seeds: Range[] = [];
    for (let i = 0; i < seedsRange.length; i += 2) {
        const from = seedsRange[i];
        const range = seedsRange[i + 1];
        seeds.push({ from, range });
    }
    // console.log(seeds);
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

    // const map = maps[0];
    maps.forEach((map) => {
        // console.log("New map ----------------------");
        // for (let i = 0; i < seeds.length; i++) {
        //     const seed = seeds[i];
        seeds.forEach((seed) => {
            let transformed = false;
            // console.log(`Seed: ${seed.from} -> ${seed.from + seed.range - 1} (${seed.range})`);
            map.forEach((transformer) => {
                if (transformed) return;
                // console.log(
                // `Transformer: ${transformer.source} -> ${transformer.source + transformer.range - 1} = ${
                // transformer.destination
                // } -> ${transformer.destination + transformer.range - 1} (${transformer.range})`
                // );
                const isStartInside =
                    seed.from >= transformer.source && seed.from < transformer.source + transformer.range;
                const end = seed.from + seed.range - 1;
                const isEndInside = end >= transformer.source && end < transformer.source + transformer.range;

                // Four cases:
                // Complete seed is inside range
                if (isStartInside && isEndInside) {
                    // console.log("Complete seed is inside range");
                    seed.from += transformer.destination - transformer.source;
                    // console.log(`Seed updated: ${seed.from} -> ${seed.from + seed.range - 1} (${seed.range})`);
                    transformed = true;
                    return;
                }
                // End of seed is inside range
                if (!isStartInside && isEndInside) {
                    // console.log("end of seed is inside range");
                    seeds.push({ from: seed.from, range: transformer.source - seed.from });
                    seed.range = seed.from + seed.range - 1 - transformer.source;
                    seed.from = transformer.destination;
                    transformed = true;
                    return;
                }
                // Start of seed is inside range
                if (isStartInside && !isEndInside) {
                    // console.log("Start of seed is inside range");
                    const from = transformer.source + transformer.range;
                    const to = seed.from + seed.range;
                    // console.log(`From: ${from} to: ${to}`)
                    const newSeed: Range = {
                        from: from,
                        range: to - from,
                    };
                    // console.log(
                    // `Seed added: ${newSeed.from} -> ${newSeed.from + newSeed.range - 1} (${newSeed.range})`
                    // );
                    seeds.push(newSeed);
                    seed.from = transformer.destination + seed.from - transformer.source;
                    seed.range = transformer.destination + transformer.range - seed.from;
                    // console.log(`Seed updated: ${seed.from} -> ${seed.from + seed.range - 1} (${seed.range})`);
                    transformed = true;
                    return;
                }
                // Middle of seed is inside range
                if (
                    !isStartInside &&
                    !isEndInside &&
                    seed.from < transformer.source &&
                    seed.from + seed.range - 1 > transformer.source + transformer.range - 1
                ) {
                    // console.log("Middle of seed is inside range");
                    // Add the end part as a new seed range
                    seeds.push({ from: seed.from, range: transformer.source - seed.from });
                    // Add the beginning part as a new seed range
                    seeds.push({
                        from: transformer.source + transformer.range,
                        range: seed.from + seed.range - 1 - transformer.source + transformer.range - 1,
                    });

                    seed.from = transformer.destination;
                    seed.range = transformer.range;
                    transformed = true;
                    return;
                }
                // console.log("Nothing happens to this seed in this transformer");
            });
            // console.log(`Becomes: ${seeds[i]}`);
        });
    });

    return Math.min(...seeds.map((seed) => seed.from));
}

// 3100559 is too low
// 9357724 is too low
console.log(partTwo());
