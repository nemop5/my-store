import "dotenv/config";
import { appFactory } from "./web/app";

const app = appFactory();

const port = process.env.PORT || 5000;
app.set("port", port);

//eslint-disable-next-line no-console
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
