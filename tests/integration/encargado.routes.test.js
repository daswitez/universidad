// tests/integration/encargado.routes.test.js
import request      from 'supertest';
import app          from '../../src/app.js';
import { randomEmail } from './_utils.js';

describe('Encargado – integración', () => {
    const base  = '/encargados';
    const login = '/auth/encargado-login';
    const email = randomEmail();
    const pass  = '123456';
    let   id;                                // se guarda para cleanup

    /* ─────────── 1. alta ─────────── */
    it('crea encargado', async () => {
        const res = await request(app).post(base).send({
            nombre: 'Test', apellido: 'Encargado',
            correo: email, contrasena: pass
        });
        expect(res.statusCode).toBe(201);
        id = res.body.id_encargado;            // lo usaremos en los demás tests
    });

    /* ─────────── 2. login ─────────── */
    it('login encargado', async () => {
        const res = await request(app).post(login).send({
            correo: email,
            contrasena: pass,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.id_encargado).toBe(id);
    });

    /* ─────────── 3. update ────────── */
    it('actualiza encargado', async () => {
        const res = await request(app)
            .put(`${base}/${id}`)
            .send({ nombre: 'NuevoNombre' });
        expect(res.statusCode).toBe(200);      // 200 OK si existe
    });

    /* ─────────── 4. delete ────────── */
    it('elimina encargado', async () => {
        const res = await request(app).delete(`${base}/${id}`);
        // en algunos casos tu API responde 409 si hay relaciones; considéralo válido
        expect([200, 409]).toContain(res.statusCode);
    });
});
