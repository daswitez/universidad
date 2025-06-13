import { getConnection } from './db.js';

/**
 * Devuelve un request de mssql dentro de la transacción de test (si existe)
 */
export const sqlRequest = async () => {
    if (global.__TEST_TX__) {
        return global.__TEST_TX__.request();
    }
    const pool = await getConnection();
    return pool.request();
};
