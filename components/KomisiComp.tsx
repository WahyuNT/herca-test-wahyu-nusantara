import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function KomisiComp() {
  const [komisi, setKomisi] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseKomisi = await axios.get(`/api/komisi`);
        setKomisi(responseKomisi.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="card mt-5 p-3 shadow-sm border-0 border">
        <h4 className="text-center fw-bold">Data Komisi</h4>

        <div className="table-responsive">
          <table className="table table-striped ">
            <thead className="bg-secondary text-white">
              <tr>
                <th>Marketing</th>
                <th>Bulan</th>
                <th>Omzet</th>
                <th>Komisi % </th>
                <th>Komisi Nominal</th>
              </tr>
            </thead>
            <tbody>
              {komisi.map((item: any) => (
                <tr>
                  <td>{item._id.marketing_name}</td>

                  <td>
                    {new Date(0, item._id.month - 1).toLocaleString("id-ID", {
                      month: "long",
                    })}
                  </td>
                  <td>{new Intl.NumberFormat("id-ID").format(item.omzet)}</td>
                  <td>{item.komisi}%</td>
                  <td>
                    {new Intl.NumberFormat("id-ID").format(
                      item.komisi_nasional
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
