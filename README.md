# Aplicación Full-Stack de Gestión de Productos

Este proyecto es una aplicación full-stack para la gestión de productos. Consta de un backend desarrollado con Spring Boot y un frontend implementado con React.

## Tabla de Contenidos
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Backend (Spring Boot)](#backend-spring-boot)
  - [Tecnologías utilizadas](#tecnologías-utilizadas-backend)
  - [Modelo de datos](#modelo-de-datos)
  - [Endpoints API](#endpoints-api)
  - [Configuración](#configuración-backend)
  - [Instalación y ejecución](#instalación-y-ejecución-backend)
- [Frontend (React)](#frontend-react)
  - [Tecnologías utilizadas](#tecnologías-utilizadas-frontend)
  - [Estructura de carpetas](#estructura-de-carpetas)
  - [Componentes principales](#componentes-principales)
  - [Servicios](#servicios)
  - [Instalación y ejecución](#instalación-y-ejecución-frontend)
- [Integración Frontend-Backend](#integración-frontend-backend)
- [Futuras mejoras](#futuras-mejoras)
- [Autor](#autor)

## Estructura del Proyecto

El proyecto está organizado en dos partes principales:

```
/
├── backend/             # Aplicación Spring Boot
└── frontend/            # Aplicación React
```

## Backend (Spring Boot)

### Tecnologías utilizadas (Backend)
- Java 21
- Spring Boot 3.4.3
- Spring Data JPA
- MySQL
- Maven

### Modelo de datos

La entidad principal es `Product`, que representa un producto con los siguientes atributos:

```java
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Long price;
    
    // Getters y setters
}
```

### Endpoints API

| Método HTTP | Endpoint         | Descripción                       |
|-------------|------------------|-----------------------------------|
| GET         | /                | Obtiene todos los productos       |
| GET         | /{id}            | Obtiene un producto por su ID     |
| POST        | /                | Crea un nuevo producto            |
| PUT         | /{id}            | Actualiza un producto existente   |
| DELETE      | /{id}            | Elimina un producto por su ID     |

### Configuración (Backend)

La configuración del backend se encuentra en el archivo `application.properties`:

```properties
spring.application.name=springboot-backend
spring.datasource.url=jdbc:mysql://localhost:3306/db_springboot_backend
spring.datasource.username=root
spring.datasource.password=sasa
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql=true
```

### Instalación y ejecución (Backend)

#### Requisitos previos
- Java JDK 21
- Maven
- MySQL

#### Pasos para ejecutar el backend

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/usuario/proyecto.git
   cd proyecto/backend
   ```

2. **Configurar la base de datos**
   - Crear una base de datos MySQL llamada `db_springboot_backend`
   - Actualizar las credenciales en `src/main/resources/application.properties` si es necesario

3. **Compilar y ejecutar la aplicación**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **Verificar la API**
   - La API estará disponible en `http://localhost:8080/`

## Frontend (React)

### Tecnologías utilizadas (Frontend)
- React 19.0.0
- React Router 7.2.0
- React Bootstrap 2.10.9
- Axios 1.7.9
- Bootstrap 5.3.3

### Estructura de carpetas

```
src/
├── components/
│   ├── layout/
│   └── products/
│       ├── ProductForm.js
│       ├── ProductItem.js
│       └── ProductList.js
├── services/
│   └── productService.js
├── styles/
├── App.js
└── index.js
```

### Componentes principales

#### ProductList.js
Este componente muestra la lista de productos en una tabla y permite crear, editar y eliminar productos.

```jsx
// Extracto del componente ProductList
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchProducts();
    }, []);
    
    // Funciones para cargar y administrar productos
    
    return (
        <Card className="shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0 text-white">Lista de Productos</h2>
                <Link to="/create" className="btn btn-success">Nuevo Producto</Link>
            </Card.Header>
            <Card.Body>
                {/* Tabla de productos */}
            </Card.Body>
        </Card>
    );
};
```

#### ProductForm.js
Este componente permite crear nuevos productos y editar productos existentes.

```jsx
// Extracto del componente ProductForm
const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: ''
    });
    
    // Funciones para manejar el formulario
    
    return (
        <Card className="shadow-sm">
            <Card.Header>
                <h2 className="text-white">{isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
            </Card.Header>
            <Card.Body>
                {/* Formulario */}
            </Card.Body>
        </Card>
    );
};
```

### Servicios

El archivo `productService.js` contiene todas las funciones para interactuar con la API del backend:

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const productService = {
    getAllProducts: async () => {
        try {
            const response = await apiClient.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    getProductById: async (id) => { /* ... */ },
    createProduct: async (productData) => { /* ... */ },
    updateProduct: async (id, productData) => { /* ... */ },
    deleteProduct: async (id) => { /* ... */ },
};

export default productService;
```

### Instalación y ejecución (Frontend)

#### Requisitos previos
- Node.js (versión 14 o superior)
- npm o yarn

#### Pasos para ejecutar el frontend

1. **Navegar al directorio del frontend**
   ```bash
   cd proyecto/frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Iniciar la aplicación**
   ```bash
   npm start
   # o
   yarn start
   ```

4. **Acceder a la aplicación**
   - La aplicación estará disponible en `http://localhost:3000`

## Integración Frontend-Backend

La integración entre el frontend y el backend se realiza mediante llamadas HTTP utilizando Axios. El archivo `productService.js` configura la conexión con la API:

```javascript
const API_URL = 'http://localhost:8080';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
```

Para que la aplicación funcione correctamente:

1. El backend debe estar ejecutándose en `http://localhost:8080`
2. El frontend debe estar configurado para conectarse a esa URL

Si necesitas cambiar el puerto o la URL del backend, modifica la constante `API_URL` en el archivo `productService.js`.

## Ejecutar la aplicación completa

Para ejecutar la aplicación completa (backend y frontend):

1. **Iniciar el backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **En otra terminal, iniciar el frontend**
   ```bash
   cd frontend
   npm start
   ```

3. **Acceder a la aplicación**
   - Abre tu navegador y navega a `http://localhost:3000`

## Futuras mejoras

Algunas ideas para mejorar la aplicación:

1. Implementar autenticación y autorización (JWT)
2. Agregar paginación y filtrado para la lista de productos
3. Implementar documentación de la API con Swagger/OpenAPI
4. Agregar validación de datos en el backend
5. Implementar pruebas unitarias y de integración
6. Mejorar el diseño y la experiencia de usuario
7. Implementar una funcionalidad de búsqueda
8. Agregar sistema de categorías para los productos
9. Configurar un proceso de CI/CD
10. Desplegar la aplicación en un servicio en la nube

## Autor
Desarrollado por # Jeronimo Rodriguez Sepulveda

## Licencia
[Especificar licencia]
