// CRUD create read update delete
const {MongoClient, ObjectId} = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectId();
console.log("id", id);


async function connectDB() {
  try {
    // Await the connection promise directly without options or callbacks
    const client = await MongoClient.connect(connectionURL); 

    console.log("Successfully connected to MongoDB!");
    const db = client.db(databaseName);
    // Call functions to perform database operations here
    updateManyTasks(db)
  } catch (error) {
    console.error("Connection failed!", error);
    process.exit(1); // Stop the server if the database fails
  }
}

connectDB();



// ---------------------------------------------------
// INSERTION EXAMPLES
const insertDocument = async (db) => {
  try {
      const doc = {name: "Jenny", age: 29}
      const result = await db.collection("users").insertOne(doc);
      console.log("result", result)
      console.log("doc", doc);
    } catch (error) {
      // Handle duplicate key error (E11000)
     handleDataBaseErro(db)
    }
}

const insertManyDocuments = async (db) => {
  try {
      const docs = [{name: "Sam", age: 29}, {name: "John", age: 27}]
      const result = await db.collection("users").insertMany(docs);
      console.log("result", result)
      console.log("docs", docs);
    } catch (error) {
      // Handle duplicate key error (E11000)
     handleDataBaseErro(db)
    }
}

const insertManyTasks = async (db) => {
  try {
      const tasks = [{description: "Water the plants", completed : false}, {description: "Study for the exam", completed: true}]
      const result = await db.collection("tasks").insertMany(tasks);
      console.log("result", result)
      console.log("tasks", tasks);
    } catch (error) {
     handleDataBaseError(error)
    }
}

// ---------------------------------------------------
// READ EXAMPLES
const findUserByName = async (db) => {
  try {
      const result = await db.collection("users").findOne({name: "Jenny"});
      console.log("result", result);
    } catch (error) {
      handleDataBaseError(error)
    }
}

const findUserById = async (db) => {
  try {
      const result = await db.collection("users").findOne({_id: new ObjectId("6a9b74fb8fbd6d3f2c0eb623")});
      console.log("result", result);
    } catch (error) {
      handleDataBaseError(error)
    }
}

const findUsers = async (db) => {
  try {
      const result = await db.collection("users").find({age: 29}).toArray();
      console.log("result", result);
    } catch (error) {
      handleDataBaseError(error)
    }
}

const findTask = async (db) => {
  try {
      const result = await db.collection("tasks").findOne({_id: new ObjectId("6a9e1403c25d2cf43cdcd3a6")});
      console.log("result", result);
    } catch (error) {
      handleDataBaseError(error)
    }
}

const findTasks = async (db) => {
  try {
      const result = await db.collection("tasks").find({completed: false}).toArray();
      console.log("result", result);
    } catch (error) {
     handleDataBaseError(error)
    }
}

// ---------------------------------------------------
// UPDATE EXAMPLES
const updateUserName = async (db) => {
  try {
    const result = await db.collection("users").updateOne({
      _id: new ObjectId("6a9e122643f345cf7a5961e9")
    }, {
      $set: {
        name: "Updated Name"
      }
    })
  } catch (error) {
    handleDataBaseError(error)
  }
}

const incrementUserAge = async (db) => {
  try {
    const result = await db.collection("users").updateOne({
      _id: new ObjectId("6a9e122643f345cf7a5961e9")
    }, {
      $inc: {
        age: 1
      }
    })
  } catch (error) {
    handleDataBaseError(error)
  }
}

const updateManyTasks = async (db) => {
  try {
    await db.collection("tasks").updateMany({
      completed: false
    }, {
      $set: {
        completed: true 
      }
    })
  } catch (error){
    handleDataBaseError(error);
  }
}

const handleDataBaseError = (error) => {
  if (error.code === 11000) {
    console.error("Error: A record with this unique key already exists.")
  } else {
    console.log("Unable to fetch");
  }
}