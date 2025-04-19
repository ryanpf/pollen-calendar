import ical from "ical-generator";
import type { PollenForecaster } from "../forecast";

export enum PollenThreshold {
    NONE = 0,
    LOW = 1,
    MODERATE = 2,
    HIGH = 3,
}

type PollenWarningCalendarRequest = {
    pollenThreshold: PollenThreshold,
    location: {
        latitude: number,
        longitude: number,
    },
}

export function PollenCalendar(getPollenReport: PollenForecaster) {
    return async function requestPollenWarningCalendar(request: PollenWarningCalendarRequest) {
        const report = await getPollenReport({
            ...request.location,
        });
        const calendar = ical({
            name: "Pollen Warnings",
            timezone: "America/Chicago",
        });
        (report.dailyInfo || [])
            .forEach(day => {
                const activePlants = day.plantInfo
                    ?.filter(plant => (plant.indexInfo?.value || 0) > request.pollenThreshold)
                    .map(plant => plant.displayName) || []

                if (day.date && activePlants.length > 0) {
                    calendar.createEvent({
                        start: `${day.date.year}-${day.date.month?.toString().padStart(2, '0')}-${day.date.day?.toString().padStart(2, '0')}`,
                        allDay: true,
                        summary: `Pollen Warning (${activePlants.join(", ")})`,
                    })
                }
            })
        return calendar;
    }
}