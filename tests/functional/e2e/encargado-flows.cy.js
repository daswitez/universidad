import { uniqueEmail } from '../_utils.js';

describe('👩‍🔬 Flujo Encargado', () => {
    const email = uniqueEmail();
    const pass  = '123456';
    let   id;

    it('alta → login → update → delete', () => {
        /* 1️⃣ alta */
        cy.request('POST', '/encargados', {
            nombre: 'E2E', apellido: 'Enc', correo: email, contrasena: pass,
        }).then(({ status, body }) => {
            expect(status).eq(201);
            expect(body.id_encargado).to.exist;
            id = body.id_encargado;

            return cy.request('POST', '/auth/encargado-login', { correo: email, contrasena: pass });
        })
            .then(r => expect(r.status).eq(200))

            .then(() => cy.request('PUT', `/encargados/${id}`, { nombre: 'Nuevo' }))
            .then(r  => expect(r.status).eq(200))

            .then(() => cy.request('DELETE', `/encargados/${id}`))
            .then(r  => expect(r.status).eq(200));
    });
});
