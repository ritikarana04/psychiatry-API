#Psychiatry API


```markdown
# Psychiatry API

This project provides a RESTful API for managing patient registrations and fetching details about psychiatrists for different hospitals.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Patient Registration](#patient-registration)
  - [Fetch Psychiatrists](#fetch-psychiatrists)
- [Validation](#validation)
- [Documentation](#documentation)
  - [Postman Collection](#postman-collection)
  - [Swagger Documentation](#swagger-documentation)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- MySQL

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/psychiatry-api.git
   cd psychiatry-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a MySQL database and tables using the provided SQL script in the `README`.

2. Update the MySQL database configuration in the `index.js` file:

   ```javascript
   const db = mysql.createConnection({
     host: 'localhost',
     user: 'your_db_user',
     password: 'your_db_password',
     database: 'your_db_name',
   });
   ```

   Replace `'your_db_user'`, `'your_db_password'`, and `'your_db_name'` with your actual MySQL database user, password, and database name.

## Usage

### Patient Registration

Endpoint: `POST /api/patients`

Register a new patient by sending a JSON payload with the following fields:

- `name` (string, required)
- `address` (string, required)
- `email` (string, required, valid email format)
- `phone` (string, optional, at least 10 digits)
- `password` (string, required, at least one uppercase, one lowercase, one digit, 8-15 characters)
- `photo` (string, optional)
- `hospital_id` (integer, required)

Example Payload:

```json
{
  "name": "John Doe",
  "address": "123 Main Street",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "password": "SecurePass123",
  "photo": "patient_photo.jpg",
  "hospital_id": 1
}
```

### Fetch Psychiatrists

Endpoint: `GET /api/psychiatrists/{hospitalId}`

Fetch details about psychiatrists and patient counts for a specific hospital.

Example:

```bash
curl http://localhost:3000/api/psychiatrists/1
```

## Validation

- Ensure that all mandatory fields are provided in the request.
- Validate the email format using a regular expression.
- Validate the phone number (if provided) using a regular expression.
- Validate the password complexity using a regular expression.

## Documentation

### Postman Collection

[Psychiatry API Postman Collection](link-to-postman-collection)

### Swagger Documentation

Access Swagger documentation by running:

```bash
node swagger.js
```

Open your browser and navigate to http://localhost:3000/api-docs.

## Contributing

Feel free to contribute to this project. Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

This README covers the essential aspects of this project, including prerequisites, installation instructions, usage examples, validation details, and documentation links. Modify it according to the specific details of this project and keep it updated as this project evolves.
