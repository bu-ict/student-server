
const { config } = require('dotenv');

// Load environment variables from .env file
config();


const sql = require('mssql')



const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

async function connectToDatabase() {
  try {
    let pool = await sql.connect(sqlConfig);
    console.log("Connected to the database!");
    // Your code to query the database
  } catch (err) {
    console.error("Database connection error:", err);
  }
}




module.exports = { connectToDatabase };

