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
                        omzet: { $sum: "$total_balance" }
                    }
                },
                {
                    $addFields: {
                        komisi: {
                            $switch: {
                                branches: [
                                    { case: { $lte: ["$omzet", 100000000] }, then: 0 },
                                    { case: { $lte: ["$omzet", 200000000] }, then: 2.5 },
                                    { case: { $lte: ["$omzet", 500000000] }, then: 5 },
                                    { case: { $gt: ["$omzet", 500000000] }, then: 10 }
                                ],
                                default: 0
                            }
                        }
                    }
                },
                {
                    $addFields: {
                        komisi_nasional: { $multiply: ["$omzet", { $divide: ["$komisi", 100] }] }
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