import app from "./app";
import config from "./config";

const port = config.port || 3000;

// For Vercel deployment, we need to export the app
export default app;


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
