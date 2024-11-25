
# Pruebas Automatizadas para GitHub

Este proyecto contiene un script en Node.js que ejecuta pruebas automatizadas hacia la página web de **[GitHub](https://github.com)**. Utilizamos **Selenium WebDriver** para realizar las pruebas de validación y navegación en distintas secciones del sitio web.

## 🚀 Ejecución de las Pruebas

Para ejecutar las pruebas automatizadas, asegúrate de tener **Node.js** instalado en tu máquina y sigue estos pasos:

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

3. Ejecuta el script:
   ```bash
   node index.js
   ```

   Al ejecutar el comando anterior, las pruebas comenzarán automáticamente. Durante la ejecución, se generarán capturas de pantalla y un reporte detallado en formato HTML que documentará los resultados de las pruebas.

## 📋 Pruebas Automatizadas Realizadas

Las pruebas automatizadas incluidas en este script son las siguientes:

1. **Carga de la página de inicio de sesión**:
   - Validación de que la página de inicio de sesión de GitHub carga correctamente.
   - Verificación de la presencia de los campos de entrada (`login_field` y `password`).

2. **Validación de credenciales incorrectas**:
   - Prueba de un inicio de sesión con credenciales incorrectas y validación del mensaje de error.

3. **Navegación a la página principal**:
   - Comprobación de que la página principal de GitHub carga correctamente.

4. **Acceso a la página de precios**:
   - Validación de la navegación hacia la sección de precios de GitHub.

5. **Acceso a la página de registro gratuito**:
   - Comprobación de la navegación hacia la página "Join for free".

6. **Validación de correos existentes**:
   - Prueba de un registro con un correo ya existente y validación del mensaje de error.

## 📂 Historias de Usuario

Las historias de usuario relacionadas con estas pruebas se encuentran documentadas dentro de este repositorio en el archivo `HISTORIAS_DE_USUARIO.md`. También están disponibles en el board de GitHub asociado a este proyecto, donde se realiza el seguimiento del estado de cada historia.

## 🎥 Video de Referencia

Para entender mejor cómo funcionan estas pruebas automatizadas, puedes revisar el siguiente video en YouTube:

**Cómo implementar pruebas automatizadas con Selenium en Node.js**

*Nota: El enlace es una referencia genérica. Si tienes un video específico que quieras incluir, asegúrate de actualizar el enlace con la URL correspondiente.*

## 📦 Requerimientos

- **Node.js** versión 14 o superior.
- Navegador compatible con Selenium (en este caso, Safari).

## 📑 Reportes Generados

Al finalizar la ejecución, el script generará:

- Un archivo HTML llamado `report.html` en el directorio raíz, que incluye un resumen detallado de las pruebas realizadas.
- Capturas de pantalla de los pasos clave en el directorio `screenshots`.
