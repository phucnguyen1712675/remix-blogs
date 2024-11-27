# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shell
npm run dev
```

## Database Setup

To run the database, follow these steps:

1. Ensure you have Docker installed on your machine.
2. Start the database container using Docker Compose:

   ```shell
   docker-compose up -d
   ```

3. Apply any pending migrations:

   ```shell
   npm run migrate
   ```

4. Seed the database with initial data (if applicable):

   ```shell
   npm run seed
   ```

## Deployment

First, build your app for production:

```shell
npm run build
```

Then run the app in production mode:

```shell
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer. See the [Vite docs on CSS](https://vitejs.dev/guide/features.html#css) for more information.
