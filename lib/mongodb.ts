import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClient: MongoClient | undefined;
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!uri) {
  console.warn("MONGODB_URI environment variable is missing.");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri);
    // A promise cached by an older module instance may belong to another client.
    global._mongoClientPromise = undefined;
  }
  client = global._mongoClient;
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// The auth adapter uses `client.db()` directly; keep the eager connection
// promise handled even when no module imports the default export.
void clientPromise.catch(() => {});

export { client };
export default clientPromise;
