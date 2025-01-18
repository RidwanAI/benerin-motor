import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Export the BASE_URL
export const BASE_URL = process.env.BASE_URL;
