import { join } from "path";

const date = new Date();
const currentDay = date.getDate().toString();
const currentYear = date.getFullYear().toString();

const [day = currentDay, year = currentYear] = Deno.args;

console.log(`Running day ${day} year ${year}`);

const command = new Deno.Command(Deno.execPath(), {
    args: [`run`, "--allow-read", join(year, day.padStart(2, "0"), "main.ts")],
});
const { stdout, stderr } = command.outputSync();

console.log(new TextDecoder().decode(stdout));
console.log(new TextDecoder().decode(stderr));
