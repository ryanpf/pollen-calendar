# pollen-calendar

Provides a five-day pollen forecast for the requested latitude/longitude
in the form of an iCal with all-day events for high-pollen days.

```bash
bun install
```

To run:

```bash
bun run index.ts
```

# Config
```
GOOGLE_API_KEY= # https://console.cloud.google.com/apis/credentials
PORT= # default 80
```

# Usage

`GET /:latitude/:longitude`