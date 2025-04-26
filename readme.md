# Proyecto UTS Comercios

Este proyecto es una aplicación desarrollada con **Spring Boot** y **Java** para la gestión de usuarios y autenticación mediante JWT. También incluye integración con **Gradle** para la gestión de dependencias.

## Tecnologías utilizadas

- **Java**: Lenguaje principal del backend.
- **Spring Boot**: Framework para la creación de aplicaciones web.
- **JWT (JSON Web Tokens)**: Para la autenticación y autorización.
- **Gradle**: Herramienta de construcción y gestión de dependencias.
- **Jakarta Servlet**: Para la implementación de filtros HTTP.
- **Spring Security**: Para la gestión de seguridad.
- **JPA (Java Persistence API)**: Para la interacción con la base de datos.

## Estructura del proyecto

- `src/main/java/uts/comercios/web/config/jwt/`: Contiene la configuración y servicios relacionados con JWT.
  - **JwtService**: Servicio para la creación y validación de tokens JWT.
  - **JwtFilter**: Filtro para interceptar solicitudes y validar tokens.
- `src/main/java/uts/comercios/web/repository/`: Contiene los repositorios para la interacción con la base de datos.
  - **UsuarioRepository**: Repositorio para la gestión de usuarios.
- `src/main/java/uts/comercios/web/model/`: Contiene las entidades del modelo de datos.

## Funcionalidades principales

1. **Autenticación con JWT**:
   - Generación de tokens mediante `JwtService`.
   - Validación de tokens en cada solicitud con `JwtFilter`.

2. **Gestión de usuarios**:
   - Consulta de usuarios mediante `UsuarioRepository`.

3. **Seguridad**:
   - Protección de rutas mediante filtros y validación de tokens.

## Configuración

### Variables de entorno

El proyecto utiliza una clave secreta para la generación de tokens JWT. Esta clave puede configurarse en el archivo `application.properties` 

# Documentación de la API

## Autenticación

- **POST /api/v1/auth**: Autenticar usuario y recibir un token JWT
    - Cuerpo de la solicitud: `{"nombre": "usuario", "clave": "contraseña"}`
    - Respuesta: `{"jwtToken": "tu-jwt-token"}`

## API de Productos

Todos los endpoints de productos requieren autenticación con un token JWT válido.

- **GET /api/productos**: Obtener todos los productos
- **GET /api/productos/{id}**: Obtener un producto específico
- **POST /api/productos**: Crear un nuevo producto
- **PUT /api/productos/{id}**: Actualizar un producto
- **DELETE /api/productos/{id}**: Eliminar un producto

## Seguridad

La aplicación implementa Spring Security con autenticación JWT. Todos los endpoints, excepto `/api/v1/auth`, Swagger UI y la documentación de la API, requieren autenticación.

## Estructura del Proyecto

- **controllers**: Endpoints de la API REST
- **services**: Lógica de negocio
- **repositories**: Capa de acceso a datos
- **models**: Definiciones de entidades
- **dto**: Objetos de transferencia de datos
- **config**: Configuración de la aplicación


## Interfaz Frontend

La carpeta `front` contiene los archivos necesarios para la interfaz de usuario del proyecto. Está diseñada para interactuar con la API REST del backend y proporcionar una experiencia de usuario sencilla y funcional.

### Estructura de la Carpeta

- **index.html**: Página principal de la aplicación.
- **productos.html**: Página para la gestión de productos (visualización, creación, edición y eliminación).

#### Subcarpetas

- **css/**
    - `styles.css`: Archivo de estilos CSS para la personalización de la interfaz.

- **js/**
    - `auth.js`: Archivo JavaScript para manejar la autenticación de usuarios, incluyendo el inicio de sesión y la gestión de tokens JWT.
    - `productos.js`: Archivo JavaScript para interactuar con la API de productos, incluyendo las operaciones CRUD.

### Funcionalidades del Frontend

1. **Autenticación de Usuarios**:
    - Inicio de sesión mediante `auth.js`, que envía las credenciales al endpoint `/api/v1/auth` y almacena el token JWT.

2. **Gestión de Productos**:
    - Visualización de productos en `productos.html` utilizando `productos.js`.
    - Creación, edición y eliminación de productos mediante llamadas a la API REST.

3. **Estilos Personalizados**:
    - `styles.css` define el diseño visual de las páginas, asegurando una experiencia de usuario consistente.

### Requisitos para Ejecutar el Frontend

- Un navegador web moderno.
- El backend debe estar en ejecución para que las funcionalidades del frontend puedan interactuar con la API REST.

### Cómo Usar el Frontend

1. Abre `index.html` en un navegador web.
2. Inicia sesión con tus credenciales para obtener acceso a las funcionalidades protegidas.
3. Navega a `productos.html` para gestionar los productos.
