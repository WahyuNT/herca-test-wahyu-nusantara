import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function MarketingComp() {
  const [marketing, setMarketing] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMarketing = await axios.get(`/api/marketing`);
        setMarketing(responseMarketing.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
    
        
          <div className="card shadow-sm border-1 border mt-5 p-3">
              <h4 className="text-center fw-bold">Data Marketing</h4>
              <table className="table table-striped">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                  </tr>
                </thead>
                <tbody>
                  {marketing.map((item: any) => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    </>
  );
}
