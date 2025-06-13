import request      from 'supertest';
import app          from '../../src/app.js';
import { randomEmail } from './_utils.js';

describe('Encargado – integración', () => {
    const base  = '/encargados';
    const login = '/auth/encargado-login';
    const email = randomEmail();
    const pass  = '123456';
    let   id;

    it('crea encargado', async () => {
        const res = await request(app).post(base).send({
            nombre: 'Test', apellido: 'Encargado',
            correo: email, contrasena: pass
        });
        expect(res.statusCode).toBe(201);
        id = res.body.id_encargado;
    });

    it('login encargado', async () => {
        const res = await request(app).post(login).send({
            correo: email,
            contrasena: pass,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.id_encargado).toBe(id);
    });

    it('actualiza encargado', async () => {
        const res = await request(app)
            .put(`${base}/${id}`)
            .send({ nombre: 'NuevoNombre' });
        expect(res.statusCode).toBe(200);
    });

    it('elimina encargado', async () => {
        const res = await request(app).delete(`${base}/${id}`);
        expect([200, 409]).toContain(res.statusCode);
    });
});
