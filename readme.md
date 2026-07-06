# To Do List App

Aplicación móvil desarrollada con Ionic, Angular y Cordova para la gestión de tareas y categorías.

La aplicación permite administrar categorías y tareas mediante operaciones CRUD, almacenar la información localmente y utilizar Firebase Remote Config para habilitar o deshabilitar dinámicamente los estilos del sistema mediante una Feature Flag.

# Requisitos

Antes de ejecutar la aplicación es necesario contar con:

- Node.js
- npm
- Ionic CLI
- Cordova CLI
- Android Studio (Android)
- Xcode (iOS únicamente en macOS)

# Instalación

Clonar el repositorio:

git clone https://github.com/StivenJ1/TO-DO-LIST-APP.git

Ingresar al proyecto:

cd TO-DO-LIST-APP

Instalar las dependencias:

npm install

# Ejecutar la aplicación

Para ejecutar la aplicación:

ionic serve

# Compilación

ionic build

Preparar las plataformas Cordova:

ionic cordova prepare android
ionic cordova prepare android 

cordova build android --release  => para generar el apk

# Integración con Firebase

Las credenciales del proyecto se encuentran configuradas en el archivo:

src/environments/environment.ts

La inicialización de Firebase se realiza en:

src/app/app.config.ts


# Firebase Remote Config

Se implementó una Feature Flag utilizando Firebase Remote Config para controlar dinámicamente los estilos.

Se configuró el siguiente parámetro:

'theme': boolean

Al iniciar la aplicación se realiza el siguiente flujo:

1. Inicia la configuración más reciente desde Firebase.
2. Se activan los valores descargados.
3. Se consulta el valor del parámetro theme.
4. Dependiendo de su valor se aplica automáticamente el tema correspondiente.

# Funcionalidades implementadas

## Gestión de categorías

La aplicación permite:

- Crear categorías.
- Editar categorías.
- Eliminar categorías.

### Validación

Una categoría no puede eliminarse si existen tareas asociadas a ella.

Para eliminar una categoría es necesario eliminar previamente las tareas relacionadas o reasignarlas a otra categoría.

## Gestión de tareas

La aplicación permite:

- Crear tareas.
- Editar tareas.
- Eliminar tareas.
- Marcar tareas como completadas.

Al crearse se asocia a una categoria.

# Flujo de uso

1. Crear una o más categorías.
2. Crear tareas seleccionando una categoría existente.
3. Administrar las tareas mediante las opciones de edición, eliminación y cambio de estado.
4. Cuando una categoría ya no tenga tareas asociadas, podrá eliminarse.

# Persistencia de datos

Las categorías y tareas se almacenan localmente utilizando LocalStorage, permitiendo conservar la información entre sesiones de la aplicación.


# Cambios realizados

- CRUD completo de categorías.
- CRUD completo de tareas.
- Asociación entre tareas y categorías.
- Validación para impedir eliminar categorías con tareas asociadas.
- Persistencia local mediante LocalStorage.
- Integración con Firebase.
- Integración con Firebase Remote Config.
- Implementación de una Feature Flag para cambiar dinámicamente el tema de la aplicación.
- Desarrollo de la interfaz utilizando Ionic y Tailwind CSS.
- Es obligatorio crear al menos una categoría antes de crear tareas.
- No es posible eliminar categorías que tengan tareas asociadas.
- El cambio de tema depende del valor configurado en Firebase Remote Config.
- La aplicación almacena la información localmente utilizando LocalStorage.


# Descargar APK 

dentro del repositorio se encuenta un release en este se encuentra el ejecutable en android
 - https://github.com/StivenJ1/TO-DO-LIST-APP/releases/tag/V1.0.0