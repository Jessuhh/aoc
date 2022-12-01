export function getInput(file: string): string[] {
    return Deno.readTextFileSync(file).split("\n\n");
}
