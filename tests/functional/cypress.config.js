import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        specPattern: 'tests/functional/e2e/**/*.cy.js',
        supportFile: false,
        env: {
            ADMIN_USER: 'bdd_admin@mail.local',
            ADMIN_PASS: '123456'
        },
        defaultCommandTimeout: 20_000
    }
});
