import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import { useModifyBook } from "../hooks/useModifyBook";
import { useLocation, useNavigate } from "react-router-dom";
import useGetAuthors from "../hooks/useGetauthors";
import type { CSSProperties } from "react";
import useGetPublishers from "../hooks/useGetpublishers";
import useGetCategories from "../hooks/useGetcategory";

interface ModifyBookFormProps {
  fieldName:
    | "isbn"
    | "title"
    | "publicationYear"
    | "categoryId"
    | "publisherId"
    | "authorIds"
    | "sellingPrice"
    | "stockQuantity"
    | "threshold";
  fieldLabel?: string;
  fieldType?: string;
}

const ModifyBookForm = ({
  fieldName,
  fieldLabel,
  fieldType,
}: ModifyBookFormProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookData = location.state?.bookData;
  const { data: authors } = useGetAuthors();
  const { data: publishers } = useGetPublishers();
  const { data: categories } = useGetCategories();
  // Calculate marginLeft based on specific fieldLabel values
  const getMarginLeft = (label: string = "") => {
    switch (label) {
      case "Publication Year":
        return "-50px";
      case "Selling Price":
        return "-35px";
      default:
        return "-13px";
    }
  };
  const headingStyle: CSSProperties = {
    marginBottom: "40px",
    textAlign: "center",
    fontSize: "2.5em",
    whiteSpace: "nowrap",
    marginLeft: getMarginLeft(fieldLabel),
  };
  const schema = z.object({
    [fieldName]:
      fieldName === "authorIds"
        ? z
            .array(z.string())
            .min(1, { message: "At least one author is required" })
        : fieldType === "number"
        ? z.number({ invalid_type_error: `${fieldLabel} must be a number` })
        : z.string().min(1, { message: `${fieldLabel} is required` }),
  });
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { mutate, isPending, isSuccess, isError, error } = useModifyBook();
  const onSubmit = (formData: FormData) => {
    if (!bookData) return;

    const updatedBook = {
      isbn: bookData.isbn,
      title: bookData.title,
      publicationYear: bookData.publicationYear,
      categoryId: bookData.categoryId,
      publisherId: bookData.publisherId,
      authorIds: bookData.authorIds || [],
      sellingPrice: bookData.sellingPrice,
      stockQuantity: bookData.stockQuantity,
      threshold: bookData.threshold,
      ...formData,
    };

    mutate(updatedBook);
  };

  if (!bookData) {
    return (
      <div className="alert alert-warning mt-5">
        No book data provided. Please search for a book first.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="centered-form">
      {isSuccess && (
        <div className="alert alert-success">
          <strong>{fieldLabel} modified successfully!</strong>
        </div>
      )}
      <h1 style={headingStyle}>{fieldLabel} Modification</h1>
      {isError && (
        <div className="alert alert-danger">
          Failed to modify {fieldLabel}:{" "}
          {error?.response?.data?.message || error?.message || "Unknown error"}
        </div>
      )}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor={fieldName} className="form-label">
            <strong>{fieldLabel}</strong>
          </label>
          {errors[fieldName] && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors[fieldName]?.message}
            </span>
          )}
        </div>
        {fieldName === "categoryId" ? (
          <select
            {...register("categoryId", { valueAsNumber: true })}
            className="form-select"
            id="categoryId"
            defaultValue={bookData?.categoryId}
            style={{ fontSize: "1.1rem", padding: "12px" }}
          >
            <option value="">Select a category</option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.id} - {category.name}
                </option>
              ))}
          </select>
        ) : fieldName === "publisherId" ? (
          <select
            {...register("publisherId", { valueAsNumber: true })}
            className="form-select"
            id="publisherId"
            defaultValue={bookData?.publisherId}
            style={{ fontSize: "1.1rem", padding: "12px" }}
          >
            <option value="">Select a publisher</option>
            {publishers &&
              publishers.map((publisher) => (
                <option
                  key={publisher.publisherId}
                  value={publisher.publisherId}
                >
                  {publisher.publisherId} - {publisher.publisherName}
                </option>
              ))}
          </select>
        ) : fieldName === "authorIds" ? (
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
        ) : (
          <input
            {...register(
              fieldName,
              fieldType === "number"
                ? {
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  }
                : {}
            )}
            id={fieldName}
            type={fieldType}
            className="form-control"
            placeholder={`Enter new ${fieldLabel}`}
            style={{ fontSize: "1.1rem", padding: "12px" }}
          />
        )}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() =>
            navigate("/modifybook", { state: { isbn: bookData?.isbn } })
          }
        >
          Back
        </button>
        <button className="btn btn-primary" type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};
export default ModifyBookForm;
