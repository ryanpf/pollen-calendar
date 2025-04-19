import { describe, it, expect } from "vitest";
import { PollenCalendar, PollenThreshold } from "./pollen-calendar";
import { TEST_DATA } from "../forecast";

describe("pollen calendar", () => {
    it("provides an iCal with warnings for the requested location and pollen level", async () => {
        const requestPollenWarningCalendar = PollenCalendar(async () => TEST_DATA.FIVE_DAY);
        const calendar = await requestPollenWarningCalendar({
            pollenThreshold: PollenThreshold.MODERATE,
            locationZipCode: "73013",
        });
        expect(
            calendar.events().map(x => x.start()),
        ).toEqual(["2025-03-15", "2025-03-16", "2025-03-17", "2025-03-18", "2025-03-19"]);

        expect(calendar.events()[0].summary()).toEqual("Pollen Warning (Elm, Juniper)");
        expect(calendar.name()).toEqual("Pollen Warnings");
        expect(calendar.timezone()).toEqual("America/Chicago");
    })
})