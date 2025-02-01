import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("herca");
    switch (req.method) {
        case "GET":
            const allPosts = await db.collection("penjualan").aggregate([
                {
                    $lookup: {
                        from: "marketing",
                        localField: "marketing_id",
                        foreignField: "id",
                        as: "marketing_data"
                    }
                },
                {
                    $unwind: "$marketing_data"
                },
                {
                    $group: {
                        _id: {
                            marketing_id: "$marketing_data.id",
                            marketing_name: "$marketing_data.name",
                            month: { $month: { $dateFromString: { dateString: "$date" } } }
                        },
                        Omzet: { $sum: "$total_balance" }
                    }
                },
                {
                    $addFields: {
                        Komisi: {
                            $switch: {
                                branches: [
                                    { case: { $lte: ["$Omzet", 100000000] }, then: 0 },
                                    { case: { $lte: ["$Omzet", 200000000] }, then: 2.5 },
                                    { case: { $lte: ["$Omzet", 500000000] }, then: 5 },
                                    { case: { $gt: ["$Omzet", 500000000] }, then: 10 }
                                ],
                                default: 0
                            }
                        }
                    }
                },
                {
                    $addFields: {
                        komisi_nasional: { $multiply: ["$Omzet", { $divide: ["$Komisi", 100] }] }
                    }
                },
                {
                    $sort: { "_id.month": 1, "_id.marketing_id": 1 }
                }
            ]).toArray();




            res.json({ status: 200, data: allPosts });
            break;
    }
}