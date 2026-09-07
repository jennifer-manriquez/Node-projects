// CRUD create read update delete
const {MongoClient, ObjectId} = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectId();
console.log("id", id);

const insertDocument = async (db) => {
  try {
      const doc = {name: "Jenny", age: 29}
      const result = await db.collection("users").insertOne(doc);
      console.log("result", result)
      console.log("doc", doc);
    } catch (error) {
      // Handle duplicate key error (E11000)
      if (error.code === 11000) {
        console.error("Error: A record with this unique key already exists.")
      } else {
        console.error("An unexpected database error occurred", error.message)
      }
    }
}

const insertManyDocuments = async (db) => {
  try {
      const docs = [{name: "Jenny", age: 29}, {name: "John", age: 30}]
      const result = await db.collection("users").insertMany(docs);
      console.log("result", result)
      console.log("docs", docs);
    } catch (error) {
      // Handle duplicate key error (E11000)
      if (error.code === 11000) {
        console.error("Error: A record with this unique key already exists.")
      } else {
        console.error("An unexpected database error occurred", error.message)
      }
    }
}

const insertManyTasks = async (db) => {
  try {
      const tasks = [{description: "Grocery shopping", completed : false}, {description: "Get gas for the car", completed: true}]
      const result = await db.collection("tasks").insertMany(tasks);
      console.log("result", result)
      console.log("tasks", tasks);
    } catch (error) {
      // Handle duplicate key error (E11000)
      if (error.code === 11000) {
        console.error("Error: A record with this unique key already exists.")
      } else {
        console.error("An unexpected database error occurred", error.message)
      }
    }
}



async function connectDB() {
  try {
    // Await the connection promise directly without options or callbacks
    const client = await MongoClient.connect(connectionURL); 

    console.log("Successfully connected to MongoDB!");
    const db = client.db(databaseName);
    // insertDocument()
    // insertManyDocuments(db)
    // insertManyTasks(db)
  } catch (error) {
    console.error("Connection failed!", error);
    process.exit(1); // Stop the server if the database fails
  }
}

connectDB();