import React from "react";
import useGetorderhistory from "../hooks/useGetorderhistory";

const ViewOrderhistory = () => {
  const { data } = useGetorderhistory();
  const cellStyle = { backgroundColor: "beige", border: "1px solid black" };
  return (
    <>
      {data && (
        <div className="mt-4">
          <h3
            style={{
              textAlign: "center",
              fontSize: "2rem",
              padding: "20px",
              backgroundColor: "beige",
            }}
          >
            Order History - Details
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
                backgroundColor: "beige",
                margin: "0",
                borderColor: "black",
                border: "2px solid black",
                borderCollapse: "collapse",
              }}
            >
              <thead style={{ backgroundColor: "beige" }}>
                <tr>
                  <th style={{ backgroundColor: "beige" }}>Order ID</th>
                  <th style={{ backgroundColor: "beige" }}>Total Price</th>
                  <th style={{ backgroundColor: "beige" }}>Order Date</th>
                  <th style={{ backgroundColor: "beige" }}>ISBN</th>
                  <th style={{ backgroundColor: "beige" }}>Title</th>
                  <th style={{ backgroundColor: "beige" }}>Quantity</th>
                  <th style={{ backgroundColor: "beige" }}>Unit Price</th>
                  <th style={{ backgroundColor: "beige" }}>Total Price Book</th>
                </tr>
              </thead>
              <tbody>
                {data.map((order) => (
                  <React.Fragment key={order.orderId}>
                    {order.items.map((item, index) => (
                      <tr key={`${order.orderId}-${item.isbn}`}>
                        {index === 0 && (
                          <>
                            <td style={cellStyle} rowSpan={order.items.length}>
                              {order.orderId}
                            </td>
                            <td style={cellStyle} rowSpan={order.items.length}>
                              {order.totalPrice}
                            </td>
                            <td style={cellStyle} rowSpan={order.items.length}>
                              {order.orderDate}
                            </td>
                          </>
                        )}
                        <td style={cellStyle}>{item.isbn}</td>
                        <td style={cellStyle}>{item.title}</td>
                        <td style={cellStyle}>{item.quantity}</td>
                        <td style={cellStyle}>{item.unit_price}</td>
                        <td style={cellStyle}>{item.total_price_book}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewOrderhistory;
