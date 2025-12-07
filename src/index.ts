import app from "./app";
import config from "./config";

const port = config.port || 3000;

// For Vercel deployment, we need to export the app
export default app;

// Only start the server if not in a Vercel environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}