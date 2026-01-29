import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import useModifypassword from "../hooks/useModifypassword";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  ModalFooter,
  Button,
  useToast,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import { FiCheck, FiEye, FiEyeOff, FiKey, FiLock } from "react-icons/fi";
import { useState } from "react";

interface ChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePassword = ({ isOpen, onClose }: ChangePasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const toast = useToast({
    position: "bottom-right",
    duration: 3000,
    isClosable: true,
  });
  const schema = z.object({
    oldPassword: z.string().min(1, { message: "Old password is required" }),
    newPassword: z.string().min(1, { message: "New password is required" }),
  });
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { mutateAsync, isPending } = useModifypassword();
  const handleSave = async (formData: FormData) => {
    try {
      const updatedUser = {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };
      await mutateAsync(updatedUser);
      toast({
        title: `Password has been updated successfully !`,
        status: "success",
      });
    } catch (error) {
      toast({
        title:
          (error as any)?.response?.data?.message ||
          (error as Error).message ||
          "An unknown error occurred.",
        status: "error",
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent borderRadius="2xl">
        <ModalHeader fontSize="xl" fontWeight="bold" shadow="md" py={5}>
          Change Password
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={4}>
          <FormControl
            isInvalid={!!errors.oldPassword || !!errors.newPassword}
            gap={3}
            display="flex"
            flexDirection="column"
          >
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <Icon as={FiLock} color="gray.400" />
              </InputLeftElement>
              <Input
                {...register("oldPassword")}
                placeholder="Enter your Old Password"
                size="lg"
                focusBorderColor="blue.400"
                _placeholder={{ color: "gray.500" }}
                borderRadius="full"
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <FiEyeOff /> : <FiEye />}
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                  size="md"
                  _hover={{ bg: "transparent", color: "blue.200" }}
                />
              </InputRightElement>
            </InputGroup>
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <Icon as={FiKey} color="green.400" />
              </InputLeftElement>
              <Input
                {...register("newPassword")}
                placeholder="Enter your New Password"
                size="lg"
                type={showPassword1 ? "text" : "password"}
                focusBorderColor="blue.400"
                _placeholder={{ color: "gray.500" }}
                borderRadius="full"
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword1 ? "Hide password" : "Show password"}
                  icon={showPassword1 ? <FiEyeOff /> : <FiEye />}
                  onClick={() => setShowPassword1(!showPassword1)}
                  variant="ghost"
                  size="md"
                  _hover={{ bg: "transparent", color: "blue.200" }}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            mr={4}
            onClick={onClose}
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
  );
};

export default ChangePassword;
