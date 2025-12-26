import { useNavigate } from "react-router-dom";
import useGetaddedbookstocart from "../hooks/useGetbooksaddedtocart";
import useModifyquantity from "../hooks/useModifybookquantity";
import useRemoveBookFromCart from "../hooks/useRemovebookfromcart";
import { useState } from "react";

const ViewCart = () => {
  const navigate = useNavigate();
  const { data: addedBooks, refetch } = useGetaddedbookstocart();
  const [removingIsbn, setRemovingIsbn] = useState<string>("");
  const [modifyingIsbn, setModifyingIsbn] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const removeBook = useRemoveBookFromCart(removingIsbn);
  const {
    data: removeData,
    isError: removeError,
    error: removeErrorMsg,
  } = removeBook;
  const modifyQuantity = useModifyquantity(quantity, modifyingIsbn);
  const {
    data: modifyData,
    isError: modifyError,
    error: modifyErrorMsg,
  } = modifyQuantity;

  return (
    <>
      {addedBooks && (
        <div className="mt-4">
          <h3
            style={{
              textAlign: "center",
              fontSize: "2rem",
              padding: "20px",
              backgroundColor: "beige",
            }}
          >
            Books Added to Cart - Details
          </h3>
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
                backgroundColor: "#e3f2fd",
                margin: "0",
                borderColor: "black",
                border: "2px solid black",
                borderCollapse: "collapse",
              }}
            >
              <thead style={{ backgroundColor: "beige" }}>
                <tr>
                  <th style={{ backgroundColor: "beige" }}>ISBN</th>
                  <th style={{ backgroundColor: "beige" }}>Title</th>
                  <th style={{ backgroundColor: "beige" }}>Unit Price</th>
                  <th style={{ backgroundColor: "beige" }}>Quantity</th>
                  <th style={{ backgroundColor: "beige" }}>New Quantity</th>
                  <th style={{ backgroundColor: "beige" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {addedBooks?.items?.map((item) => (
                  <tr key={item.isbn}>
                    <td style={{ backgroundColor: "beige" }}>{item.isbn}</td>
                    <td style={{ backgroundColor: "beige" }}>{item.title}</td>
                    <td style={{ backgroundColor: "beige" }}>
                      {item.unitPrice}
                    </td>
                    <td style={{ backgroundColor: "beige" }}>
                      {item.quantity}
                    </td>
                    <td style={{ backgroundColor: "beige" }}>
                      <input
                        type="number"
                        min="1"
                        placeholder="New quantity"
                        style={{
                          width: "128px",
                          padding: "8px",
                          fontSize: "1rem",
                          border: "black 1px solid",
                          borderRadius: "4px",
                        }}
                        onChange={(e) => {
                          setQuantity(parseInt(e.target.value) || 0);
                          setModifyingIsbn(item.isbn);
                        }}
                      />
                    </td>
                    <td style={{ backgroundColor: "beige" }}>
                      <button
                        className="btn btn-outline-primary"
                        style={{
                          fontSize: "1.1rem",
                          padding: "12px 30px",
                          marginRight: "10px",
                        }}
                        onClick={() => {
                          setModifyingIsbn(item.isbn);
                          modifyQuantity.mutate(undefined, {
                            onSuccess: () => {
                              refetch();
                            },
                          });
                        }}
                      >
                        Update Quantity
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                        onClick={() => {
                          setRemovingIsbn(item.isbn);
                          removeBook.mutate(undefined, {
                            onSuccess: () => {
                              refetch();
                            },
                          });
                        }}
                      >
                        Remove from Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: "20px", fontSize: "1.2rem" }}>
              <strong>Total Items: </strong>
              {addedBooks.totalItems}
            </div>
            <div style={{ fontSize: "1.2rem" }}>
              <strong>Total Price: $</strong>
              {addedBooks.totalCartPrice}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
                width: "100%",
              }}
            >
              <button
                className="btn btn-outline-danger"
                style={{
                  fontSize: "1.1rem",
                  padding: "12px 60px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/checkout", {
                    state: { expectedTotal: addedBooks.totalCartPrice },
                  });
                }}
              >
                Checkout
              </button>
            </div>
            {removeData && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px 20px",
                  backgroundColor: "#d4edda",
                  color: "#155724",
                  border: "1px solid #c3e6cb",
                  borderRadius: "5px",
                  fontSize: "1.1rem",
                  textAlign: "center",
                }}
              >
                {removeData.message}
              </div>
            )}
            {removeError && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px 20px",
                  backgroundColor: "#f8d7da",
                  color: "#721c24",
                  border: "1px solid #f5c6cb",
                  borderRadius: "5px",
                  fontSize: "1.1rem",
                }}
              >
                {removeErrorMsg?.response?.data?.message ||
                  removeErrorMsg?.message ||
                  "Error removing book from cart"}
              </div>
            )}
            {modifyData && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px 20px",
                  backgroundColor: "#d4edda",
                  color: "#155724",
                  border: "1px solid #c3e6cb",
                  borderRadius: "5px",
                  fontSize: "1.1rem",
                  textAlign: "center",
                }}
              >
                {modifyData.message}
              </div>
            )}
            {modifyError && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px 20px",
                  backgroundColor: "#f8d7da",
                  color: "#721c24",
                  border: "1px solid #f5c6cb",
                  borderRadius: "5px",
                  fontSize: "1.1rem",
                  textAlign: "center",
                }}
              >
                {modifyErrorMsg?.response?.data?.message ||
                  modifyErrorMsg?.message ||
                  "Error modifying quantity"}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewCart;
