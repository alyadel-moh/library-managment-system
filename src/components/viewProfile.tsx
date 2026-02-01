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
  InputLeftElement
} from "@chakra-ui/react";
import useGetUser from "../hooks/useGetusers";
import {
  FiEdit2,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiType,
  FiCheck,
  FiKey,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import useModifyUser from "../hooks/useModifyuser";
import ChangePassword from "./changePassword";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import UpdateProfilePhoto from "./updateprofilephoto";
const ViewProfile = ({
  refetchphoto,
}: {
  refetchphoto?: (photo: string) => void;
}) => {
  const { data, refetch } = useGetUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isPasswordModalOpen,
    onOpen: onPasswordModalOpen,
    onClose: onPasswordModalClose,
  } = useDisclosure();
  const [editField, setEditField] = useState<string>("");
  const toast = useToast({
    position: "bottom-right",
    duration: 3000,
    isClosable: true,
  });
  const schema = z.object({
    [editField]:
      editField === "emailAddress"
        ? z.string().email({ message: "Invalid email address" })
        : z.string().min(1, { message: `${editField} is required` }),
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
  } = useModifyUser();
  useEffect(() => {
    if (isSuccess && updateData) {
      toast({
        title: `${editField} has been updated successfully !`,
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
  if (!data) return null;
  const handleSave = async (formData: FormData) => {
    const updatedUser = {
      ...data,
      [editField]: formData[editField].trim(),
    };
    await mutateAsync(updatedUser);
    refetch();
    onClose();
  };

  const onInvalid = () => {
    const fieldError = errors["emailAddress"];
    if (fieldError) {
      toast({
        title: fieldError.message,
        status: "error",
      });
    }
  };

  const getFieldIcon = (field: string) => {
    switch (field) {
      case "username":
        return FiUser;
      case "firstName":
      case "lastname":
        return FiType;
      case "emailAddress":
        return FiMail;
      case "phoneNumber":
        return FiPhone;
      case "shippingAddress":
        return FiMapPin;
      default:
        return FiEdit2;
    }
  };
  return (
    <>
      <UpdateProfilePhoto user={data} refetchphoto={refetchphoto} />
      <TableContainer marginLeft={51} width="1100px">
        <Table>
          <Tbody>
            <Tr>
              <Td>
                <HStack spacing={3}>
                  <Icon as={FiUser} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    Username
                  </Text>
                </HStack>
              </Td>
              <Td>{data.username}</Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  variant="ghost"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  aria-label="Edit username"
                  onClick={() => handleEditClick("username")}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <HStack spacing={3} align="center">
                  <Icon as={FiType} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    First name
                  </Text>
                </HStack>
              </Td>
              <Td>{data.firstName}</Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  variant="ghost"
                  aria-label="Edit first name"
                  onClick={() => handleEditClick("firstName")}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <HStack spacing={3}>
                  <Icon as={FiType} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    Last name
                  </Text>
                </HStack>
              </Td>
              <Td>{data.lastname}</Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  variant="ghost"
                  aria-label="Edit last name"
                  onClick={() => handleEditClick("lastname")}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <HStack spacing={3}>
                  <Icon as={FiKey} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    Password
                  </Text>
                </HStack>
              </Td>
              <Td>{data.password}</Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  variant="ghost"
                  aria-label="Edit password"
                  onClick={onPasswordModalOpen}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <HStack spacing={3} align="center">
                  <Icon as={FiMail} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    Email address
                  </Text>
                </HStack>
              </Td>
              <Td>{data.emailAddress}</Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  variant="ghost"
                  aria-label="Edit email address"
                  onClick={() => handleEditClick("emailAddress")}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <HStack spacing={3} align="center">
                  <Icon as={FiPhone} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    Phone number
                  </Text>
                </HStack>
              </Td>
              <Td>{data.phoneNumber}</Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  variant="ghost"
                  aria-label="Edit phone"
                  onClick={() => handleEditClick("phoneNumber")}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                <HStack spacing={3} align="center">
                  <Icon as={FiMapPin} color="blue.400" />
                  <Text fontWeight="medium" marginBottom="2px">
                    Shipping address
                  </Text>
                </HStack>
              </Td>
              <Td>{data.shippingAddress}</Td>
              <Td>
                <IconButton
                  icon={<Icon as={FiEdit2} />}
                  size="md"
                  color="gray.600"
                  _hover={{ color: "white" }}
                  variant="ghost"
                  aria-label="Edit address"
                  onClick={() => handleEditClick("shippingAddress")}
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
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <Icon as={getFieldIcon(editField)} color="gray.400" />
                </InputLeftElement>
                <Input
                  {...register(editField)}
                  placeholder={`Enter new ${editField}`}
                  size="lg"
                  focusBorderColor="blue.400"
                  _placeholder={{ color: "gray.500" }}
                  borderRadius="full"
                />
              </InputGroup>
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
              onClick={handleSubmit(handleSave, onInvalid)}
              leftIcon={<Icon as={FiCheck} />}
              borderRadius="full"
              _hover={{ transform: "scale(1.05)" }}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ChangePassword
        isOpen={isPasswordModalOpen}
        onClose={onPasswordModalClose}
      />
    </>
  );
};

export default ViewProfile;
