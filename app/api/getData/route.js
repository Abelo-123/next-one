import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  let client;
  try {
    client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db("myDatabase");
    const collection = db.collection("myCollection");

    const data = await collection.find().toArray();
    await client.connect();

    return NextResponse.json(data);
  } catch (e) {
    console.log(e.message);
    return NextResponse.error(e.message);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export async function POST(req) {
  let client;
  try {
    const { id } = await req.json();
    client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    const db = client.db("myDatabase");
    const collection = db.collection("myCollection");

    const data = await collection.findOne({ _id: new ObjectId(id) });

    return NextResponse.json({ data });
  } catch (e) {
    console.error(e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
