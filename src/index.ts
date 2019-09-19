import express from "express";
import router from "./routes";
import { MongoClient, Db } from "mongodb";

export interface IAppLocs {
  db: Db;
}

const { PORT = 8080 } = process.env;
const app = express();

// Connection URL
const url = "mongodb://localhost:27017";

// // Database Name
const dbName = "cflp";

// // Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function(err, client) {
  if (err) client.close();
  console.log("Connected correctly to server");
  const db = client.db(dbName);

  app.use(router);
  app.locals.db = db;

  app.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}...`)
  );
});
