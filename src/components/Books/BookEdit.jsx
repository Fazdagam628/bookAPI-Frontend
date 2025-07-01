// File: src/components/Books/BookEdit.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { fetchBookById, updateBook } from "../utils/api";

export default function BookEdit() {
  const { id } = useParams();
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

  useEffect(() => {
    async function loadBook() {
      const data = await fetchBookById(id);
      if (data.status === "success") {
        const book = data.data.book;
        setForm({
          name: book.name || "",
          year: book.year || "",
          author: book.author || "",
          summary: book.summary || "",
          publisher: book.publisher || "",
          pageCount: book.pageCount || "",
          readPage: book.readPage || "",
          reading: book.reading || false,
        });
      } else {
        Swal.fire("Gagal", data.message || "Gagal memuat data buku", "error");
      }
    }
    loadBook();
  }, [id]);

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
    const data = await updateBook(id, payload);

    if (data.status === "success") {
      Swal.fire("Berhasil", "Buku berhasil diperbarui", "success");
      navigate({
        pathname: "/books",
      });
    } else {
      Swal.fire("Gagal", data.message || "Gagal memperbarui buku", "error");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Edit Buku</h2>
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
          <button type="submit" className="btn btn-warning">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
