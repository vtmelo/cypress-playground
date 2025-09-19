# Cypress API Playground

This project is a playground for testing APIs using Cypress.

## API Under Test

We will be using the [ServeRest API](https://github.com/ServeRest/ServeRest?tab=readme-ov-file#localmente-com-docker) for our tests.

## Running ServeRest Locally with Docker

To run the ServeRest API locally using Docker, execute:

```sh
docker run -p 3000:3000 --name serverest -d pauloamgomes/serverest
```

This will start the API on `http://localhost:3000`.

## Getting Started

1. Clone this repository.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the ServeRest API as described above.
4. Run Cypress tests:
   ```sh
   npx cypress open
   ```

---
For more information about ServeRest, see the [ServeRest GitHub repository](https://github.com/ServeRest/ServeRest).