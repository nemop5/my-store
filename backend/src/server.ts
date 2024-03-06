import "dotenv/config";
import { appFactory } from "./web/app";

const app = appFactory();

const port = process.env.PORT || 5000;
app.set("port", port);

//eslint-disable-next-line no-console
app.listen(port, () => {
  console.log(`The app is now available on your browser, follow: http://localhost:3000`);
});
