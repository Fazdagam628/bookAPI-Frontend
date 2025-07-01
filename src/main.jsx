import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Index from "./components/Index";
import Dashboard from "./components/Dashboard";
import BooksList from "./components/Books/BooksList";
import BookCreate from "./components/Books/BookCreate";
import BookDetail from "./components/Books/BookDetail";
import BookEdit from "./components/Books/BookEdit";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/books">
            <Route index element={<BooksList />} />
            <Route path="create" element={<BookCreate />} />
            <Route path=":id">
              <Route index element={<BookDetail />} />
              <Route path="edit" element={<BookEdit />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
