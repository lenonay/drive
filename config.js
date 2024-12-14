import { configDotenv } from "dotenv";
configDotenv();

export const {
    PORT = 3000,
    INT = '0.0.0.0',
    ROUTE = "./vault/nonay"
} = process.env;