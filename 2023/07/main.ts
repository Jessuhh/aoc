import { getInput } from "utils";

// const input = getInput("2023/07/test.txt");
const input = getInput("2023/07/input.txt");

enum types {
    FIVE_OF_A_KIND,
    FOUR_OF_A_KIND,
    FULL_HOUSE,
    THREE_OF_A_KIND,
    TWO_PAIR,
    ONE_PAIR,
    HIGH_CARD,
}

type Card = {
    hand: string;
    bid: number;
    type: types;
};

function compareCards(cardOne: string, cardTwo: string) {
    const cards = ["A", "K", "Q", "J", "T"].reverse();
    const a = cardOne.split("").map((card) => {
        if (cards.includes(card)) {
            return 10 + cards.indexOf(card);
        }

        return parseInt(card);
    });
    const b = cardTwo.split("").map((card) => {
        if (cards.includes(card)) {
            return 10 + cards.indexOf(card);
        }

        return parseInt(card);
    });

    if (a[0] !== b[0]) return a[0] - b[0];
    if (a[1] !== b[1]) return a[1] - b[1];
    if (a[2] !== b[2]) return a[2] - b[2];
    if (a[3] !== b[3]) return a[3] - b[3];
    if (a[4] !== b[4]) return a[4] - b[4];
    return a[5] - b[5];
}

const cards: Card[] = input
    .map((line) => {
        const hand = line.split(" ")[0];
        const bid = parseInt(line.split(" ")[1]);

        const values = hand.split("");
        const cards: { card: string; amount: number }[] = [];
        values.forEach((card) => {
            const existingCard = cards.find((x) => {
                return x.card === card;
            });
            if (existingCard) {
                existingCard.amount++;
            } else {
                cards.push({ card, amount: 1 });
            }
        });

        cards.sort((a, b) => {
            return b.amount - a.amount;
        });

        let type;

        if (cards.length === 1) {
            type = types.FIVE_OF_A_KIND;
        } else if (cards.length === 2 && cards[0].amount === 4) {
            type = types.FOUR_OF_A_KIND;
        } else if (cards.length === 2 && cards[0].amount === 3 && cards[1].amount === 2) {
            type = types.FULL_HOUSE;
        } else if (cards.length === 3 && cards[0].amount === 3) {
            type = types.THREE_OF_A_KIND;
        } else if (cards.length === 3 && cards[0].amount === 2 && cards[1].amount === 2) {
            type = types.TWO_PAIR;
        } else if (cards.length === 4) {
            type = types.ONE_PAIR;
        } else {
            type = types.HIGH_CARD;
        }

        return {
            hand,
            bid,
            type,
        };
    })
    .sort((a, b) => {
        if (a.type === b.type) {
            return compareCards(b.hand, a.hand);
        }
        return a.type - b.type;
    }).reverse();

// console.log(cards);
// console.log(cards.map((card, index) => card.bid * (index + 1)));
const partOne = cards
    .map((card, index) => card.bid * (index + 1))
    .reduce((previousValue, currentValue) => previousValue + currentValue);

// 252643164 is too high
// 252509658 is too high
// 251848106 is too high
console.log(partOne);
