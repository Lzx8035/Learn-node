# Natours API Learning Project 🍞

A RESTful API learning project built with Node.js, Express, and MongoDB for managing tour bookings.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Docker & Docker Compose

## Quick Start

### Using Docker

1. **Start all services**

   ```bash
   # Development mode (with hot reload, auto-rebuild)
   npm run docker:up

   # Production mode (auto-rebuild)
   npm run docker:up:prod
   ```

2. **Import sample data** (optional)

   ```bash
   npm run docker:import:data
   ```

3. **Access the application**
   - API: http://localhost:3000
   - MongoDB: localhost:27017

4. **View logs**

   ```bash
   npm run docker:logs
   ```

5. **Stop services**
   ```bash
   npm run docker:down
   ```

## Database Configuration

### Development Environment (Docker)

When using `docker-compose.dev.yml`, **you don't need to configure `DATABASE` in `.env` file**.

### Production Environment (Docker)

When using `docker-compose.prod.yml` for production deployment with cloud database（MongoDB Atlus），**You must configure `DATABASE` in `.env` file** with your cloud database connection string.

## Available Scripts

### Application Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server (with nodemon)
- `npm run import:data` - Import sample data to MongoDB
- `npm run delete:data` - Delete all data from MongoDB
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Docker Scripts

- `npm run docker:up` - Start Docker containers (development, auto-rebuild)
- `npm run docker:up:prod` - Start Docker containers (production, auto-rebuild)
- `npm run docker:down` - Stop Docker containers (development)
- `npm run docker:down:prod` - Stop Docker containers (production)
- `npm run docker:logs` - View Docker logs (development)
- `npm run docker:logs:prod` - View Docker logs (production)
- `npm run docker:import:data` - Import sample data (in Docker container)
- `npm run docker:delete:data` - Delete all data (in Docker container)

**Note**: `docker:up` commands automatically rebuild images when Dockerfile changes.

## API Endpoints

- `GET /api/v1/tours` - Get all tours
- `GET /api/v1/tours/:id` - Get a specific tour
- `POST /api/v1/tours` - Create a new tour
- `PATCH /api/v1/tours/:id` - Update a tour
- `DELETE /api/v1/tours/:id` - Delete a tour

## Project Structure

```
.
├── controllers/              # Route controllers
├── models/                  # Mongoose models (Tour, User, Review)
├── routes/                  # Express routes
├── utils/                   # Utility functions
├── dev-data/                # Sample data and import scripts
├── public/                  # Static files
├── docker-compose.dev.yml   # Docker Compose (development)
├── docker-compose.prod.yml  # Docker Compose (production)
├── Dockerfile.dev           # Docker image (development)
├── Dockerfile.prod          # Docker image (production)
└── server.js                # Server entry point
```

## Database Models

- **Tour** - Tour information with locations, guides, and ratings
- **User** - User accounts with authentication
- **Review** - User reviews for tours

## License

ISC
