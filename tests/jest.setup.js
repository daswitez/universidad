// tests/jest.setup.js
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test', override: true });

import sql              from 'mssql';
import { getConnection } from '../src/database/connection.js';

let pool;

beforeAll(async () => {
    pool = await getConnection();               // una sola pool
    jest.setTimeout(30_000);                    // por si tarda la 1ª conexión
});

beforeEach(async () => {
    const tx = new sql.Transaction(pool);
    await tx.begin();

    // atamos un helper request() a la transacción recién creada
    tx.request = () => new sql.Request(tx);

    global.__TEST_TX__ = tx;                    // disponible para los tests
});

afterEach(async () => {
    if (global.__TEST_TX__) {
        await global.__TEST_TX__.rollback();      // revierte lo hecho en el test
        global.__TEST_TX__ = null;
    }
});

afterAll(async () => {
    await pool.close();                         // cerramos la pool
});
