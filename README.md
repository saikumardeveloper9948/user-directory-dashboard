# User Directory Dashboard

A React application that fetches and displays users from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users).

## Features

- **Dashboard table** — lists all users with Name, Email, Phone, and Company columns
- **Search** — filters users by name or email (client-side, instant)
- **Sorting** — click the **Name** or **Company** column header to sort ascending/descending
- **User detail page** — click any row to navigate to a full profile showing contact info, address, and company details
- **Keyboard accessible** — rows are focusable; press Enter to open a user

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/) (using `@vitejs/plugin-react` with Babel)
- [React Router v7](https://reactrouter.com/) for client-side routing

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Scripts

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `npm run dev`    | Start the development server       |
| `npm run build`  | Build for production (outputs dist)|
| `npm run lint`   | Run ESLint                         |
| `npm run preview`| Preview the production build       |
