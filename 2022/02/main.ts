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
            const moves = round.split(" ");
            const opponent = moves[0];
            const you = moves[1];

            let points = 1;
            if (you === YOU.PAPER) points = 2;
            if (you === YOU.SCISSORS) points = 3;

            if (
                (opponent === OPPONENT.ROCK && you === YOU.ROCK) ||
                (opponent === OPPONENT.PAPER && you === YOU.PAPER) ||
                (opponent === OPPONENT.SCISSORS && you === YOU.SCISSORS)
            ) {
                return (points += 3);
            }

            if (
                (opponent === OPPONENT.ROCK && you === YOU.PAPER) ||
                (opponent === OPPONENT.PAPER && you === YOU.SCISSORS) ||
                (opponent === OPPONENT.SCISSORS && you === YOU.ROCK)
            ) {
                return (points += 6);
            }

            return points;
        })
        .reduce((a, b) => a + b, 0);
};

console.log(getFinalScore());
