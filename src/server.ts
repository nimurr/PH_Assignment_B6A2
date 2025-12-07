import app from "./app";
import config from "./config";

const port = config.port;

// For Vercel deployment, export the app as a handler
export default app;

// Only start the server locally, not in Vercel
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}