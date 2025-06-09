import sql from 'mssql';
import sqlv8 from 'msnodesqlv8'; // Mantenemos esta importación

const dbSettings = {
  server: '127.0.0.1',      // O el nombre exacto de tu servidor SQL
  database: 'InventarioUnivalle', // El nombre de tu base de datos
  user: 'myUser',           // TU USUARIO REAL
  password: 'myPassword',     // TU CONTRASEÑA REAL
  driver: 'msnodesqlv8',
  options: {
    trustServerCertificate: true
  }
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    console.log("✅ Conectado a SQL Server");
    return pool;
  } catch (error) {
    console.error("❌ Error conectando a SQL Server:", error);
    return null;
  }
};