/**
 * Utilidades comunes para los tests de integración
 */

/** Genera un correo único */
export const randomEmail = () =>
    `user_${Date.now().toString(16)}_${Math.random()
        .toString(36)
        .slice(2)}@mail.local`;
