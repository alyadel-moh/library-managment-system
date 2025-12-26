import { useNavigate } from "react-router-dom";
import useConfirmOrder from "../hooks/useConfirmOrder";
import useGetpendingOrders from "../hooks/useGetpendingOrders";

const Publisherorders = () => {
  const navigate = useNavigate();
  const pendingOrders = useGetpendingOrders();
  const { mutateAsync, data, error } = useConfirmOrder();
  return (
    <>
      {pendingOrders.data && (
        <div className="mt-4">
          <h3
            style={{
              textAlign: "center",
              fontSize: "2rem",
              padding: "20px",
              backgroundColor: "beige",
            }}
          >
            Pending Orders - Details
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
                  <th style={{ backgroundColor: "beige" }}>Order ID</th>
                  <th style={{ backgroundColor: "beige" }}>Order Quantity</th>
                  <th style={{ backgroundColor: "beige" }}>ISBN</th>
                  <th style={{ backgroundColor: "beige" }}>Title</th>
                  <th style={{ backgroundColor: "beige" }}>Book Price</th>
                  <th style={{ backgroundColor: "beige" }}>
                    Book Current Stock
                  </th>
                  <th style={{ backgroundColor: "beige" }}>
                    Book Stock Threshold
                  </th>
                  <th style={{ backgroundColor: "beige" }}>
                    Total Order Price
                  </th>
                  <th style={{ backgroundColor: "beige" }}>Publisher Name</th>
                  <th style={{ backgroundColor: "beige" }}>
                    Publisher Address
                  </th>
                  <th style={{ backgroundColor: "beige" }}>Order Date</th>
                  <th style={{ backgroundColor: "beige" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.data?.map((item) => (
                  <tr key={item.orderId}>
                    <td style={{ backgroundColor: "beige" }}>{item.orderId}</td>
                    <td style={{ backgroundColor: "beige" }}>
                      {item.orderDate}
                    </td>
                    <td style={{ backgroundColor: "beige" }}>{item.isbn}</td>
                    <td style={{ backgroundColor: "beige" }}>{item.title}</td>
                    <td style={{ backgroundColor: "beige" }}>
                      {item.sellingPrice}
                    </td>
                    <td style={{ backgroundColor: "beige" }}>
                      {item.stockQuantity}
                    </td>
                    <td style={{ backgroundColor: "beige" }}>
                      {item.threshold}
                    </td>
                    <td style={{ backgroundColor: "beige" }}>
                      {item.totalOrderPrice}
                    </td>
                    <td style={{ backgroundColor: "beige" }}>
                      {item.publisherName}
                    </td>
                    <td style={{ backgroundColor: "beige" }}>
                      {item.publisherAddress}
                    </td>
                    <td style={{ backgroundColor: "beige" }}>
                      {item.orderDate}
                    </td>
                    <td style={{ backgroundColor: "beige" }}>
                      <button
                        className="btn btn-outline-primary"
                        style={{
                          fontSize: "1.1rem",
                          padding: "12px 30px",
                          marginRight: "10px",
                        }}
                        onClick={async () => {
                          try {
                            await mutateAsync(item.orderId);
                            await new Promise((resolve) =>
                              setTimeout(resolve, 1500)
                            );
                            navigate("/admin/dashboard", { replace: true });
                          } catch (error) {
                            console.error("Confirm order error", error);
                          }
                        }}
                      >
                        Confirm Order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px 20px",
                  backgroundColor: "#d4edda",
                  color: "#155724",
                  border: "1px solid #c3e6cb",
                  borderRadius: "5px",
                  fontSize: "1.1rem",
                }}
              >
                {data.message}
              </div>
            )}
            {error && (
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
                {error?.response?.data?.message ||
                  error?.message ||
                  "Error confirming order"}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Publisherorders;
