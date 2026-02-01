import {
  Card,
  Box,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
  Button,
  VStack,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import useGetGoogleBooks from "../hooks/useGetgooglebooksapi";
import {
  FiHash,
  FiTrash2,
  FiEdit3,
  FiCheck,
  FiX,
  FiPackage,
} from "react-icons/fi";

interface Item {
  isbn: string;
  title: string;
  unitPrice: number;
  quantity: number;
  onRemove: () => void;
  onUpdateQuantity?: (newQuantity: number) => void;
  isremove?: boolean;
}
const ViewCartItem = ({
  isbn,
  title,
  unitPrice,
  quantity,
  onRemove,
  onUpdateQuantity,
  isremove,
}: Item) => {
  const { data } = useGetGoogleBooks(title);
  const [isEditing, setIsEditing] = useState(false);
  const [newQuantity, setNewQuantity] = useState(quantity.toString());

  const handleSave = () => {
    const qty = parseInt(newQuantity);
    if (qty > 0 && onUpdateQuantity) {
      onUpdateQuantity(qty);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewQuantity(quantity.toString());
    setIsEditing(false);
  };

  return (
    <Card
      display="flex"
      flexDirection="row"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.02)" }}
      overflow="hidden"
      mb={4}
      borderRadius="3xl"
      borderLeft="3px solid"
      borderRight="3px solid"
      borderColor="blue.200"
      marginLeft={6}
    >
      <Box width="150px" flexShrink={0} bg="gray.50">
        <Image
          src={data?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail}
          alt="Book cover"
          height="100%"
          objectFit="cover"
          width="100%"
        />
      </Box>
      <CardBody
        flex="1"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        p={8}
      >
        <Box>
          <Heading fontSize="md" mb={6}>
            {title}
          </Heading>
          <HStack fontSize="xs" color="gray.600" mb={1}>
            <FiHash />
            <Text marginBottom="1px">ISBN: {isbn}</Text>
          </HStack>
          <Text fontSize="sm" fontWeight="bold" color="blue.600" mb={1}>
            $ {"    "}
            {unitPrice}
          </Text>
          <HStack fontSize="xs" fontWeight="semibold">
            <FiPackage />
            <Text marginBottom="1px">Quantity: {quantity}</Text>
          </HStack>
        </Box>
        <VStack spacing={2}>
          {!isEditing ? (
            <Button
              colorScheme="blue"
              size="sm"
              onClick={() => setIsEditing(true)}
              transition="all 0.2s"
              _hover={{ transform: "scale(1.05)" }}
              borderRadius="full"
              leftIcon={<FiEdit3 />}
              width="180px"
            >
              Edit Quantity
            </Button>
          ) : (
            <HStack spacing={2}>
              <Input
                type="number"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                size="sm"
                width="80px"
                borderRadius="full"
                textAlign="center"
                min={1}
              />
              <IconButton
                aria-label="Save quantity"
                icon={<FiCheck />}
                size="sm"
                colorScheme="green"
                onClick={handleSave}
                borderRadius="full"
              />
              <IconButton
                aria-label="Cancel"
                icon={<FiX />}
                size="sm"
                colorScheme="red"
                onClick={handleCancel}
                borderRadius="full"
              />
            </HStack>
          )}
          <Button
            colorScheme="red"
            size="sm"
            onClick={onRemove}
            transition="all 0.2s"
            _hover={{ transform: "scale(1.05)" }}
            borderRadius="full"
            leftIcon={<FiTrash2 />}
            width="180px"
          >
            {isremove ? "Removing..." : "Remove from Cart"}
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ViewCartItem;
