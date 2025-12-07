import mysql from 'mysql2/promise';

const dbHost = process.env.DB_HOST || 'localhost';

if (!process.env.DB_HOST || process.env.DB_HOST === 'localhost') {
  console.error('ERREUR: DB_HOST n\'est pas défini ou est localhost!');
  console.error('   Vérifie que le fichier .env existe dans back/src/ avec DB_HOST=ton-host-alwaysdata.mysql.db');
}

const dbConfig = {
  host: dbHost,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'aevoria_user_db',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 5000,
};

console.log('DB Config:', {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  port: dbConfig.port,
  hasPassword: !!dbConfig.password,
  envDB_HOST: process.env.DB_HOST,
  envDB_PORT: process.env.DB_PORT,
});

const pool = mysql.createPool(dbConfig);

export default pool;
