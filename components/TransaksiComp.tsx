import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function TransaksiComp() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/penjualan`);
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="card  mt-5 p-3 shadow-sm border-1 border">
        <h4 className="text-center fw-bold">Data Transaksi</h4>

        <div className="table-responsive ">
          <table className="table table-striped">
            <thead className="bg-secondary text-white">
              <tr>
                <th>ID</th>
                <th>
                  Transaction <br /> Number
                </th>
                <th>
                  Marketing <br /> ID
                </th>
                <th>Date</th>
                <th>Cargo Fee</th>
                <th>Total Balance</th>
                <th>Grand Total</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((item: any) => (
                <tr>
                  <td>{posts.indexOf(item) + 1}</td>
                  <td>{item.transaction_number}</td>
                  <td>{item.marketing_id}</td>
                  <td>{item.date}</td>
                  <td>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(item.cargo_fee)}
                  </td>
                  <td>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(item.total_balance)}
                  </td>
                  <td>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(item.grand_total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      ;
    </>
  );
}
