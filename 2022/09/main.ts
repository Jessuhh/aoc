import { getInput } from "utils";

// const input = getInput("2022/09/test.txt");
// const input = getInput("2022/09/test1.txt");
const input = getInput("2022/09/input.txt");

const part1 = () => {
    // Locations inside an array [x, y]
    const visitedPositions = ["0, 0"];
    const head = [0, 0];
    const tail = [0, 0];
    // console.log(`Head: ${head}, Tail: ${tail}`);

    input.forEach((motion) => {
        // Get the direction and amount
        const direction = motion.split(" ")[0];
        const amount = parseInt(motion.split(" ")[1]);

        // console.log(motion);

        for (let i = 0; i < amount; i++) {
            // Apply the motion to the head
            switch (direction) {
                case "R":
                    head[0]++;
                    break;
                case "L":
                    head[0]--;
                    break;
                case "U":
                    head[1]++;
                    break;
                case "D":
                    head[1]--;
                    break;
            }

            // Update tail position
            // Diagonal movement
            if (Math.abs(head[0] - tail[0]) > 1 && Math.abs(head[1] - tail[1]) === 1) {
                tail[0] += head[0] > tail[0] ? 1 : -1;
                tail[1] += head[1] > tail[1] ? 1 : -1;
            }

            if (Math.abs(head[0] - tail[0]) === 1 && Math.abs(head[1] - tail[1]) > 1) {
                tail[0] += head[0] > tail[0] ? 1 : -1;
                tail[1] += head[1] > tail[1] ? 1 : -1;
            }

            if (Math.abs(head[0] - tail[0]) > 1) {
                tail[0] += head[0] > tail[0] ? 1 : -1;
            }

            if (Math.abs(head[1] - tail[1]) > 1) {
                tail[1] += head[1] > tail[1] ? 1 : -1;
            }

            // Save the new position
            visitedPositions.push(`${tail[0]}, ${tail[1]}`);
            // console.log(`Head: ${head} | Tail: ${tail}`);
        }
    });

    // console.log(visitedPositions);
    return visitedPositions.filter((value, index, self) => self.indexOf(value) === index).length;
};

console.log(part1());

const part2 = () => {
    // Locations inside an array [x, y]
    const visitedPositions = ["0, 0"];
    const rope = [
        [0, 0], // Head
        [0, 0], // 1
        [0, 0], // 2
        [0, 0], // 3
        [0, 0], // 4
        [0, 0], // 5
        [0, 0], // 6
        [0, 0], // 7
        [0, 0], // 8
        [0, 0], // 9
    ];
    // console.log(`Head: ${head}, Tail: ${tail}`);

    input.forEach((motion) => {
        // Get the direction and amount
        const direction = motion.split(" ")[0];
        const amount = parseInt(motion.split(" ")[1]);

        // console.log(motion);

        for (let i = 0; i < amount; i++) {
            // Apply the motion to the head
            switch (direction) {
                case "R":
                    rope[0][0]++;
                    break;
                case "L":
                    rope[0][0]--;
                    break;
                case "U":
                    rope[0][1]++;
                    break;
                case "D":
                    rope[0][1]--;
                    break;
            }

            // Update tail positions
            for (let j = 1; j < rope.length; j++) {
                const knotToFollow = rope[j - 1];

                // Diagonal movement
                if (Math.abs(knotToFollow[0] - rope[j][0]) > 1 && Math.abs(knotToFollow[1] - rope[j][1]) === 1) {
                    rope[j][0] += knotToFollow[0] > rope[j][0] ? 1 : -1;
                    rope[j][1] += knotToFollow[1] > rope[j][1] ? 1 : -1;
                }

                if (Math.abs(knotToFollow[0] - rope[j][0]) === 1 && Math.abs(knotToFollow[1] - rope[j][1]) > 1) {
                    rope[j][0] += knotToFollow[0] > rope[j][0] ? 1 : -1;
                    rope[j][1] += knotToFollow[1] > rope[j][1] ? 1 : -1;
                }

                if (Math.abs(knotToFollow[0] - rope[j][0]) > 1) {
                    rope[j][0] += knotToFollow[0] > rope[j][0] ? 1 : -1;
                }

                if (Math.abs(knotToFollow[1] - rope[j][1]) > 1) {
                    rope[j][1] += knotToFollow[1] > rope[j][1] ? 1 : -1;
                }
            }

            // Save the new position
            visitedPositions.push(`${rope[9][0]}, ${rope[9][1]}`);
            // console.log(`Head: ${head} | Tail: ${tail}`);
        }
    });

    // console.log(visitedPositions);
    return visitedPositions.filter((value, index, self) => self.indexOf(value) === index).length;
};

console.log(part2());
