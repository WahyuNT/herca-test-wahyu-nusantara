import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        await client.connect();
        const db = client.db("herca");
        const collection = db.collection("penjualan");

        const data = req.body;
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "Request body cannot be empty" });
        }

        const result = await collection.insertOne({
            ...data,
        });

        res.status(201).json({
            message: "Payment added successfully",
            data: {
                _id: result.insertedId,
                ...data,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    } finally {
        await client.close();
    }
}