import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useGetBooksbyisbn from "../hooks/useGetBooksbyisbn";

const ModifyBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchIsbn, setSearchIsbn] = useState(location.state?.isbn || "");
  const [submittedIsbn, setSubmittedIsbn] = useState(location.state?.isbn || "");

  const { data, isError, error } = useGetBooksbyisbn({
    isbn: submittedIsbn,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedIsbn(searchIsbn);
  };

  return (
    <>
      <div
        style={{
          marginTop: "40px",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <form className="d-flex" role="search" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search books by ISBN"
            aria-label="Search"
            value={searchIsbn}
            onChange={(e) => setSearchIsbn(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>

      {isError && submittedIsbn && (
        <div className="alert alert-danger mt-5">
          Failed to load book: {error?.message || "Unknown error"}
          <br />
          <small>Book not found or invalid ISBN.</small>
        </div>
      )}

      {data && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            backgroundColor: "beige",
            padding: "20px",
            margin: "0",
            overflow: "auto",
            boxSizing: "border-box",
          }}
        >
          <table
            className="table table-bordered"
            style={{
              width: "100%",
              height: "90%",
              backgroundColor: "#e3f2fd",
              margin: "0",
              borderColor: "black",
            }}
          >
            <thead style={{ backgroundColor: "beige" }}>
              <tr>
                <th
                  colSpan={3}
                  style={{
                    textAlign: "center",
                    fontSize: "2rem",
                    padding: "20px",
                    backgroundColor: "beige",
                  }}
                >
                  {data.title} - Details
                </th>
              </tr>
              <tr>
                <th
                  style={{
                    fontSize: "1.2rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  Field
                </th>
                <th
                  style={{
                    fontSize: "1.2rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  Value
                </th>
                <th
                  style={{
                    fontSize: "1.2rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "beige" }}>
              <tr>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  <strong>ISBN</strong>
                </td>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  {data.isbn}
                </td>
                <td style={{ padding: "15px", backgroundColor: "beige" }}>
                  <button
                    className="btn btn-outline-danger"
                    style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                    onClick={() =>
                      navigate("/modify/book/isbn", {
                        state: { bookData: data },
                      })
                    }
                  >
                    Modify
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  <strong>Title</strong>
                </td>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  {data.title}
                </td>
                <td style={{ padding: "15px", backgroundColor: "beige" }}>
                  <button
                    className="btn btn-outline-danger"
                    style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                    onClick={() =>
                      navigate("/modify/book/title", {
                        state: { bookData: data },
                      })
                    }
                  >
                    Modify
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  <strong>Author IDs</strong>
                </td>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  {data.authorIds ? data.authorIds.join(", ") : "N/A"}
                </td>
                <td style={{ padding: "15px", backgroundColor: "beige" }}>
                  <button
                    className="btn btn-outline-danger"
                    style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                    onClick={() =>
                      navigate("/modify/book/authorIds", {
                        state: { bookData: data },
                      })
                    }
                  >
                    Modify
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  <strong>Publication Year</strong>
                </td>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  {data.publicationYear}
                </td>
                <td style={{ padding: "15px", backgroundColor: "beige" }}>
                  <button
                    className="btn btn-outline-danger"
                    style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                    onClick={() =>
                      navigate("/modify/book/publicationYear", {
                        state: { bookData: data },
                      })
                    }
                  >
                    Modify
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  <strong>Publisher ID</strong>
                </td>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  {data.publisherId}
                </td>
                <td style={{ padding: "15px", backgroundColor: "beige" }}>
                  <button
                    className="btn btn-outline-danger"
                    style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                    onClick={() =>
                      navigate("/modify/book/publisherId", {
                        state: { bookData: data },
                      })
                    }
                  >
                    Modify
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  <strong>Category ID</strong>
                </td>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  {data.categoryId}
                </td>
                <td style={{ padding: "15px", backgroundColor: "beige" }}>
                  <button
                    className="btn btn-outline-danger"
                    style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                    onClick={() =>
                      navigate("/modify/book/categoryId", {
                        state: { bookData: data },
                      })
                    }
                  >
                    Modify
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  <strong>Selling Price</strong>
                </td>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  {data.sellingPrice}
                </td>
                <td style={{ padding: "15px", backgroundColor: "beige" }}>
                  <button
                    className="btn btn-outline-danger"
                    style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                    onClick={() =>
                      navigate("/modify/book/sellingPrice", {
                        state: { bookData: data },
                      })
                    }
                  >
                    Modify
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  <strong>stockQuantity</strong>
                </td>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  {data.stockQuantity}
                </td>
                <td style={{ padding: "15px", backgroundColor: "beige" }}>
                  <button
                    className="btn btn-outline-danger"
                    style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                    onClick={() =>
                      navigate("/modifyBookStock", {
                        state: { isbn: data.isbn },
                      })
                    }
                  >
                    Modify
                  </button>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  <strong>Threshold</strong>
                </td>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  {data.threshold}
                </td>
                <td style={{ padding: "15px", backgroundColor: "beige" }}>
                  <button
                    className="btn btn-outline-danger"
                    style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                    onClick={() =>
                      navigate("/modify/book/threshold", {
                        state: { bookData: data },
                      })
                    }
                  >
                    Modify
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ModifyBook;
