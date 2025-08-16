# JWT Token Validation API

A simple and focused API for validating JSON Web Tokens (JWTs).

## Objective

The primary goal of this project is to provide a straightforward endpoint to verify the authenticity and integrity of a JWT. It checks the token's signature against a secret and ensures it conforms to the expected format and algorithm.

## Features

*   **Single Endpoint:** A dedicated `POST /tokens/jwt/validate` endpoint for all validation requests.
*   **Flexible Token Submission:** Accepts the JWT from:
    *   `Authorization` header
    *   Request body (`{ "jwt": "<token>" }`)
    *   Query parameter (`?jwt=<token>`)

## Tech Stack

*   **Framework:** Fastify
*   **Language:** TypeScript
*   **Database:** SQLite with Drizzle ORM
*   **Schema Validation:** Zod

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```