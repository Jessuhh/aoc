export function getInput(file: string, seperator = "\n"): string[] {
    return Deno.readTextFileSync(file).split(seperator);
}
