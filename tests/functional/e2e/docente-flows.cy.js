import { uniqueEmail } from '../_utils.js';

describe('👨‍🏫 Flujo Docente', () => {
    const email = uniqueEmail();
    const pass  = '123456';
    let   id;

    it('alta → login → update → get → delete', () => {
        cy.request('POST', '/docentes', {
            nombre:      'E2E',
            apellido:    'Profesor',
            correo:      email,
            contrasena:  pass,
            id_carrera:  1,
        })
            .then(({ status, body }) => {
                expect(status).to.eq(201);
                id = body.id_docente;

                return cy.request('POST', '/auth/login', {
                    correo:     email,
                    contrasena: pass,
                });
            })
            .then(({ status }) => {
                expect(status).to.eq(200);

                return cy.request('PUT', `/docentes/${id}`, { nombre: 'NuevoNombre' });
            })
            .then(({ status }) => {
                expect(status).to.eq(200);

                return cy.request(`/docentes/${id}`);
            })
            .then(({ status, body }) => {
                expect(status).to.eq(200);
                expect(body).to.have.property('nombre', 'NuevoNombre');
            });
    });

    after(() => {
        if (id)
            cy.request({
                method: 'DELETE',
                url:    `/docentes/${id}`,
                failOnStatusCode: false,
            });
    });
});
