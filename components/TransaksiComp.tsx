import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function TransaksiComp() {
  interface Post {
    transaction_number: string;
    marketing_id: string;
    date: string;
    cargo_fee: number;
    total_balance: number;
    grand_total: number;
    installment_count: number | null;
    monthly_installment: number | null;
  }

  const [posts, setPosts] = useState<Post[]>([]);

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
      <div className="card  mt-5 p-3 shadow-sm border-0 border">
        <h4 className="text-center fw-bold">Data Transaksi</h4>

        <div className="table-responsive ">
          <table className="table table-striped">
            <thead className="bg-secondary text-white">
              <tr>
                <th>ID</th>
                <th>Transaction Number</th>
                <th>Marketing ID</th>
                <th>Date</th>
                <th>Cargo Fee</th>
                <th>Total Balance</th>
                <th>Grand Total</th>
                <th>Installment</th>
                <th>Debt</th>
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
                  <td className="text-center">
                    {item.installment_count === 0 ||
                    item.installment_count === null ||
                    item.installment_count === undefined
                      ? "-"
                      : item.installment_count + " Bulan"}
                  </td>
                  <td>
                    {item.monthly_installment === 0 ||
                    item.monthly_installment === null ||
                    item.monthly_installment === undefined ? (
                      <span className="badge bg-success rounded-pill">
                        Success
                      </span>
                    ) : (
                      item.monthly_installment
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
