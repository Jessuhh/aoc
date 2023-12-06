import { getInput } from "utils";

// Time pressed = speed

type Race = {
    time: number;
    record: number;
};

/*
    Time:      7  15   30
    Distance:  9  40  200
*/

// const races: Race[] = [
//     { time: 7, record: 9 },
//     { time: 15, record: 40 },
//     { time: 30, record: 200 },
// ];

/*
    Time:        35     93     73     66
    Distance:   212   2060   1201   1044
*/

const races: Race[] = [
    { time: 35, record: 212 },
    { time: 93, record: 2060 },
    { time: 73, record: 1201 },
    { time: 66, record: 1044 },
];

function calculateDistance(speed: number, raceTime: number) {
    return (raceTime - speed) * speed;
}

const partOne = races
    .map((race) => {
        // console.log(`Race: ${race.time}`)
        let count = 0;
        for (let i = 0; i <= race.time; i++) {
            if (calculateDistance(i, race.time) > race.record) count++;
        }
        return count;
    })
    .reduce((previousValue, currentValue) => previousValue * currentValue);

// console.log(partOne);

// const race: Race = { time: 71530, record: 940200 };
const race: Race = { time: 35937366, record: 212206012011044 };

let partTwo = 0;
for (let i = 0; i <= race.time; i++) {
    if (calculateDistance(i, race.time) > race.record) partTwo++;
}

console.log(partTwo);
