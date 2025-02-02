import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function TunaiComp() {
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

  const generateTransactionNumber = () => {
    return `TRX${Math.floor(100000 + Math.random() * 900000)}`;
  };
  const [formData, setFormData] = useState({
    transaction_number: generateTransactionNumber(),
    marketing_id: 0,
    date: "",
    cargo_fee: 0,
    total_balance: 0,
    grand_total: 0,
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      grand_total: (prevData.cargo_fee || 0) + (prevData.total_balance || 0),
    }));
  }, [formData.cargo_fee, formData.total_balance]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await fetch("/api/pembayaran", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Data berhasil dikirim!");
      setFormData({
        transaction_number: generateTransactionNumber(),
        marketing_id: 0,
        date: "",
        cargo_fee: 0,
        total_balance: 0,
        grand_total: 0,
      });
    } else {
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#fafafa" }}
        className="card  border-1 border mt-5 p-3"
      >
        <h5 className="text-center">
          <strong>Pembayaran Tunai</strong>
        </h5>
        <div className="div">
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-start flex-wrap align-items-end">
              <div className="col-lg-4 col-6 mb-3 pe-lg-2 pe-1">
                <label htmlFor="marketing_id" className="form-label">
                  Marketing
                </label>
                <select
                  className="form-control"
                  id="marketing_id"
                  name="marketing_id"
                  value={formData.marketing_id}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setFormData((prevData) => ({
                      ...prevData,
                      marketing_id: value,
                    }));
                  }}
                  required
                >
                  <option value="">Pilih Marketing</option>
                  {marketing.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-lg-4 col-6 mb-3 ps-lg-2 ps-1">
                <label htmlFor="date" className="form-label">
                  Tanggal
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-lg-4 col-6 mb-3 ps-lg-2 pe-1">
                <label htmlFor="cargo_fee" className="form-label">
                  Biaya Cargo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cargo_fee"
                  name="cargo_fee"
                  value={new Intl.NumberFormat("id-ID").format(
                    formData.cargo_fee || 0
                  )}
                  onChange={(e) => {
                    const value = parseFloat(
                      e.target.value.replace(/\./g, "").replace(/,/g, ".")
                    );
                    if (!isNaN(value)) {
                      setFormData((prevData) => ({
                        ...prevData,
                        cargo_fee: value,
                      }));
                    }
                  }}
                  required
                />
              </div>

              <div className="col-lg-4 col-6 mb-3 pe-lg-2 ps-1">
                <label htmlFor="total_balance" className="form-label">
                  Saldo Total
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="total_balance"
                  name="total_balance"
                  value={new Intl.NumberFormat("id-ID").format(
                    formData.total_balance || 0
                  )}
                  onChange={(e) => {
                    const value = parseFloat(
                      e.target.value.replace(/\./g, "").replace(/,/g, ".")
                    );
                    if (!isNaN(value)) {
                      setFormData((prevData) => ({
                        ...prevData,
                        total_balance: value,
                      }));
                    }
                  }}
                  required
                />
              </div>
              <div className="col-lg-4 col-6 mb-3 ps-lg-2 pe-1">
                <label htmlFor="grand_total" className="form-label">
                  Total Keseluruhan
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="grand_total"
                  name="grand_total"
                  value={new Intl.NumberFormat("id-ID").format(
                    (parseFloat(formData.cargo_fee.toString()) || 0) +
                      (parseFloat(formData.total_balance.toString()) || 0)
                  )}
                  required
                  disabled
                />
              </div>

              <div className="col-lg-4 col-6 mb-3 ps-lg-2 ps-1">
                <button type="submit" className="btn btn-primary">
                  Proses
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
