import request from 'supertest';
import app           from '../../src/app.js';
import { randomEmail } from './_utils.js';

describe('Estudiante – integración', () => {
    const base  = '/estudiantes';
    const login = '/auth/login-estudiante';
    const email = randomEmail();
    const pass  = '123456';
    let id;

    it('registra estudiante', async () => {
        const res = await request(app).post(base).send({
            nombre: 'Test', apellido: 'Alumno',
            correo: email, contrasena: pass,
            facultad: 'Ingeniería',
            id_carrera: 1, id_materia: 1
        });
        expect(res.statusCode).toBe(201);
        id = res.body.id_estudiante;
    });

    it('login estudiante', async () => {
        const res = await request(app).post(login).send({ correo: email, contrasena: pass });
        expect(res.statusCode).toBe(200);
        expect(res.body.id_estudiante).toBe(id);
    });

    afterAll(async () => {
        await request(app).delete(`${base}/${id}`);
    });
});
