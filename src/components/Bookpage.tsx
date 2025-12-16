import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import useAddbook from "../hooks/useAddbook";
import useGetAuthors from "../hooks/useGetauthors";
import useGetCategories from "../hooks/useGetcategory";
import useGetPublishers from "../hooks/useGetpublishers";
const schema = z.object({
  isbn: z.string().min(1, { message: "ISBN is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  publicationYear: z
    .number()
    .min(1, { message: "Publication year is required" }),
  categoryId: z.number().min(1, { message: "Category ID is required" }),
  publisherId: z.number().min(1, { message: "Publisher ID is required" }),
  sellingPrice: z.number().min(1, { message: "Selling price is required" }),
  authorIds: z.array(z.string()).min(1, { message: "Author ID is required" }),
  stockQuantity: z.number().min(1, { message: "Stock quantity is required" }),
  threshold: z.number().min(1, { message: "Threshold is required" }),
});
type formdata = z.infer<typeof schema>;
const Bookpage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formdata>({
    resolver: zodResolver(schema),
    defaultValues: {
      authorIds: [],
    },
  });
  const { mutate, isSuccess, isError, error, data } = useAddbook();
  const { data: authors } = useGetAuthors();
  const { data: categories } = useGetCategories();
  const { data: publishers } = useGetPublishers();

  return (
    <form
      className="addbook-form"
      onSubmit={handleSubmit(
        (data) => {
          console.log("Form submitted with data:", data);
          mutate(data);
        },
        (errors) => {
          console.log("Form validation errors:", errors);
        }
      )}
    >
      {isSuccess && data && (
        <div className="alert alert-success">
          <p>
            <strong>New Book is added Successfully !</strong>
          </p>
        </div>
      )}
      {isError && (
        <div className="alert alert-danger">
          Failed to create user:{" "}
          {error?.response?.data?.message ||
            error?.message ||
            "An unknown error occurred."}
        </div>
      )}
      {/* 1. ISBN */}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="isbn" className="form-label">
            <strong>ISBN</strong>
          </label>
          {errors.isbn && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.isbn.message}
            </span>
          )}
        </div>
        <input
          {...register("isbn")}
          id="isbn"
          type="text"
          className="form-control"
          placeholder="Enter ISBN"
        />
      </div>

      {/* 2. Title */}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="title" className="form-label">
            <strong>Title</strong>
          </label>
          {errors.title && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.title.message}
            </span>
          )}
        </div>
        <input
          {...register("title")}
          id="title"
          type="text"
          className="form-control"
          placeholder="Enter book title"
        />
      </div>

      {/* 3. Publication Year */}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="publicationYear" className="form-label">
            <strong>Publication Year</strong>
          </label>
          {errors.publicationYear && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.publicationYear.message}
            </span>
          )}
        </div>
        <input
          {...register("publicationYear", { valueAsNumber: true })}
          id="publicationYear"
          type="number"
          className="form-control"
          placeholder="Enter publication year"
        />
      </div>

      {/* 4. Category ID */}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="category_id" className="form-label">
            <strong>Category ID</strong>
          </label>
          {errors.categoryId && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.categoryId.message}
            </span>
          )}
        </div>
        <select
          {...register("categoryId", { valueAsNumber: true })}
          className="form-select"
          id="categoryId"
        >
          <option value="">Select a category</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.id} - {category.name}
              </option>
            ))}
        </select>
      </div>
      {/* 7. Author IDs */}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="author_id" className="form-label">
            <strong>Author IDs (Press ctrl for multiple)</strong>
          </label>
          {errors.authorIds && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.authorIds.message}
            </span>
          )}
        </div>
        <select
          {...register("authorIds", {
            setValueAs: (value) => {
              if (Array.isArray(value)) {
                return value;
              }
              if (value) {
                return [value];
              }
              return [];
            },
          })}
          className="form-select"
          id="authorIds"
          multiple
          size={5}
          style={{ height: "auto" }}
        >
          {authors &&
            authors.map((author) => (
              <option key={author.authorId} value={author.authorId}>
                {author.authorId} - {author.firstName} {author.lastName}
              </option>
            ))}
        </select>
      </div>
      {/* 5. Publisher ID */}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="publisher_id" className="form-label">
            <strong>Publisher ID</strong>
          </label>
          {errors.publisherId && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.publisherId.message}
            </span>
          )}
        </div>
        <select
          {...register("publisherId", { valueAsNumber: true })}
          className="form-select"
          id="publisherId"
        >
          <option value="">Select a publisher</option>
          {publishers &&
            publishers.map((publisher) => (
              <option key={publisher.publisherId} value={publisher.publisherId}>
                {publisher.publisherId} - {publisher.publisherName}
              </option>
            ))}
        </select>
      </div>

      {/* 6. Selling Price */}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="selling_price" className="form-label">
            <strong>Selling Price</strong>
          </label>
          {errors.sellingPrice && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.sellingPrice.message}
            </span>
          )}
        </div>
        <input
          {...register("sellingPrice", { valueAsNumber: true })}
          id="sellingPrice"
          type="number"
          step="0.01"
          className="form-control"
          placeholder="Enter selling price"
        />
      </div>
      {/* 8. Stock Quantity */}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="stock_quantity" className="form-label">
            <strong>Stock Quantity</strong>
          </label>
          {errors.stockQuantity && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.stockQuantity.message}
            </span>
          )}
        </div>
        <input
          {...register("stockQuantity", { valueAsNumber: true })}
          id="stockQuantity"
          type="number"
          className="form-control"
          placeholder="Enter stock quantity"
        />
      </div>

      {/* 9. Threshold */}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="threshold" className="form-label">
            <strong>Threshold</strong>
          </label>
          {errors.threshold && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.threshold.message}
            </span>
          )}
        </div>
        <input
          {...register("threshold", { valueAsNumber: true })}
          id="threshold"
          type="number"
          className="form-control"
          placeholder="Enter threshold"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Add book
      </button>
    </form>
  );
};
export default Bookpage;
