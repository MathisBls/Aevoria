# Aevoria Backend

Backend API server for Aevoria built with Express, TypeScript and Node.js.

## Installation

```bash
npm install
```

## Configuration

Copy `.env.example` to `.env` and configure your environment variables:

```bash
cp .env.example .env
```

## Development

```bash
npm run dev
```

The server will run on `http://localhost:3000` (or the port specified in `.env`).

## Build

```bash
npm run build
```

## Start (Production)

```bash
npm start
```

## API Endpoints

- `GET /` - API information
- `GET /health` - Health check endpoint


