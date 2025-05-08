import app from "./app";
import Config from "./config/settings";
import { connectToDB } from "./database/db";

const PORT = Config.PORT || 3000;

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${Config.PORT}`);
  });
});
