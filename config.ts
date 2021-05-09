import dotenv from 'dotenv';

dotenv.config();

export const port: number = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;
export const host: string = process.env.host || 'localhost';
