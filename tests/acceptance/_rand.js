export const randomEmail = () =>
    `bdd_${Date.now().toString(16)}_${Math.random().toString(36).slice(2)}@mail.local`;
