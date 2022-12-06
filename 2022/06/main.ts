import { getInput } from "utils";

// const input = getInput("2022/06/test.txt")[0].split("");
const input = getInput("2022/06/input.txt")[0].split("");

// From: https://stackoverflow.com/questions/33656708/check-for-repeated-characters-in-a-string-javascript
function hasRepeats(string: string) {
    return /(.).*\1/.test(string);
}

const part1 = () => {
    let indexOfStartOfPacket = 0;
    input.some((_, index) => {
        if (index < 4) return;
        const startOfPacketMarker = input.slice(index - 4, index).join("");
        if (!hasRepeats(startOfPacketMarker)) {
            indexOfStartOfPacket = index;
            return true;
        }
    });
    return indexOfStartOfPacket;
};

// console.log(part1());

const part2 = () => {
    let indexOfStartOfPacket = 0;
    input.some((_, index) => {
        if (index < 14) return;
        const startOfPacketMarker = input.slice(index - 14, index).join("");
        if (!hasRepeats(startOfPacketMarker)) {
            indexOfStartOfPacket = index;
            return true;
        }
    });
    return indexOfStartOfPacket;
};

console.log(part2());
