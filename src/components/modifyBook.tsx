import {
  Icon,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  HStack,
  Text,
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
} from "@chakra-ui/react";
import {
  FiEdit2,
  FiHash,
  FiCalendar,
  FiBook,
  FiUsers,
  FiTag,
  FiDollarSign,
  FiLayers,
  FiAlertTriangle,
  FiType,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import useModifyBook from "../hooks/useModifyBook";
import type Book1 from "../entities/Book";
import useGetBook from "../hooks/useGetbook";
import useGetPublishers from "../hooks/useGetpublishers";
import useGetAuthors from "../hooks/useGetauthors";
import useGetCategories from "../hooks/useGetcategory";
interface BookdetailpageProps {
  book: Book1;
}
const ModifyBook = ({ book }: BookdetailpageProps) => {
  const { data, refetch } = useGetBook({ isbn: book.isbn });
  const [editField, setEditField] = useState<string>("");
  const toast = useToast({
    position: "bottom-right",
    duration: 3000,
    isClosable: true,
  });
  const { data: authors } = useGetAuthors();
  const { data: categories } = useGetCategories();
  const { data: publishers } = useGetPublishers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const schema = z.object({
    [editField]:
      editField === "authorIds"
        ? z
            .array(z.string())
            .min(1, { message: "At least one author is required" })
        : editField === "isbn" || editField === "title"
          ? z.string().min(1, { message: `${editField} is required` })
          : z.coerce
              .number({ invalid_type_error: `${editField} must be a number` })
              .positive({ message: `${editField} must be a positive number` }),
  });
  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const handleEditClick = (field: string) => {
    setEditField(field);
    onOpen();
  };
  const {
    mutateAsync,
    isPending,
    isSuccess,
    isError,
    error,
    data: updateData,
  } = useModifyBook(data?.[0]?.isbn || "");
  useEffect(() => {
    if (isSuccess && updateData) {
      toast({
        title: `${editField.replace(/([A-Z])/g, " $1").trim()} has been updated successfully !`,
        status: "success",
      });
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError && error) {
      toast({
        title: error?.response?.data?.message,
        status: "error",
      });
    }
  }, [isError, error]);

  if (!data || data.length === 0) {
    return (
      <HStack direction="row" align="center" spacing={3} padding={5}>
        <Spinner size="lg" color="blue.400" />
        <Text paddingLeft="2px" color="blue.400" marginTop="10px">
          Loading book details...
        </Text>
      </HStack>
    );
  }
  const bookData = data[0];

  const handleSave = async (formData: FormData) => {
    const updatedBook = {
      isbn: bookData.isbn,
      title: bookData.title,
      publicationYear: bookData.publicationYear,
      categoryId: bookData.category?.id,
      publisherId: bookData.publisher?.publisherId,
      authorIds: bookData.authors?.map((a: any) => a.authorId) || [],
      sellingPrice: bookData.sellingPrice,
      stockQuantity: bookData.stockQuantity,
      threshold: bookData.threshold,
      [editField]: formData[editField],
    };
    await mutateAsync(updatedBook);
    refetch();
    onClose();
  };
  const getFieldIcon = (field: string) => {
    switch (field) {
      case "isbn":
        return FiHash;
      case "title":
        return FiType;
      case "publicationYear":
        return FiCalendar;
      case "stockQuantity":
        return FiLayers;
      case "threshold":
        return FiAlertCircle;
      case "sellingPrice":
        return FiDollarSign;
      default:
        return FiEdit2;
    }
  };
  return (
    <>
      <TableContainer>
        <Table>
          <Tbody>
            <Tr>
              <Td>
                <HStack spacing={3}>
                  <Icon as={FiHash} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    ISBN
                  </Text>
                </HStack>
              </Td>
              <Td>{bookData.isbn}</Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  variant="ghost"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  aria-label="Edit isbn"
                  onClick={() => handleEditClick("isbn")}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <HStack spacing={3} align="center">
                  <Icon as={FiType} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    Title
                  </Text>
                </HStack>
              </Td>
              <Td>{bookData.title}</Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  variant="ghost"
                  aria-label="Edit title"
                  onClick={() => handleEditClick("title")}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <HStack spacing={3}>
                  <Icon as={FiCalendar} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    Publication Year
                  </Text>
                </HStack>
              </Td>
              <Td>{bookData.publicationYear}</Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  variant="ghost"
                  aria-label="Edit publication year"
                  onClick={() => handleEditClick("publicationYear")}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <HStack spacing={3}>
                  <Icon as={FiBook} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    Publisher
                  </Text>
                </HStack>
              </Td>
              <Td>{`${bookData.publisher.publisherName} (ID: ${bookData.publisher.publisherId})`}</Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  variant="ghost"
                  aria-label="Edit publisher"
                  onClick={() => handleEditClick("publisherId")}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <HStack spacing={3} align="center">
                  <Icon as={FiUsers} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    Authors
                  </Text>
                </HStack>
              </Td>
              <Td>
                {bookData.authors
                  ? bookData.authors
                      .map(
                        (author) =>
                          `${author.firstName} ${author.lastName} (ID: ${author.authorId})`,
                      )
                      .join(", ")
                  : "N/A"}
              </Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  variant="ghost"
                  aria-label="Edit authors"
                  onClick={() => handleEditClick("authorIds")}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <HStack spacing={3} align="center">
                  <Icon as={FiTag} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    Category
                  </Text>
                </HStack>
              </Td>
              <Td>{`${bookData.category.name} (ID: ${bookData.category.id})`}</Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  variant="ghost"
                  aria-label="Edit category"
                  onClick={() => handleEditClick("categoryId")}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <HStack spacing={3} align="center">
                  <Icon as={FiDollarSign} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    Selling Price
                  </Text>
                </HStack>
              </Td>
              <Td>{bookData.sellingPrice}</Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  variant="ghost"
                  aria-label="Edit sellingPrice"
                  onClick={() => handleEditClick("sellingPrice")}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <HStack spacing={3} align="center">
                  <Icon as={FiLayers} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    Stock Quantity
                  </Text>
                </HStack>
              </Td>
              <Td>{bookData.stockQuantity}</Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  variant="ghost"
                  aria-label="Edit Stock Quantity"
                  onClick={() => handleEditClick("stockQuantity")}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <HStack spacing={3} align="center">
                  <Icon as={FiAlertTriangle} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    Threshold
                  </Text>
                </HStack>
              </Td>
              <Td>{bookData.threshold}</Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  variant="ghost"
                  aria-label="Edit threshold"
                  onClick={() => handleEditClick("threshold")}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent borderRadius="2xl">
          <ModalHeader fontSize="xl" fontWeight="bold" shadow="md" py={5}>
            Edit {editField}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={5}>
            <FormControl isInvalid={!!errors[editField]}>
              {editField === "categoryId" ? (
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
              ) : editField === "publisherId" ? (
                <Select
                  borderRadius="full"
                  {...register("publisherId", { valueAsNumber: true })}
                  id="publisherId"
                  icon={<FiBook color="gray.300" />}
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
              ) : editField === "authorIds" ? (
                <Select
                  borderRadius="lg"
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
                  id="authorIds"
                  multiple
                  size="lg"
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
                      <option key={author.authorId} value={author.authorId}>
                        {author.authorId} - {author.firstName} {author.lastName}
                      </option>
                    ))}
                </Select>
              ) : (
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <Icon as={getFieldIcon(editField)} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    {...register(editField)}
                    placeholder={`Enter new ${editField}`}
                    size="lg"
                    focusBorderColor="blue.400"
                    borderRadius="full"
                    _placeholder={{ color: "gray.500" }}
                  />
                </InputGroup>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              mr={4}
              onClick={onClose}
              isDisabled={isPending}
              _hover={{ bg: "gray.500", transform: "scale(1.05)" }}
              borderRadius="full"
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit(handleSave)}
              leftIcon={<Icon as={FiCheck} />}
              borderRadius="full"
              _hover={{ transform: "scale(1.05)" }}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModifyBook;
