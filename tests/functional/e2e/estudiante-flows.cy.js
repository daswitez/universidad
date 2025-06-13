import { uniqueEmail } from '../_utils.js';

describe('🎓 Flujo Estudiante', () => {
    const email = uniqueEmail();
    const pass  = '123456';
    let   id;

    it('registro → login → GET perfil', () => {
        cy.request('POST', '/estudiantes', {
            nombre:     'E2E',
            apellido:   'Alum',
            correo:     email,
            contrasena: pass,
            facultad:   'Ing',
            id_carrera: 1,
            id_materia: 1,
        })
            .then(({ status, body }) => {
                expect(status).to.eq(201);
                id = body.id_estudiante;

                return cy.request('POST', '/auth/login-estudiante', {
                    correo: email, contrasena: pass,
                });
            })
            .then(({ status }) => {
                expect(status).to.eq(200);

                return cy.request(`/estudiantes/${id}`);
            })
            .then(({ status, body }) => {
                expect(status).to.eq(200);
                expect(body).to.have.property('correo', email);
            });
    });

    after(() => {
        if (id)
            cy.request({
                method: 'DELETE',
                url:    `/estudiantes/${id}`,
                failOnStatusCode: false,
            });
    });
});
