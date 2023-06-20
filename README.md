# Entro Task

An open source application built using Next.js 13.

> **Warning**
> You will need a Postgress database to run.
> There is no auth in this App.
> You will need a Slack App to connect to Slack.

## Features

- Create Task
- Tasks Details
- Edit Task
- Link tasks
- Create task by pressing **ctrl + shift + T**
- Connect to Slack
- Responsive UI
- API Routes
- ORM using **Prisma**
- Database on **Postgress**
- UI Components built using **Chakra UI**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**
- State using **Zustand**

## Roadmap

- [x] ~Responsive UI~
- [x] ~Placeholders~
- [x] ~Loading Skeletons~
- [x] ~Slack Integration~
- [] Keyboard Shortcut
- [] Dark mode

## Known Issues

A list of things not working right now:

1. Drawer does not destroy when closed
2. The Task Card is not clickable on the right side

## Running Locally

1. Install dependencies using npm:

```sh
npm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Build the app to seed-populate the DB with some users:

```sh
npm run build
```

4. Start the development server:

```sh
npm run dev
```
