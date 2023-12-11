import { getInput } from "utils";

// const input = getInput("2023/11/test.txt");
const input = getInput("2023/11/input.txt");


function partOne() {
    const map: string[][] = [];
    
    input.forEach((line) => {
        if (!line.includes("#")) {
            map.push(line.split(""));
        }
    
        map.push(line.split(""));
    });

    for (let i = 0; i < map[0].length; i++) {
        const column: string[] = [];
        map.forEach((row) => {
            column.push(row[i]);
        });

        if (!column.includes("#")) {
            map.forEach((row) => {
                row.splice(i, 0, ".");
            });
            i++;
        }
    }

    type Galaxy = {
        name: string;
        row: number;
        column: number;
    };

    const galaxies: Galaxy[] = [];

    map.forEach((row, rowIndex) => {
        row.forEach((dataPoint, columnIndex) => {
            if (dataPoint === "#") {
                galaxies.push({
                    name: (galaxies.length + 1).toString(),
                    row: rowIndex,
                    column: columnIndex,
                });
            }
        });
    });

    // console.log(map.map((row) => row.join(" ")).join("\n"));
    // console.log(galaxies);

    let sumOfShortestPaths = 0;
    galaxies.forEach((a, index) => {
        for (let i = index + 1; i < galaxies.length; i++) {
            const b = galaxies[i];
            sumOfShortestPaths += Math.abs(b.row - a.row) + Math.abs(b.column - a.column);
        }
    });

    return sumOfShortestPaths;
}

// console.log(partOne());

function partTwo() {
    const map: string[][] = [];
    const emptyRows: number[] = [];
    const emptyColumns: number[] = [];

    input.forEach((line, index) => {
        if (!line.includes("#")) {
            emptyRows.push(index);
        }

        map.push(line.split(""));
    });

    for (let i = 0; i < map[0].length; i++) {
        const column: string[] = [];
        map.forEach((row) => {
            column.push(row[i]);
        });

        if (!column.includes("#")) {
            emptyColumns.push(i);
        }
    }

    console.log(emptyRows);
    console.log(emptyColumns);

    type Galaxy = {
        name: string;
        row: number;
        column: number;
    };

    const galaxies: Galaxy[] = [];

    map.forEach((row, rowIndex) => {
        row.forEach((dataPoint, columnIndex) => {
            if (dataPoint === "#") {
                galaxies.push({
                    name: (galaxies.length + 1).toString(),
                    row: rowIndex,
                    column: columnIndex,
                });
            }
        });
    });

    // console.log(map.map((row) => row.join(" ")).join("\n"));
    // console.log(galaxies);

    let sumOfShortestPaths = 0;
    const emptyMultiplier = 1000000;
    galaxies.forEach((a, index) => {
        for (let i = index + 1; i < galaxies.length; i++) {
            const b = galaxies[i];
            sumOfShortestPaths += Math.abs(b.row - a.row) + Math.abs(b.column - a.column);

            const minRow = Math.min(a.row, b.row);
            const maxRow = Math.max(a.row, b.row);
            const rowCount = emptyRows.filter((value) => minRow < value && value < maxRow).length;
            sumOfShortestPaths += rowCount * (emptyMultiplier - 1);

            const minColumn = Math.min(a.column, b.column);
            const maxColumn = Math.max(a.column, b.column);
            const columnCount = emptyColumns.filter((value) => minColumn < value && value < maxColumn).length;
            sumOfShortestPaths += columnCount * (emptyMultiplier - 1);
        }
    });


    return sumOfShortestPaths;
}

console.log(partTwo());