import useGettop10sellingbooks from "../hooks/useGettop10sellingbooks";
import useGettop5customers from "../hooks/useGettop5customers";
import useGettotalsalesbydayreport from "../hooks/useGettotalsalesdayreport";
import useGettotalsalesbymonthreport from "../hooks/useGettotalsalesmonthreport";
import useGetnumberofbooksordered from "../hooks/useGetnumberofbooksordered";
import { useState } from "react";
const Reports = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchValue2, setSearchValue2] = useState("");
  const { data: topsellingbooks } = useGettop10sellingbooks();
  const { data: topcustomer } = useGettop5customers();
  const { data: totalsalesmonth } = useGettotalsalesbymonthreport();
  const { data: numberofbooksordered } =
    useGetnumberofbooksordered(searchValue2);
  const { data: totalsalesday } = useGettotalsalesbydayreport(searchValue);
  if (!topcustomer || !topsellingbooks || !totalsalesmonth) {
    return <div>Loading...</div>;
  }

  return (
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
          backgroundColor: "beige",
          margin: "0",
          border: "2px solid black",
          borderCollapse: "collapse",
        }}
      >
        <thead style={{ backgroundColor: "beige" }}>
          <tr>
            <th
              colSpan={4}
              style={{
                textAlign: "center",
                fontSize: "2rem",
                padding: "20px",
                backgroundColor: "beige",
                border: "none",
              }}
            >
              System Reports
            </th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "beige" }}>
          <tr>
            <td
              colSpan={3}
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
                border: "none",
              }}
            >
              <strong>The total sales for books in the previous month</strong>
            </td>
          </tr>
          {totalsalesmonth?.map((sale: any, index: number) => (
            <tr key={index}>
              <td style={{ backgroundColor: "beige", padding: "10px" }}>
                From: {sale.from_date}
              </td>
              <td style={{ backgroundColor: "beige", padding: "10px" }}>
                To: {sale.to_date}
              </td>
              <td
                style={{
                  backgroundColor: "beige",
                  padding: "10px",
                  border: "none",
                }}
              >
                Revenue: ${sale.total_revenue}
              </td>
            </tr>
          ))}

          <tr>
            <td
              colSpan={4}
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
                border: "none",
              }}
            >
              <strong>The total sales for books on a certain day</strong>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <input
                  className="form-control"
                  type="date"
                  placeholder="YYYY-MM-DD"
                  aria-label="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  style={{ maxWidth: "200px" }}
                />
              </div>
            </td>
          </tr>
          {totalsalesday?.map((sale: any, index: number) => (
            <tr key={index}>
              <td style={{ backgroundColor: "beige", padding: "10px" }}>
                Date: {sale.on_day}
              </td>
              <td
                style={{
                  backgroundColor: "beige",
                  padding: "10px",
                  border: "none",
                }}
              >
                Revenue: ${sale.total_sales}
              </td>
            </tr>
          ))}
          <tr>
            <td
              colSpan={3}
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
                border: "none",
              }}
            >
              <strong>TOP 5 Customers (For the Last 3 Months)</strong>
            </td>
          </tr>
          {topcustomer?.map((customer: any, index: number) => (
            <tr key={index}>
              <td style={{ backgroundColor: "beige", padding: "10px" }}>
                Username: {customer.username}
              </td>
              <td style={{ backgroundColor: "beige", padding: "10px" }}>
                first name :{customer.first_name}
              </td>
              <td style={{ backgroundColor: "beige", padding: "10px" }}>
                last name :{customer.last_name}
              </td>
              <td
                style={{
                  backgroundColor: "beige",
                  padding: "10px",
                  border: "none",
                }}
              >
                Total: ${customer.total_spent}
              </td>
            </tr>
          ))}

          <tr>
            <td
              colSpan={3}
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
                border: "none",
              }}
            >
              <strong>Top 10 Selling Books (For the Last 3 Months)</strong>
            </td>
          </tr>
          {topsellingbooks?.map((book: any, index: number) => (
            <tr key={index}>
              <td style={{ backgroundColor: "beige", padding: "10px" }}>
                Title : {book.title}
              </td>
              <td style={{ backgroundColor: "beige", padding: "10px" }}>
                ISBN: {book.isbn}
              </td>
              <td style={{ backgroundColor: "beige", padding: "10px" }}>
                Category : {book.category}
              </td>
              <td
                style={{
                  backgroundColor: "beige",
                  padding: "10px",
                  border: "none",
                }}
              >
                Sold: {book.total_sold}
              </td>
            </tr>
          ))}
          <tr>
            <td
              colSpan={3}
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
                border: "none",
              }}
            >
              <strong>Number of times a specific book was restocked</strong>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter book ISBN"
                  aria-label="Search"
                  value={searchValue2}
                  onChange={(e) => setSearchValue2(e.target.value)}
                  style={{ maxWidth: "200px" }}
                />
              </div>
            </td>
          </tr>
          {numberofbooksordered && (
            <tr>
              <td style={{ backgroundColor: "beige", padding: "10px" }}>
                ISBN: {numberofbooksordered?.book_isbn}
              </td>
              <td style={{ backgroundColor: "beige", padding: "10px" }}>
                Title: {numberofbooksordered?.book_Title}
              </td>
              <td style={{ backgroundColor: "beige", padding: "10px" }}>
                Total Restocked: {numberofbooksordered?.total_restocked_books}
              </td>
              <td style={{ backgroundColor: "beige", padding: "10px" }}>
                Total Spent: ${numberofbooksordered?.total_spent}
              </td>
              <td style={{ backgroundColor: "beige", padding: "10px" }}>
                Order Count: {numberofbooksordered?.order_count}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
