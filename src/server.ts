import { app } from "./app";
import { envVars } from "./env";

app.listen(envVars.PORT, () =>
  console.log(`Authentication server listening on the port ${envVars.PORT}`)
);
