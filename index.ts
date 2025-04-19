import { PollenCalendar, PollenThreshold } from "./calendar/pollen-calendar"
import { CONFIG } from "./config"
import { getPollenReport } from "./forecast/google/google-pollen-api"

const getCalendar = PollenCalendar((request) => getPollenReport({
    ...request,
    apiKey: CONFIG.GOOGLE_API_KEY,
    days: 5,
}))

Bun.serve({
    port: CONFIG.PORT,
    routes: {
        "/:latitude/:longitude": async (request) => new Response((await getCalendar({
            pollenThreshold: PollenThreshold.MODERATE,
            location: {
                latitude: Number(request.params["latitude"]),
                longitude: Number(request.params["longitude"]),
            }
        })).toString(), {
            headers: {
                "content-type": "text/calendar",
                "Content-Disposition": 'attachment; filename="pollen-calendar.ics"',
            },
        })
    },
})