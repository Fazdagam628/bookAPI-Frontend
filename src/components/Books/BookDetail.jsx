// File: src/components/Books/BookDetail.jsx

import { useState } from "react";
import { useParams } from "react-router";
import { useEffectOnce } from "react-use";
import { fetchBookById } from "../utils/api";
import Swal from "sweetalert2";

export default function BookDetail() {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  async function loadBook() {
    const data = await fetchBookById(id);
    if (data.status === "success") {
      setBook(data.data.book);
    } else {
      Swal.fire("Gagal", data.message || "Gagal memuat detail buku", "error");
    }
  }

  useEffectOnce(() => {
    loadBook();
  });

  if (!book) {
    return <div className="container my-4">Loading...</div>;
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">Detail Buku</h2>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Nama</th>
            <th>Tahun</th>
            <th>Penulis</th>
            <th>Ringkasan</th>
            <th>Penerbit</th>
            <th>Jumlah Halaman</th>
            <th>Halaman Dibaca</th>
            <th>Selesai</th>
            <th>Sedang Dibaca</th>
            <th>Ditambahkan</th>
            <th>Diperbarui</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{book.name}</td>
            <td>{book.year}</td>
            <td>{book.author}</td>
            <td>{book.summary}</td>
            <td>{book.publisher}</td>
            <td>{book.pageCount}</td>
            <td>{book.readPage}</td>
            <td>{book.finished ? "Ya" : "Tidak"}</td>
            <td>{book.reading ? "Ya" : "Tidak"}</td>
            <td>{book.insertedAt}</td>
            <td>{book.updatedAt}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
