# Todos App with MSW

A React 18 SPA for managing todos with **Redux Toolkit / RTK Query** and **MSW** for API mocking. Works in **development and production** (Netlify) with environment-controlled mocking.

---

## Features

* CRUD todos with pagination, filtering, and sorting
* Mocked API via MSW
* TypeScript support
* Production-ready (Netlify)

---

## Tech Stack

* **React 18 + TypeScript**
* **Redux Toolkit / RTK Query**
* **MSW** (Mock Service Worker)
* **Vite**
* **Normalizr** for entity normalization

---

## Setup

```bash
git clone <repo>
cd <repo>
yarn install

⚠️ Ensure Node.js version matches engines in package.json (>= 18.18.0 || >=20.9.0).

npx msw init public/   # generates mockServiceWorker.js
```

Create a `.env` file:

```env
VITE_API_URL=/api
VITE_USE_MSW=true
```

Start development:

```bash
yarn dev
```

Build for production:

```bash
yarn build
```

Deploy on Netlify, ensure `VITE_USE_MSW=true` for mocks.

---

## Architecture & Choices

* **MSW**: Intercepts fetch requests for offline/demo mode
* **RTK Query**: Handles queries, mutations, caching, and invalidation
* **Normalized state**: Efficient updates for todos
* **Conditional mocking**: MSW starts before React renders

---

## Usage Example

```ts
const { data, isLoading } = useGetTodosQuery({ page: 1, limit: 10 });
const [createTodo] = useCreateTodoMutation();
```

---

## Folder Structure

```
src/
├─ api/       # RTK Query APIs
├─ components/
├─ mocks/     # MSW handlers
├─ store/
├─ types/
public/
└─ mockServiceWorker.js
```

