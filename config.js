require('dotenv').config();
module.exports = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || "shhh",
    NODE_ENV: process.env.NODE_ENV || "development",
    ROUNDS: process.env.ROUNDS || 8
};