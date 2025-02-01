import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("herca");
    switch (req.method) {
        case "GET":
            const allPosts = await db.collection("penjualan").find({}).sort({ "_id": 1 }).toArray();
            res.json({ status: 200, data: allPosts });
            break;
    }
}