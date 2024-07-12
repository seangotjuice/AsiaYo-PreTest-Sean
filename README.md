# Order API

This is a Node.js/Express application that provides an API to validate and transform orders.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Running the Application with Docker

1. Clone the repository:

   ```sh
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Build and start the Docker containers:

   ```sh
   docker-compose up --build
   ```

This command will build the Docker image, install all dependencies, and start the application.

## API Endpoint

- **POST /api/orders**

### Request Body

```json
{
  "id": "A0000001",
  "name": "Melody Holiday Inn",
  "address": {
    "city": "taipei-city",
    "district": "da-an-district",
    "street": "fuxing-south-road"
  },
  "price": "2050",
  "currency": "TWD"
}
```

## Run Tests

```sh
npm test
```

## SOLID Principles and Design Patterns

### Single Responsibility Principle

In this project, the OrderService class is solely responsible for order validation and transformation. The orderRoutes handles routing and controller logic, separating concerns clearly.

### Open/Closed Principle

The OrderService class can be extended to add more validation or transformation rules without modifying the existing code. This ensures that the core functionality remains intact while allowing for future enhancements.

### Liskov Substitution Principle

Although not explicitly demonstrated in this simple example, adhering to this principle means ensuring any subclasses or extended functionalities of the OrderService class would work seamlessly without requiring changes to the existing code.

### Interface Segregation Principle

This principle is not explicitly applied here due to the simplicity of the example. However, in a more complex system, you would ensure that interfaces are specific to the needs of the clients, avoiding monolithic interfaces.

### Dependency Inversion Principle

This principle is not explicitly demonstrated in this example. In a larger application, you would use dependency injection to decouple high-level business logic from low-level data access details, ensuring that changes in low-level modules do not affect high-level modules.
