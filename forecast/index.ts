import type { pollen_v1 } from "googleapis";
import FIVE_DAY from "./google/test-data/five-day.json";

type PollenForecast = pollen_v1.Schema$LookupForecastResponse

export type PollenForecaster = (request: {
    latitude: number,
    longitude: number,
}) => Promise<PollenForecast>;

export const TEST_DATA = {
    FIVE_DAY,
}