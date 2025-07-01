// File: src/components/Dashboard.jsx

import { Link, Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div className="container my-4">
      <div className="bg-light p-4 rounded shadow-sm mb-4">
        <h1 className="text-center mb-3">📚 Buku Dashboard</h1>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/books" className="btn btn-primary">
            📖 Daftar Buku
          </Link>
          <Link to="/books/create" className="btn btn-success">
            ➕ Tambah Buku
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
