// File: src/components/Books/BookCreate.jsx

import { useState } from "react";
import Swal from "sweetalert2";
import { createBook } from "../utils/api";
import { useNavigate } from "react-router";

export default function BookCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    year: "",
    author: "",
    summary: "",
    publisher: "",
    pageCount: "",
    readPage: "",
    reading: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      year: parseInt(form.year),
      pageCount: parseInt(form.pageCount),
      readPage: parseInt(form.readPage),
    };

    const data = await createBook(payload);

    if (data.status === "success") {
      Swal.fire("Berhasil", "Buku berhasil ditambahkan", "success");
      setForm({
        name: "",
        year: "",
        author: "",
        summary: "",
        publisher: "",
        pageCount: "",
        readPage: "",
        reading: false,
      });
      navigate({
        pathname: "/books",
      });
    } else {
      Swal.fire("Gagal", data.message || "Gagal menambahkan buku", "error");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Tambah Buku</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        {[
          { label: "Nama Buku", name: "name" },
          { label: "Tahun", name: "year", type: "number" },
          { label: "Penulis", name: "author" },
          { label: "Ringkasan", name: "summary" },
          { label: "Penerbit", name: "publisher" },
          { label: "Jumlah Halaman", name: "pageCount", type: "number" },
          { label: "Halaman Dibaca", name: "readPage", type: "number" },
        ].map(({ label, name, type = "text" }) => (
          <div className="col-md-6" key={name}>
            <label className="form-label">{label}</label>
            <input
              className="form-control"
              name={name}
              value={form[name]}
              onChange={handleChange}
              type={type}
              required
            />
          </div>
        ))}
        <div className="col-12">
          <label className="form-check-label">
            <input
              type="checkbox"
              className="form-check-input me-2"
              name="reading"
              checked={form.reading}
              onChange={handleChange}
            />
            Sedang Dibaca
          </label>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Tambah Buku
          </button>
        </div>
      </form>
    </div>
  );
}
