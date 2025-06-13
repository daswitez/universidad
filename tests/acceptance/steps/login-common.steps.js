import {
    Given, When, Then, BeforeAll, After, setDefaultTimeout
} from '@cucumber/cucumber';
import assert  from 'assert';
import bcrypt  from 'bcryptjs';
import request from 'supertest';
import sql     from 'mssql';

import { randomEmail } from '../_rand.js';
import app             from '../../../src/app.js';
import { getConnection } from '../../../src/database/connection.js';

setDefaultTimeout(20_000);

let pool;
BeforeAll(async () => { pool = await getConnection(); });

After(async function () {
    if (!this.email) return;
    await pool.request().query`
        DELETE FROM Docentes            WHERE correo = ${this.email};
        DELETE FROM EncargadoLaboratorio WHERE correo = ${this.email};
        DELETE FROM Estudiantes         WHERE correo = ${this.email};
    `;
});

const insertUser = async (role, email, pass) => {
    const hash = await bcrypt.hash(pass, 10);
    await pool.request().query`
    DELETE FROM Docentes            WHERE correo = ${email};
    DELETE FROM EncargadoLaboratorio WHERE correo = ${email};
    DELETE FROM Estudiantes         WHERE correo = ${email};
  `;
    switch (role) {
        case 'docente':
            await pool.request().query`
                INSERT INTO Docentes (nombre, apellido, correo, contrasena, id_carrera)
                VALUES ('BDD','User',${email},${hash},1)
            `;
            break;
        case 'encargado':
            await pool.request().query`
                INSERT INTO EncargadoLaboratorio (nombre, apellido, correo, contrasena)
                VALUES ('BDD','User',${email},${hash})
            `;
            break;
        case 'estudiante':
            await pool.request().query`
                INSERT INTO Estudiantes
                (nombre, apellido, correo, contrasena, facultad, id_carrera, id_materia)
                VALUES ('BDD','User',${email},${hash},'Ing',1,1)
            `;
            break;
    }
};

Given(
    /^que existe un (docente|encargado|estudiante) con correo "([^"]+)" y contraseña "([^"]+)"$/,
    async function (rol, email, pass) {
        if (email === '<rand>') email = randomEmail();
        this.email = email;
        await insertUser(rol, email, pass);
    }
);

When(
    /^envío una petición POST a "([^"]+)" con esas credenciales$/,
    async function (ruta) {
        this.response = await request(app).post(ruta).send({
            correo: this.email,
            contrasena: '123456',
        });
    }
);

Then('la respuesta debe tener código {int}', function (status) {
    assert.strictEqual(this.response.statusCode, status);
});

Then('el cuerpo debe incluir el campo {string}', function (campo) {
    assert.ok(this.response.body[campo] !== undefined);
});
