import { getInput } from "utils";

// const input = getInput("2022/02/test.txt");
const input = getInput("2022/02/input.txt");

const OPPONENT = {
    ROCK: "A",
    PAPER: "B",
    SCISSORS: "C",
};

const YOU = {
    ROCK: "X",
    PAPER: "Y",
    SCISSORS: "Z",
};

// Part 1
const getFinalScore = () => {
    return input
        .map((round) => {
            let points = 1;
            switch (round.split(" ")[1]) {
                case YOU.PAPER:
                    points = 2;
                    break;
                case YOU.SCISSORS:
                    points = 3;
                    break;
            }

            // console.log(round);
            // console.log(points);

            switch (round) {
                // Draws
                case `${OPPONENT.ROCK} ${YOU.ROCK}`:
                case `${OPPONENT.PAPER} ${YOU.PAPER}`:
                case `${OPPONENT.SCISSORS} ${YOU.SCISSORS}`:
                    return points + 3;
                // wins
                case `${OPPONENT.SCISSORS} ${YOU.ROCK}`:
                case `${OPPONENT.ROCK} ${YOU.PAPER}`:
                case `${OPPONENT.PAPER} ${YOU.SCISSORS}`:
                    return points + 6;
                default:
                    return points;
            }
        })
        .reduce((a, b) => a + b, 0);
};

console.log(getFinalScore());
