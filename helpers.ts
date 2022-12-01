import { readFileSync } from "fs";

export function getInput(input: string): string[] {
    return readFileSync(input, { encoding: "utf8" }).split("\n\n");
}
