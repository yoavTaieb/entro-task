# Entro Task

An open source application built using Next.js 13.

> **Warning**
> This app is not production-ready.


## Features

- Create Task
- Tasks Details
- Edit Task
- Link tasks
- Responsive UI
- API Routes
- ORM using **Prisma**
- Database on **Postgress**
- UI Components built using **Chakra UI**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**

## Roadmap

- [x] ~Responsive UI~
- [x] ~Placeholders~
- [x] ~Loading Skeletons~
- [] Keyboard Shortcut
- [] Dark mode

## Known Issues

A list of things not working right now:

1. Drawer does not destroy when closed

## Running Locally

1. Install dependencies using npm:

```sh
npm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Build the app to seed populate de DB with some users:

```sh
npm run build
```

4. Start the development server:

```sh
npm run dev
```
