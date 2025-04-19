import { google } from "googleapis";
export function getPollenReport(request: {
    apiKey: string,
    days: number,
    latitude: number,
    longitude: number,
}) {
    return google.pollen("v1").forecast.lookup({
        key: request.apiKey,
        "location.latitude": request.latitude,
        "location.longitude": request.longitude,
        days: request.days
    }).then(x => x.data)
}