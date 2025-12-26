import React, { useState } from "react";
import useGetBooksbyisbn from "../hooks/useGetBooksbyisbn";
import useGetBooksbytitle from "../hooks/useGetbookbytitle";
import useGetBooksbypublisher from "../hooks/useGetbookbypublisher";
import useGetBooksbyauthor from "../hooks/useGetbookbyauthor";
import useGetBooksbycategory from "../hooks/useGetbookbycategory";
import useAddBooktocart from "../hooks/useAddbooktocart";
const ViewBooks = () => {
  const [searchType, setSearchType] = useState<
    "isbn" | "title" | "category" | "author" | "publisher"
  >("isbn");
  const [searchValue, setSearchValue] = useState("");
  const [submittedIsbn, setSubmittedIsbn] = useState("");
  const [submittedTitle, setSubmittedTitle] = useState("");
  const [submittedCategory, setSubmittedCategory] = useState("");
  const [submittedAuthor, setSubmittedAuthor] = useState("");
  const [submittedPublisher, setSubmittedPublisher] = useState("");
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const {
    data: isbnData,
    isError: isbnError,
    error: isbnErrorMsg,
  } = useGetBooksbyisbn({
    isbn: submittedIsbn,
  });
  const addBooktocart = useAddBooktocart(selectedBook?.isbn);
  const {
    data: addBooktocartData,
    isError: addBooktocartError,
    error: addBooktocartErrorMsg,
  } = addBooktocart;
  const {
    data: titleData,
    isError: titleError,
    error: titleErrorMsg,
  } = useGetBooksbytitle({
    title: submittedTitle,
  });
  const {
    data: categoryData,
    isError: categoryError,
    error: categoryErrorMsg,
  } = useGetBooksbycategory({
    category: submittedCategory,
  });
  const {
    data: authorData,
    isError: authorError,
    error: authorErrorMsg,
  } = useGetBooksbyauthor({
    author: submittedAuthor,
  });
  const {
    data: publisherData,
    isError: publisherError,
    error: publisherErrorMsg,
  } = useGetBooksbypublisher({
    publisher: submittedPublisher,
  });
  const isError =
    searchType === "isbn"
      ? isbnError
      : searchType === "title"
      ? titleError
      : searchType === "category"
      ? categoryError
      : searchType === "author"
      ? authorError
      : publisherError;
  const error =
    searchType === "isbn"
      ? isbnErrorMsg
      : searchType === "title"
      ? titleErrorMsg
      : searchType === "category"
      ? categoryErrorMsg
      : searchType === "author"
      ? authorErrorMsg
      : publisherErrorMsg;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedBook(null); // Reset selection when searching
    if (searchType === "isbn") {
      setSubmittedIsbn(searchValue);
      setSubmittedTitle("");
      setSubmittedCategory("");
      setSubmittedAuthor("");
      setSubmittedPublisher("");
    } else if (searchType === "title") {
      setSubmittedTitle(searchValue);
      setSubmittedIsbn("");
      setSubmittedCategory("");
      setSubmittedAuthor("");
      setSubmittedPublisher("");
    } else if (searchType === "category") {
      setSubmittedCategory(searchValue);
      setSubmittedIsbn("");
      setSubmittedTitle("");
      setSubmittedAuthor("");
      setSubmittedPublisher("");
    } else if (searchType === "author") {
      setSubmittedAuthor(searchValue);
      setSubmittedIsbn("");
      setSubmittedTitle("");
      setSubmittedCategory("");
      setSubmittedPublisher("");
    } else {
      setSubmittedPublisher(searchValue);
      setSubmittedIsbn("");
      setSubmittedTitle("");
      setSubmittedCategory("");
      setSubmittedAuthor("");
    }
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
        <div
          style={{
            marginBottom: "15px",
            display: "flex",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              type="radio"
              value="isbn"
              checked={searchType === "isbn"}
              onChange={(e) =>
                setSearchType(
                  e.target.value as
                    | "isbn"
                    | "title"
                    | "category"
                    | "author"
                    | "publisher"
                )
              }
            />
            Search by ISBN
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              type="radio"
              value="title"
              checked={searchType === "title"}
              onChange={(e) =>
                setSearchType(
                  e.target.value as
                    | "isbn"
                    | "title"
                    | "category"
                    | "author"
                    | "publisher"
                )
              }
            />
            Search by Title
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              type="radio"
              value="category"
              checked={searchType === "category"}
              onChange={(e) =>
                setSearchType(
                  e.target.value as
                    | "isbn"
                    | "title"
                    | "category"
                    | "author"
                    | "publisher"
                )
              }
            />
            Search by Category
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              type="radio"
              value="author"
              checked={searchType === "author"}
              onChange={(e) =>
                setSearchType(
                  e.target.value as
                    | "isbn"
                    | "title"
                    | "category"
                    | "author"
                    | "publisher"
                )
              }
            />
            Search by Author
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              type="radio"
              value="publisher"
              checked={searchType === "publisher"}
              onChange={(e) =>
                setSearchType(
                  e.target.value as
                    | "isbn"
                    | "title"
                    | "category"
                    | "author"
                    | "publisher"
                )
              }
            />
            Search by Publisher
          </label>
        </div>
        <form className="d-flex" role="search" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder={
              searchType === "isbn"
                ? "Search books by ISBN"
                : searchType === "title"
                ? "Search books by Title"
                : searchType === "category"
                ? "Search books by Category"
                : searchType === "author"
                ? "Search books by Author"
                : "Search books by Publisher"
            }
            aria-label="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>

      {isError &&
        (submittedIsbn ||
          submittedTitle ||
          submittedCategory ||
          submittedAuthor ||
          submittedPublisher) && (
          <div className="alert alert-danger mt-5">
            Failed to load book: {error?.message || "Unknown error"}
            <br />
            <small>
              Book not found or invalid{" "}
              {searchType === "isbn"
                ? "ISBN"
                : searchType === "title"
                ? "title"
                : searchType === "category"
                ? "category"
                : searchType === "author"
                ? "author"
                : "publisher"}
              .
            </small>
          </div>
        )}

      {((searchType === "title" && titleData && titleData.length > 0) ||
        (searchType === "category" &&
          categoryData &&
          categoryData.length > 0) ||
        (searchType === "author" && authorData && authorData.length > 0) ||
        (searchType === "publisher" &&
          publisherData &&
          publisherData.length > 0) ||
        (searchType === "isbn" && isbnData && isbnData.length > 0)) &&
        !selectedBook && (
          <div
            style={{
              marginTop: "30px",
              maxWidth: "900px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              {searchType === "title"
                ? `Found ${
                    titleData?.length || 0
                  } book(s) with title "${submittedTitle}"`
                : searchType === "category"
                ? `Found ${
                    categoryData?.length || 0
                  } book(s) in category "${submittedCategory}"`
                : searchType === "author"
                ? `Found ${
                    authorData?.length || 0
                  } book(s) by author "${submittedAuthor}"`
                : searchType === "publisher"
                ? `Found ${
                    publisherData?.length || 0
                  } book(s) by publisher "${submittedPublisher}"`
                : `Found ${
                    isbnData?.length || 0
                  } book(s) with ISBN "${submittedIsbn}"`}
            </h3>
            <table
              className="table table-bordered "
              style={{ borderColor: "black" }}
            >
              <thead style={{ backgroundColor: "beige" }}>
                <tr>
                  <th style={{ backgroundColor: "beige" }}>ISBN</th>
                  <th style={{ backgroundColor: "beige" }}>Title</th>
                  <th style={{ backgroundColor: "beige" }}>Publication Year</th>
                  <th style={{ backgroundColor: "beige" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {(searchType === "title"
                  ? titleData
                  : searchType === "category"
                  ? categoryData
                  : searchType === "author"
                  ? authorData
                  : searchType === "publisher"
                  ? publisherData
                  : isbnData
                )?.map((book: any) => (
                  <tr key={book.isbn}>
                    <td style={{ backgroundColor: "beige" }}>{book.isbn}</td>
                    <td style={{ backgroundColor: "beige" }}>{book.title}</td>
                    <td style={{ backgroundColor: "beige" }}>
                      {book.publicationYear}
                    </td>
                    <td style={{ backgroundColor: "beige" }}>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setSelectedBook(book)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {selectedBook && (
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
              border: "2px solid black",
              borderCollapse: "collapse",
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
                  {selectedBook.title} - Details
                  {(searchType === "title" ||
                    searchType === "category" ||
                    searchType === "author" ||
                    searchType === "publisher") && (
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ marginLeft: "20px" }}
                      onClick={() => setSelectedBook(null)}
                    >
                      Back to List
                    </button>
                  )}
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
                  {selectedBook.isbn}
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
                  {selectedBook.title}
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
                  <strong>Authors</strong>
                </td>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  {selectedBook.authors
                    ? selectedBook.authors
                        .map(
                          (author) => `${author.firstName} ${author.lastName}`
                        )
                        .join(", ")
                    : "N/A"}
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
                  {selectedBook.publicationYear}
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
                  <strong>Publisher </strong>
                </td>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  {selectedBook.publisher
                    ? `${selectedBook.publisher.publisherName}`
                    : "N/A"}
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
                  <strong>Category </strong>
                </td>
                <td
                  style={{
                    fontSize: "1.1rem",
                    padding: "15px",
                    backgroundColor: "beige",
                  }}
                >
                  {selectedBook.category
                    ? `${selectedBook.category.name}`
                    : "N/A"}
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
                  {selectedBook.sellingPrice}
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
                  {selectedBook.stockQuantity}
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
                  {selectedBook.threshold}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    backgroundColor: "beige",
                  }}
                >
                  <button
                    className="btn btn-outline-danger"
                    style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                    onClick={() => addBooktocart.mutate()}
                    disabled={addBooktocart.isPending}
                  >
                    Add to Cart
                  </button>
                  {addBooktocartData && (
                    <div
                      style={{
                        marginTop: "15px",
                        padding: "10px 20px",
                        backgroundColor: "#d4edda",
                        color: "#155724",
                        border: "1px solid #c3e6cb",
                        borderRadius: "5px",
                        fontSize: "1rem",
                      }}
                    >
                      {addBooktocartData.message}
                    </div>
                  )}
                  {addBooktocartError && (
                    <div
                      style={{
                        marginTop: "15px",
                        padding: "10px 20px",
                        backgroundColor: "#f8d7da",
                        color: "#721c24",
                        border: "1px solid #f5c6cb",
                        borderRadius: "5px",
                        fontSize: "1rem",
                      }}
                    >
                      {addBooktocartErrorMsg?.response?.data?.message ||
                        addBooktocartErrorMsg?.message ||
                        "Error adding book to cart"}
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ViewBooks;
