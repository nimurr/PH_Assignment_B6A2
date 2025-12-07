import app from "./app";
import config from "./config";

const port = config.port;

// Only start the server locally, not in Verc
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
