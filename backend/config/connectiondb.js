import mysql from 'mysql2';
import 'dotenv/config'

const db = mysql.createConnection({
    
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    database:process.env.DB_DATABASE,
})

export default db;