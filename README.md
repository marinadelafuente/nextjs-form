This is a [Next.js](https://nextjs.org/) Typesccript project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and built with [Material UI](https://mui.com/material-ui/) and [React Hook Form](https://www.react-hook-form.com/).

The project is a form that requires the fields "First name", "Last name", "Email" and "Age" to be filled in order to pass the validation to be sent. "First name" have to be under 50 characters and "Age" should only allow values from 18 to 100.

The form will then be sent to an email via [Form Submit](https://formsubmit.co/)

## Getting Started

First, run

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Run Unit Tests

To run tests, just run

```bash
npm run test
```

or

```bash
npm run test:watch
```

## Run Storybook

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006)
