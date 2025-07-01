// File: src/components/Books/BooksList.jsx

import { useState } from "react";
import { Link } from "react-router";
import { useEffectOnce } from "react-use";
import Swal from "sweetalert2";
import { fetchBooks, deleteBook } from "../utils/api";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  async function loadBooks() {
    const data = await fetchBooks();
    if (data.status === "success") {
      setBooks(data.data.books);
    }
  }

  async function handleDelete(id) {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data buku akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
    });

    if (result.isConfirmed) {
      const data = await deleteBook(id);
      if (data.status === "success") {
        Swal.fire("Berhasil!", data.message, "success");
        loadBooks();
      } else {
        Swal.fire("Gagal!", data.message || "Gagal menghapus buku", "error");
      }
    }
  }

  useEffectOnce(() => {
    loadBooks();
  });

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(query.toLowerCase())
  );

  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Daftar Buku</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Cari berdasarkan nama..."
          className="form-control"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Penerbit</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                Tidak ada data ditemukan.
              </td>
            </tr>
          ) : (
            currentBooks.map((book, index) => (
              <tr key={book._id}>
                <td>{indexOfFirst + index + 1}</td>
                <td>{book.name}</td>
                <td>{book.publisher}</td>
                <td>
                  <div className="btn-group">
                    <Link
                      to={`/books/${book._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Detail
                    </Link>
                    <Link
                      to={`/books/${book._id}/edit`}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(book._id)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
