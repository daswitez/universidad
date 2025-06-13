# language: es
Característica: Autenticación de encargado
  Esquema del escenario: Login exitoso
    Dado que existe un encargado con correo "<email>" y contraseña "123456"
    Cuando envío una petición POST a "/auth/encargado-login" con esas credenciales
    Entonces la respuesta debe tener código 200
    Y el cuerpo debe incluir el campo "id_encargado"

    Ejemplos:
      | email |
      | <rand> |
