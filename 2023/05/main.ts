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

    // const map = maps[0];
    maps.forEach((map) => {
        console.log("New map ----------------------")
    seeds.forEach((seed) => {
        let transformed = false;
        console.log(`Seed: ${seed.from} -> ${seed.from + seed.range - 1} (${seed.range})`);
        map.forEach((transformer) => {
            console.log(
                `Transformer: ${transformer.source} -> ${transformer.source + transformer.range - 1} = ${
                    transformer.destination
                } -> ${transformer.destination + transformer.range - 1} (${transformer.range})`
            );
            if (transformed) return;
            // We have a seed and a transformer.
            // Every seed is a range
            // Check if the range of the transformer overlaps the range of the seed (the seed start should be below the transformer end. The seed end should be higher than the seeds start)
            // If so, create new ranges accordingly
            // If not, do nothing
            const isStartInside = seed.from >= transformer.source && seed.from < transformer.source + transformer.range;
            const end = seed.from + seed.range - 1;
            const isEndInside = end >= transformer.source && end < transformer.source + transformer.range;

            // Four cases:
            // TODO: This case seems to work incorrectly
            // Complete seed is inside range
            if (isStartInside && isEndInside) {
                console.log("Complete seed is inside range");
                seed.from += transformer.destination - transformer.source;
                transformed = true;
                return;
            }
            // End of seed is inside range
            if (!isStartInside && isEndInside) {
                console.log("end of seed is inside range");
                seeds.push({ from: seed.from, range: transformer.source - seed.from });
                seed.range = seed.from + seed.range - 1 - transformer.source;
                seed.from = transformer.destination;
                transformed = true;
                return;
            }
            // Start of seed is inside range
            if (isStartInside && !isEndInside) {
                console.log("Start of seed is inside range");
                seeds.push({
                    from: transformer.source + transformer.range,
                    range: seed.from + seed.range - 1 - transformer.source + transformer.range - 1,
                });
                seed.from = transformer.destination + seed.from - transformer.source;
                seed.range = transformer.destination + transformer.range - 1 - seed.from;
                transformed = true;
                return;
            }
            // Middle of seed is inside range
            if (!isStartInside && !isEndInside && seed.from < transformer.source && seed.from + seed.range - 1 > transformer.source + transformer.range - 1) {
                console.log("Middle of seed is inside range");
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
            console.log("Nothing happens to this seed");
        });
        // console.log(`Becomes: ${seeds[i]}`);
    });
    });

    // for (let i = 0; i < seeds.length; i++) {
    //     // console.log(`Seed: ${seeds[i]}`);

    //     maps.forEach((map) => {
    //         let transformed = false;
    //         map.forEach((transformer) => {
    //             if (transformed) return;
    //             if (transformer.source <= seeds[i] && seeds[i] < transformer.source + transformer.range) {
    //                 seeds[i] = transformer.destination + (seeds[i] - transformer.source);
    //                 transformed = true;
    //             }
    //         });
    //         // console.log(`Becomes: ${seeds[i]}`);
    //     });
    // }

    return seeds;
    // return Math.min(...seeds);
}

console.log(partTwo());
