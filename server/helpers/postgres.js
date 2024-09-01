const neon = require('@neondatabase/serverless');
const drizzle = require('drizzle-orm/neon-http');

const sql = neon.neon(process.env.DRIZZLE_DATABASE_URL);
const posgresDB = drizzle.drizzle(sql);

module.exports = {
    posgresDB
}