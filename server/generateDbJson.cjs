const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const DB_JSON_SERVER_PATH = path.join(__dirname, "db.json");

if (fs.existsSync(DB_JSON_SERVER_PATH)) {
  fs.unlinkSync(DB_JSON_SERVER_PATH);
}

const tasks = [
  {
    id: uuidv4(),
    title: "Sample Task",
    description: "This is a sample task description",
    status: "pending",
    "created-at": Date.now(),
    "due-date": Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year from now
    "user-uuid": uuidv4(),
  },
];

const users = [];

const db = { tasks, users };

fs.writeFileSync(DB_JSON_SERVER_PATH, JSON.stringify(db, null, 2));
console.log("db.json has been generated with dynamic values.");
