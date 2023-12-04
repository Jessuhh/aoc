import { getInput } from "utils";

// const input = getInput("2023/04/test.txt");
const input = getInput("2023/04/input.txt");

const partOne = input
    .map((line) => {
        const numbers = line.split(":")[1].trim().replaceAll("  ", " ").split("|");
        const winningNumbers = numbers[0]
            .trim()
            .split(" ")
            .map((number) => parseInt(number));
        const scratchedNumbers = numbers[1]
            .trim()
            .split(" ")
            .map((number) => parseInt(number));

        let points = 0;
        scratchedNumbers.forEach((number) => {
            if (winningNumbers.includes(number)) {
                points === 0 ? (points = 1) : (points *= 2);
            }
        });

        return points;
    })
    .reduce((previousValue, currentValue) => (previousValue += currentValue));

// console.log(partOne)

const cards = input.map((line) => {
    const numbers = line.split(":")[1].trim().replaceAll("  ", " ").split("|");
    const winningNumbers = numbers[0]
        .trim()
        .split(" ")
        .map((number) => parseInt(number));
    const scratchedNumbers = numbers[1]
        .trim()
        .split(" ")
        .map((number) => parseInt(number));

    let points = 0;
    scratchedNumbers.forEach((number) => {
        if (winningNumbers.includes(number)) {
            points++;
        }
    });

    return points;
});

function countCards(cardIndex: number) {
    let count = 0;

    const numberOfNewCards = cards[cardIndex];
    count += numberOfNewCards;

    for (let i = 1; i <= numberOfNewCards; i++) {
        count += countCards(cardIndex + i);
    }

    return count;
}

let cardCount = 0;
cards.forEach((_card, index) => {
    cardCount += countCards(index) + 1;
})

const partTwo = cardCount;
console.log(partTwo);
