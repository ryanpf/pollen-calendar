export const CONFIG = {
    PORT: process.env.PORT || 80,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || missingConfig("GOOGLE_API_KEY"),
}

function missingConfig(envName: string): string {
    throw new Error(`Value for $${envName} not found`)
}