export const uniqueEmail = () =>
    `e2e_${Date.now()}_${Math.random().toString(36).slice(2, 8)}@mail.com`;
