import app from "./src/app";
import { env } from "./src/config/env";

app.listen(env.PORT, (err) => {
  if (err) {
    console.log("error in running the server", err);
    process.exit(1);
  }
  console.log(`Server is up and running at http://localhost:${env.PORT}`);
});
