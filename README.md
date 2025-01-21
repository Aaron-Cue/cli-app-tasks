# quicktask App

Esta es una aplicación CLI para gestionar tareas, utilizando MongoDB como base de datos. permite realizar operaciones CRUD sobre las tareas.

## Pasos para usar la aplicación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Aaron-Cue/cli-app-tasks.git
   cd cli-app-tasks
   ```

2. **Instalacion:**
   ```bash
   npm install
   npm link
   ```

3. **Configurar tu base de datos MongoDB:**
   - Obtén la URI de conexión de MongoDB en el siguiente formato:
     ```
     mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/<nombre_de_base_de_datos>
     ```

4. **Crear un archivo `.env`:**
   - En la raíz del proyecto, crea un archivo `.env` con el siguiente contenido:
     ```env
     MONGODB_URI=<url-mongo>
     ```

5. **Ejecutar la aplicación:**
   Ahora que tienes todo listo, puedes ejecutar los comandos CLI. Por ejemplo, para listar las tareas:
   ```bash
   quicktask <command>
   ```

## Comandos disponibles

- `quicktask -h` o `quicktask --help`: Muestra todos los comandos disponibles.
- `quicktask <command> -h`: Muestra las opciones del comando
- `list` o `ls`: Muestra todas las tareas
     - `list --limit <n>`: Muestra n tareas
     - `list --id <id>`: Muestra tarea con id pasado
- `save` o `s`: Guarda una nueva tarea.
- `update` o `u`: Actualiza una tarea existente.
- `delete` o `d`: Elimina una tarea por su `id`.