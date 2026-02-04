import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import useAddbook from "../hooks/useAddbook";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  useToast,
  Select,
} from "@chakra-ui/react";
import {
  FiHash,
  FiCalendar,
  FiBook,
  FiPlusCircle,
  FiDollarSign,
  FiUsers,
  FiLayers,
  FiAlertTriangle,
  FiType,
  FiTag,
} from "react-icons/fi";
import { useEffect } from "react";
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
const Addbook = () => {
  const toast = useToast({
    position: "bottom-right",
    duration: 4000,
    isClosable: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formdata>({
    resolver: zodResolver(schema),
  });
  const { mutateAsync, isSuccess, isError, error, data, isPending } =
    useAddbook();
  const { data: authors } = useGetAuthors();
  const { data: categories } = useGetCategories();
  const { data: publishers } = useGetPublishers();
  useEffect(() => {
    if (isSuccess && data) {
      toast({
        title: "New Book is added Successfully !",
        status: "success",
      });
    }
  }, [isSuccess]);

  // Show error toast
  useEffect(() => {
    if (isError && error) {
      toast({
        title: error?.response?.data?.message || "An unknown error occurred.",
        status: "error",
      });
    }
  }, [isError, error]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        padding: "10px",
      }}
    >
      <form
        onSubmit={handleSubmit(async (data) => {
          await mutateAsync({
            ...data,
            photoUrl: null,
            description: null,
            averageRating: null,
          });
        })}
        style={{
          width: "100%",
          maxWidth: "950px",
          display: "flex",
          flexDirection: "column",
          gap: "27px",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <FormControl
            isInvalid={!!errors.isbn}
            _hover={{ transform: "scale(1.02)" }}
            flex="1"
          >
            <FormLabel fontWeight="bold">ISBN</FormLabel>
            <InputGroup size="md">
              <InputLeftElement
                pointerEvents="none"
                children={<FiHash color="gray.300" />}
              />
              <Input
                pr="4.5rem"
                id="isbn"
                borderRadius="full"
                type="text"
                placeholder="Enter the ISBN"
                {...register("isbn")}
              />
            </InputGroup>
          </FormControl>

          <FormControl
            isInvalid={!!errors.title}
            _hover={{ transform: "scale(1.02)" }}
            flex="1"
          >
            <FormLabel fontWeight="bold">Title</FormLabel>
            <InputGroup size="md">
              <InputLeftElement
                pointerEvents="none"
                children={<FiType color="gray.300" />}
              />
              <Input
                pr="4.5rem"
                id="title"
                type="text"
                placeholder="Enter the Title"
                {...register("title")}
                borderRadius="full"
              />
            </InputGroup>
          </FormControl>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <FormControl
            isInvalid={!!errors.publicationYear}
            _hover={{ transform: "scale(1.02)" }}
            flex="1"
          >
            <FormLabel fontWeight="bold">Publication Year</FormLabel>
            <InputGroup size="md">
              <InputLeftElement
                pointerEvents="none"
                children={<FiCalendar color="gray.300" />}
              />
              <Input
                pr="4.5rem"
                id="publicationYear"
                borderRadius="full"
                type="number"
                placeholder="Enter the Publication Year"
                {...register("publicationYear", { valueAsNumber: true })}
              />
            </InputGroup>
          </FormControl>

          <FormControl
            isInvalid={!!errors.categoryId}
            _hover={{ transform: "scale(1.02)" }}
            flex="1"
          >
            <FormLabel fontWeight="bold">Category</FormLabel>
            <Select
              {...register("categoryId", { valueAsNumber: true })}
              id="categoryId"
              icon={<FiTag color="gray.300" />}
              borderRadius="full"
            >
              <option value="">Select a category</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.id} - {category.name}
                  </option>
                ))}
            </Select>
          </FormControl>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <FormControl
            isInvalid={!!errors.publisherId}
            _hover={{ transform: "scale(1.02)" }}
            flex="1"
          >
            <FormLabel fontWeight="bold">Publisher</FormLabel>
            <Select
              {...register("publisherId", { valueAsNumber: true })}
              id="publisherId"
              icon={<FiBook color="gray.300" />}
              borderRadius="full"
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
            </Select>
          </FormControl>
          <FormControl
            isInvalid={!!errors.sellingPrice}
            _hover={{ transform: "scale(1.02)" }}
            flex="1"
          >
            <FormLabel fontWeight="bold">Selling Price</FormLabel>
            <InputGroup size="md">
              <InputLeftElement
                pointerEvents="none"
                children={<FiDollarSign color="gray.300" />}
              />
              <Input
                pr="4.5rem"
                id="sellingPrice"
                borderRadius="full"
                type="number"
                placeholder="Enter the Selling Price"
                {...register("sellingPrice", { valueAsNumber: true })}
              />
            </InputGroup>
          </FormControl>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <FormControl
            isInvalid={!!errors.stockQuantity}
            _hover={{ transform: "scale(1.02)" }}
            flex="1"
          >
            <FormLabel fontWeight="bold">Stock Quantity</FormLabel>
            <InputGroup size="md">
              <InputLeftElement
                pointerEvents="none"
                children={<FiLayers color="gray.300" />}
              />
              <Input
                pr="4.5rem"
                id="stockQuantity"
                borderRadius="full"
                type="number"
                placeholder="Enter the Stock Quantity"
                {...register("stockQuantity", { valueAsNumber: true })}
              />
            </InputGroup>
          </FormControl>
          <FormControl
            isInvalid={!!errors.threshold}
            _hover={{ transform: "scale(1.02)" }}
            flex="1"
          >
            <FormLabel fontWeight="bold">Threshold</FormLabel>
            <InputGroup size="md">
              <InputLeftElement
                pointerEvents="none"
                children={<FiAlertTriangle color="gray.300" />}
              />
              <Input
                pr="4.5rem"
                id="threshold"
                type="number"
                placeholder="Enter the Threshold"
                {...register("threshold", { valueAsNumber: true })}
                borderRadius="full"
              />
            </InputGroup>
          </FormControl>
        </div>

        <FormControl
          isInvalid={!!errors.authorIds}
          _hover={{ transform: "scale(1.02)" }}
        >
          <FormLabel fontWeight="bold">Authors</FormLabel>
          <Select
            {...register("authorIds")}
            id="authorIds"
            multiple
            size="lg"
            borderRadius="lg"
            height="130px"
            icon={<FiUsers color="gray.300" />}
            sx={{
              "option:checked": {
                background: "gray.600",
              },
            }}
          >
            {authors &&
              authors.map((author) => (
                <option
                  key={author.authorId}
                  value={author.authorId.toString()}
                >
                  {author.authorId} - {author.firstName} {author.lastName}
                </option>
              ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          height="45px"
          paddingRight="18px"
          colorScheme="blue"
          size="2xl"
          fontSize="lg"
          leftIcon={<FiPlusCircle />}
          borderRadius="full"
          width="400px"
          alignSelf="center"
          transition="all 0.2s"
          _hover={{ transform: "scale(1.05)" }}
        >
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};
export default Addbook;
