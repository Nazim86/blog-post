export const settings = {
    MONGO_URI: process.env.MONGO_URL || 'mondodb:/0.0.0.0:27817',
    JWT_SECRET: process.env.JWT_SECRET || "123"
}