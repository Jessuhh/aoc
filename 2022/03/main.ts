import { getInput } from "utils";

// const input = getInput("2022/03/test.txt");
const input = getInput("2022/03/input.txt");

// Thank you Joël ^^
function letterToNumber(letter: string) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet.indexOf(letter) + 1;
}

const part1 = () => {
    let items: string[] = [];
    items = items.concat(
        ...input.map((rucksack) => {
            const compartment1 = rucksack.slice(0, rucksack.length / 2).split("");
            const compartment2 = rucksack.slice(rucksack.length / 2).split("");
            return Array.from(new Set(compartment1.filter((item) => compartment2.includes(item))));
        })
    );

    return items.map((item) => letterToNumber(item)).reduce((a, b) => a + b, 0);
};

// console.log(part1());

const part2 = () => {
    let badges: string[] = [];
    badges = badges.concat(
        ...input.map((rucksack, index) => {
            if (index % 3 !== 0) return [];
            const rucksack1 = rucksack.split("");
            const rucksack2 = input[index + 1].split("");
            const rucksack3 = input[index + 2].split("");
            return (
                Array.from(new Set(rucksack1.filter((item) => rucksack2.includes(item) && rucksack3.includes(item)))) ??
                []
            );
        })
    );

    return badges.map((badge) => letterToNumber(badge)).reduce((a, b) => a + b, 0);
};

console.log(part2());
