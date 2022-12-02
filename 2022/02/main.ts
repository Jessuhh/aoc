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

// console.log(getFinalScore());

const RESULT = {
    LOSE: "X",
    DRAW: "Y",
    WIN: "Z",
};

// Rock = 1
// Paper = 2
// Scissors = 3

// Part 2
const getFinalScorePart2 = () => {
    return input
        .map((round) => {
            switch (round) {
                // Rock
                case `${OPPONENT.ROCK} ${RESULT.LOSE}`:
                    return 0 + 3;
                case `${OPPONENT.ROCK} ${RESULT.DRAW}`:
                    return 3 + 1;
                case `${OPPONENT.ROCK} ${RESULT.WIN}`:
                    return 6 + 2;
                // Paper
                case `${OPPONENT.PAPER} ${RESULT.LOSE}`:
                    return 0 + 1;
                case `${OPPONENT.PAPER} ${RESULT.DRAW}`:
                    return 3 + 2;
                case `${OPPONENT.PAPER} ${RESULT.WIN}`:
                    return 6 + 3;
                // Scissors
                case `${OPPONENT.SCISSORS} ${RESULT.LOSE}`:
                    return 0 + 2;
                case `${OPPONENT.SCISSORS} ${RESULT.DRAW}`:
                    return 3 + 3;
                case `${OPPONENT.SCISSORS} ${RESULT.WIN}`:
                    return 6 + 1;
            }

            // Should never get here
            return 0;
        })
        .reduce((a, b) => a + b, 0);
};

console.log(getFinalScorePart2());
