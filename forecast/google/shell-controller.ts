import { getPollenReport } from "./google-pollen-api";

const [days] = Bun.argv.slice(2);

console.write(
    JSON.stringify(await getPollenReport({
        days: Number(days),
    })),
)