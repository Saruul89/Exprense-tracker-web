import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { neon } from "@neondatabase/serverless";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 8100;
const sql = neon(`${process.env.DATABASE_URL}`);

app.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await sql`SELECT * FROM "user" WHERE email = ${email}`;

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await sql`
      INSERT INTO "user" (name, email, password) 
      VALUES (${name}, ${email}, ${password})
      RETURNING  id, name, email, password`;

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser[0] });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error during user creation" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await sql`SELECT * FROM "user" WHERE email = ${email}`;

    if (user.length === 0) {
      return res
        .status(400)
        .json({ message: "Email or password does not match" });
    }

    if (user[0].password !== password) {
      return res.status(400).json({ message: "Password does not match" });
    }

    res.status(200).json({ message: "Login successful", user: user[0] });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error during user login" });
  }
});

app.post("/records", async (req, res) => {
  const { name, amount, transaction_type } = req.body;
  try {
    const records = await sql`
   
      INSERT INTO "record" (name , amount, transaction_type)
      VALUES (${name},${amount},${transaction_type})
            RETURNING *
    `;

    res
      .status(201)
      .json({ message: "Record added successfully", record: records[0] });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error during record creation" });
  }
});

app.get("/records", async (req, res) => {
  try {
    const records = await sql`SELECT * FROM "record" ORDER BY createdAt DESC`;
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error during fetching records" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
