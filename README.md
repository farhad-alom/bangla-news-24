# Bangla News 24

A simple Bengali news website. Read news, browse categories, and sign up or sign in.

**Live site:** https://bangla-news-24-app.vercel.app

## Features

- Top news and a breaking news banner
- "Most read" list
- News by category
- Full article page with images
- Sign up, sign in, and sign out

## Built with

Next.js 16, React 19, TypeScript, Tailwind CSS, daisyUI, better-auth, and MongoDB.

## Run it on your computer

You need [Node.js](https://nodejs.org) (version 20.9 or newer) and a free [MongoDB Atlas](https://www.mongodb.com/atlas) database.

1. Download the project:
   ```bash
   git clone https://github.com/farhad-alom/bangla-news-24.git
   cd bangla-news-24
   npm install
   ```
2. Create a file named `.env` in the main folder and add:
   ```
   MONGODB_URI=your-mongodb-link
   BETTER_AUTH_SECRET=any-long-random-text
   BETTER_AUTH_URL=http://localhost:3000
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 in your browser.

## Other commands

- `npm run build` - make a production build
- `npm start` - run the production build
- `npm run lint` - check the code

## Where does the news come from?

From the free public API [news-api-v2](https://news-api-v2.vercel.app). If the API is down, the site shows a Bengali "no data" message.

## Common problems

- **App will not start:** check that your `.env` file has all three values.
- **Database error:** in MongoDB Atlas, add your IP address under Network Access.
- **Cannot sign in after deploy:** set `BETTER_AUTH_URL` to your live site link.
- **No news showing:** the news API may be down. Try again later.

## Author

Farhad Alom - [github.com/farhad-alom](https://github.com/farhad-alom)
