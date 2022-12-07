import { getInput } from "utils";

// const input = getInput("2022/07/test.txt");
const input = getInput("2022/07/input.txt");

type Directory = {
    parent?: Directory;
    files: Record<string, number>;
    directories: Record<string, Directory>;
};

const root: Directory = {
    files: {},
    directories: {},
};

let currentDirectory = root;
const part1 = () => {
    // Parse input to directory structure
    input.forEach((line) => {
        // Every line that doesn't start with $ is a file or directory
        if (!line.startsWith("$")) {
            // directories
            if (line.startsWith("dir")) {
                const directoryName = line.split(" ")[1];
                const directory = currentDirectory.directories[directoryName];
                if (!directory) {
                    currentDirectory.directories[directoryName] = {
                        parent: currentDirectory,
                        files: {},
                        directories: {},
                    };
                }
                return;
            }

            // Files
            const size = parseInt(line.split(" ")[0]);
            const fileName = line.split(" ")[1];
            currentDirectory.files[fileName] = size;
            return;
        }

        // Commands
        if (line.startsWith("$ cd")) {
            const directoryName = line.split(" ")[2];
            if (directoryName === "/") {
                currentDirectory = root;
                return;
            }
            if (directoryName === "..") {
                currentDirectory = currentDirectory.parent!;
                return;
            }

            const directory = currentDirectory.directories[directoryName];
            if (!directory) {
                currentDirectory.directories[directoryName] = { parent: currentDirectory, files: {}, directories: {} };
            }
            currentDirectory = directory;
            return;
        }
    });

    let sum = 0;
    // Calculate total size of each directory
    const calculateSize = (directory: Directory) => {
        let size = 0;
        size += Object.values(directory.files).reduce((a, b) => a + b, 0);
        size += Object.values(directory.directories).reduce((a, b) => a + calculateSize(b), 0);

        if (size <= 100000) {
            sum += size;
        }
        return size;
    };

    calculateSize(root);
    return sum;
};

console.log(part1());

// Part 2
const TOTAL_SPACE = 70000000;
const SPACE_NEEDED = 30000000;

const part2 = () => {
    // Calculate total size of each directory
    const sizes = [] as number[];
    const calculateSize = (directory: Directory) => {
        let size = 0;
        size += Object.values(directory.files).reduce((a, b) => a + b, 0);
        size += Object.values(directory.directories).reduce((a, b) => a + calculateSize(b), 0);
        sizes.push(size);
        return size;
    };

    const rootSize = calculateSize(root);
    const spaceLeft = TOTAL_SPACE - rootSize;
    const spaceToFreeUp = SPACE_NEEDED - spaceLeft;
    return sizes.sort((a, b) => b + a).find((size) => size >= spaceToFreeUp);
};

console.log(part2());
