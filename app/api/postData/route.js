import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  let client;
  try {
    const { name } = await req.json();
    client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db("myDatabase");
    const collection = db.collection("myCollection");

    const data = await collection.insertOne({ name });

    const _id = data.insertedId;

    return NextResponse.json({ _id, name });
  } catch (e) {
    console.log(e.message);
    return NextResponse.error(e.message);
  }
}
