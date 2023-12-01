import { join } from "path";

const date = new Date();
const currentDay = date.getDate().toString();
const currentYear = date.getFullYear().toString();

const [day = currentDay, year = currentYear] = Deno.args;

console.log(`Running day ${day} year ${year}`);

const command = new Deno.Command(Deno.execPath(), {
    args: [`run`, "--allow-read", join(year, day.padStart(2, "0"), "main.ts")],
    stdout: "piped",
    stderr: "piped",
});

const child = command.spawn();
await child.stdout.pipeTo(Deno.stdout.writable);
await child.stderr.pipeTo(Deno.stderr.writable);
