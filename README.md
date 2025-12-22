# Natours API Learning Project 🍞

A RESTful API built with Node.js, Express, and MongoDB for managing tour bookings.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Docker & Docker Compose

## Quick Start

### Using Docker (Recommended)

1. **Start all services**

   ```bash
   # Production mode
   docker compose up -d

   # Development mode (with hot reload)
   docker compose -f docker-compose.dev.yml up -d
   ```

2. **Import sample data**

   ```bash
   docker compose exec app npm run import:data
   ```

3. **Access the application**
   - API: http://localhost:3000
   - MongoDB: localhost:27017

4. **View logs**

   ```bash
   npm run docker:logs
   # or
   docker compose logs -f
   ```

5. **Stop services**
   ```bash
   npm run docker:down
   # or
   docker compose down
   ```

### Local Development (without Docker)

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**
   Create a `.env` file:

   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE=mongodb://127.0.0.1:27017/natours
   ```

3. **Start MongoDB**

   ```bash
   # macOS
   brew services start mongodb-community
   ```

4. **Import sample data**

   ```bash
   npm run import:data
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server (with nodemon)
- `npm run import:data` - Import sample data to MongoDB
- `npm run delete:data` - Delete all data from MongoDB
- `npm run docker:up` - Start Docker containers
- `npm run docker:down` - Stop Docker containers
- `npm run docker:logs` - View Docker logs

## Data Management

### Import Data

Import sample data (users, tours, and reviews) into MongoDB:

```bash
# Using Docker
docker compose exec app npm run import:data

# Local development
npm run import:data
```

This will:

- Connect to MongoDB
- Delete existing data (if any)
- Import users, tours, and reviews in the correct order

### Delete Data

Delete all data from MongoDB:

```bash
# Using Docker
docker compose exec app npm run delete:data

# Local development
npm run delete:data
```

### View Data

Use MongoDB Compass to view and manage data:

- **Docker**: `mongodb://localhost:27017/natours`
- **Local**: `mongodb://127.0.0.1:27017/natours`

## API Endpoints

- `GET /api/v1/tours` - Get all tours
- `GET /api/v1/tours/:id` - Get a specific tour
- `POST /api/v1/tours` - Create a new tour
- `PATCH /api/v1/tours/:id` - Update a tour
- `DELETE /api/v1/tours/:id` - Delete a tour

## Project Structure

```
.
├── controllers/       # Route controllers
├── models/           # Mongoose models (Tour, User, Review)
├── routes/           # Express routes
├── utils/            # Utility functions
├── dev-data/         # Sample data and import scripts
├── public/           # Static files
├── docker-compose.yml # Docker Compose configuration
├── Dockerfile        # Docker image configuration
└── server.js         # Server entry point
```

## Database Models

- **Tour** - Tour information with locations, guides, and ratings
- **User** - User accounts with authentication
- **Review** - User reviews for tours

## Using MongoDB Compass

Connect to the database:

- **Docker mode**: `mongodb://localhost:27017/natours`
- **Local mode**: `mongodb://127.0.0.1:27017/natours`

## License

ISC
