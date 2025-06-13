import request from 'supertest';
import app           from '../../src/app.js';
import { randomEmail } from './_utils.js';

describe('Docente – integración', () => {
    const base  = '/docentes';
    const login = '/auth/login';
    const email = randomEmail();
    const pass  = '123456';
    let id;

    it('crea docente', async () => {
        const res = await request(app).post(base).send({
            nombre: 'Test', apellido: 'Docente',
            correo: email, contrasena: pass,
            id_carrera: 1
        });
        expect(res.statusCode).toBe(201);
        id = res.body.id_docente;
    });

    it('login docente', async () => {
        const res = await request(app).post(login).send({ correo: email, contrasena: pass });
        expect(res.statusCode).toBe(200);
        expect(res.body.id_docente).toBe(id);
    });

    it('asigna aula', async () => {
        const res = await request(app)
            .post(`${base}/${id}/asignar-aula`)
            .send({ id_aula: 1 });
        expect(res.statusCode).toBe(200);
    });

    it('delete docente', async () => {
        const res = await request(app).delete(`${base}/${id}`);
        expect([200, 409]).toContain(res.statusCode);
    });
});
