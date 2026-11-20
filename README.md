# Master Key — sitio web mejorado en español

Sitio web de presentación de Master Key desarrollado con Python y Flask.

## Mejoras incluidas
- Botón flotante «¿Necesitas ayuda?».
- Panel de preguntas frecuentes desplegables.
- Botones «Me interesa» en los servicios que llevan al formulario y seleccionan el tipo de proyecto.
- Animaciones discretas al desplazarse por la página.
- Contador de caracteres para el mensaje del formulario.
- Botón para volver al inicio.
- Menú adaptable a celulares, tabletas y computadoras.
- Formulario que guarda las solicitudes en una base de datos SQLite (`master_key.db`).

La ayuda muestra información general mediante preguntas frecuentes. No es un chat en vivo ni utiliza inteligencia artificial.

## Requisitos
- Python 3.10 o superior.
- Flask (se instala desde `requirements.txt`).

## Cómo ejecutar el sitio en Windows
1. Extrae el archivo ZIP.
2. Abre Visual Studio Code.
3. Selecciona **Archivo > Abrir carpeta** y abre la carpeta `master_key_web`.
4. Selecciona **Terminal > Nueva terminal**.
5. Ejecuta:
   ```powershell
   python -m pip install -r requirements.txt
   ```
6. Cuando termine la instalación, ejecuta:
   ```powershell
   python app.py
   ```
7. Abre Chrome y visita `http://127.0.0.1:5000`.

Para detener el servidor, vuelve a la terminal y presiona **Ctrl + C**.

## Archivos principales
- `app.py`: servidor Flask y almacenamiento de solicitudes.
- `templates/index.html`: contenido de la página.
- `static/style.css`: diseño visual y adaptación a pantallas.
- `static/script.js`: menú, ayuda y otras interacciones.
- `requirements.txt`: dependencias de Python.

## Antes de publicar en internet
- Configura una clave secreta privada (`SECRET_KEY`) mediante una variable de entorno.
- Desactiva el modo de depuración y utiliza un servidor WSGI de producción.
- Configura HTTPS y una política de privacidad adecuada.
- Añade los datos reales de contacto de la empresa.
- El formulario guarda las solicitudes en la base de datos local; no envía automáticamente correos ni mensajes de WhatsApp.
