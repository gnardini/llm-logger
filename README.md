# LLM Logger

LLM Logger is a tool that helps you keep track of your AI API calls
        
Building an AI product is hard. AIs are unreliable, don't always follow output format, and can behave in surprising and unexpected ways, especially with free-form user input.
        
We help you keep track of how your product is working in the wild and help you improve it.

![Demo](assets/screenshot.png)
*LLM Logger Preview*

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- Yarn package manager
- PostgreSQL database

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   yarn
   ```

## Environment Setup

1. Copy the `.env.template` file to `.env`:
   ```
   cp .env.template .env
   ```
2. Fill in the required environment variables in the `.env` file:
   - `DB_HOST`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`: PostgreSQL database connection details
   - `JWT_SECRET`: A random secret for JWT token generation
   - Other optional variables for Resend and Stripe integration

## Running the Project

### Development Mode

To run the project in development mode:

```
yarn dev
```

This will start the server on `http://localhost:3000` (or the port specified in your .env file).

### Production Mode

To run the project in production mode:

Update your .env file:
```
NODE_ENV=production
```

1. Build the project:
   ```
   yarn build
   ```
2. Start the server:
   ```
   yarn start
   ```

## Optional Services

### Resend (for email invitations)

If you want to enable email invitations, sign up for a Resend account and add your API key to the `RESEND_API_KEY` variable in the `.env` file.

## Note

Make sure the PostgreSQL database is running and accessible before starting the application.
