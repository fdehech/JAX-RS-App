# JAX-RS Person Management Application

A full-stack web application for managing persons using JAX-RS (RESTful Web Services) on the backend and Next.js on the frontend.

## 🏗️ Architecture

```
Mini-Projet-SOA/
├── client/          # Next.js frontend application
├── server/          # JAX-RS backend application
│   └── PersonREST/  # Maven project with REST API
├── .gitignore
└── README.md
```

## 🛠️ Technologies Used

### Backend
- **JAX-RS** (Jersey 2.35) - RESTful web services
- **JPA/Hibernate** - Object-relational mapping
- **MySQL** - Database
- **Maven** - Build tool
- **Apache Tomcat** - Application server

### Frontend
- **Next.js 16** - React framework with Turbopack
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Lucide React** - Icon library

## 📋 Features

- ✅ Create, Read, Update, Delete (CRUD) operations for persons
- ✅ Real-time search by name or email
- ✅ Responsive modern UI with dark mode support
- ✅ Form validation
- ✅ Toast notifications
- ✅ RESTful API with JSON responses
- ✅ CORS enabled for cross-origin requests

## 🚀 Getting Started

### Prerequisites

- **Java 8+** and **Maven** installed
- **MySQL** server running
- **Node.js 18+** and **npm** installed
- **Apache Tomcat 9+** server

### Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE person_db;
```

2. Update database credentials in `server/PersonREST/src/main/resources/META-INF/persistence.xml`:
```xml
<property name="javax.persistence.jdbc.user" value="root"/>
<property name="javax.persistence.jdbc.password" value="your_password"/>
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd server/PersonREST
```

2. Build the project:
```bash
mvn clean package
```

3. Deploy the generated WAR file:
   - Copy `target/PersonREST.war` to Tomcat's `webapps/` directory
   - Start Tomcat server

4. Verify the API is running:
```bash
curl http://localhost:8080/PersonREST/api/people
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser at [http://localhost:3000](http://localhost:3000)

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/people` | Get all persons |
| GET | `/api/people/{id}` | Get person by ID |
| POST | `/api/people` | Create a new person |
| PUT | `/api/people/{id}` | Update a person |
| DELETE | `/api/people/{id}` | Delete a person |

### Example Request

**Create a person:**
```bash
curl -X POST http://localhost:8080/PersonREST/api/people \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "age": 30
  }'
```

**Response:**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "age": 30
}
```

## 🗄️ Database Schema

```sql
CREATE TABLE person (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  age INT NOT NULL
);
```

## 🔧 Configuration

### Backend Configuration

- **Database**: `server/PersonREST/src/main/resources/META-INF/persistence.xml`
- **CORS**: `server/PersonREST/src/main/java/com/rest/config/CorsFilter.java`

### Frontend Configuration

- **API Base URL**: `client/lib/api.ts` (default: `http://localhost:8080/PersonREST/api/people`)

## 🎨 UI Features

- Modern, responsive design
- Dark mode support
- Smooth animations and transitions
- Search functionality
- Form validation
- Toast notifications for user feedback
- Dropdown menus for actions
- Loading states

## 📝 Development Notes

### Hibernate Schema Management

The application uses Hibernate's auto-schema update feature. To change the schema management strategy, edit `persistence.xml`:

```xml
<!-- Options: validate, update, create, create-drop -->
<property name="hibernate.hbm2ddl.auto" value="update"/>
```

⚠️ **Warning**: Use `create` or `create-drop` only in development as they will delete existing data!

### CORS Configuration

CORS is enabled for all origins in development. For production, update `CorsFilter.java` to restrict allowed origins.

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `Field 'name' doesn't have a default value`
- **Solution**: The database schema is outdated. Set `hibernate.hbm2ddl.auto` to `create` temporarily, restart the server, then change back to `update`.

**Problem**: Connection refused to MySQL
- **Solution**: Ensure MySQL is running and credentials in `persistence.xml` are correct.

### Frontend Issues

**Problem**: API calls fail with CORS errors
- **Solution**: Ensure the backend CORS filter is properly configured and the backend server is running.

**Problem**: `npm run dev` fails
- **Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again.

## 📦 Build for Production

### Backend
```bash
cd server/PersonREST
mvn clean package
# Deploy target/PersonREST.war to production Tomcat
```

### Frontend
```bash
cd client
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

Created as part of SOA (Service-Oriented Architecture) coursework.

## 🙏 Acknowledgments

- Jersey framework for JAX-RS implementation
- Next.js team for the amazing React framework
- shadcn/ui for beautiful UI components
