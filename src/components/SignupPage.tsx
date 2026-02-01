import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import UseAdduser from "../hooks/UseAdduser";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
  VStack,
  Text,
  HStack,
} from "@chakra-ui/react";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiLogIn,
  FiType,
  FiKey,
  FiEye,
  FiEyeOff,
  FiImage,
} from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
const schema = z.object({
  username: z.string().min(1, { message: "UserName is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  shippingAddress: z
    .string()
    .min(1, { message: "Shipping address is required" }),
  emailAddress: z
    .string()
    .min(1, { message: "Email address is required" })
    .email({ message: "Invalid Email address" }),
});
type formdata = z.infer<typeof schema>;
const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setSelectedImage(previewUrl);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cloud_img_name");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/desvfcke6/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );
    const cloudinaryData = await response.json();
    return cloudinaryData;
  };
  const toast = useToast({
    position: "bottom-right",
    duration: 4000,
    isClosable: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors }, // is valid for disabelling submit buttton and formsate used for displaying error messages
  } = useForm<formdata>({ resolver: zodResolver(schema) }); // manage form state errors validations submissionhandling i mean it builds and validate form
  const addUser = UseAdduser();
  const navigate = useNavigate();
  const { isSuccess, isError, error, data, mutateAsync, isPending } = addUser;
  useEffect(() => {
    if (isSuccess && data) {
      toast({
        title: data.status,
        status: "success",
      });
    }
  }, [isSuccess]);

  // Show error toast
  useEffect(() => {
    if (isError && error) {
      toast({
        title: error?.response?.data?.message || "Signup Failed",
        status: "error",
      });
    }
  }, [isError, error]);
  const onInvalid = () => {
    const fieldError = errors["emailAddress"];
    if (fieldError) {
      toast({
        description: fieldError.message,
        status: "error",
      });
    }
  };
  return (
    <Box
      // --- Responsive Dimensions ---
      w={["95%", "90%", "500px"]} // Mobile: 95% width, Tablet: 90%, Desktop: fixed 500px
      h="auto" // Let height grow with content
      mx="auto" // Center horizontally
      my={[4, 8]} // Add top/bottom margin so it doesn't stick to screen edges on scroll
      p={[6, 10]} // Mobile: 24px padding, Desktop: 40px padding
      // --- Glassmorphism Styles ---
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(7px)"
      borderRadius="44px"
      border="1px solid rgba(255, 255, 255, 0.2)"
      boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"
      sx={{
        WebkitBackdropFilter: "blur(10px)", // Safari support via sx prop
      }}
      // --- Content Alignment ---
      textAlign="center"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <form
        onSubmit={handleSubmit(async (data) => {
          const cloudinaryData = await handleImageChange({
            target: { files: fileInputRef.current?.files || null },
          } as React.ChangeEvent<HTMLInputElement>);
          await mutateAsync({
            ...data,
            photoUrl: cloudinaryData.secure_url || "",
          });
          navigate("/", { replace: true });
        }, onInvalid)}
        style={{
          width: "100%",
          maxWidth: "650px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "10px", // reduced top margin
        }}
      >
        <VStack spacing={3} mt={-5}>
          <VStack spacing={1}>
            <Box position="relative" marginTop="15px">
              {/* The Visual "Icon" or Avatar */}
              <Avatar
                size="xl"
                src={selectedImage || ""}
                name="User Photo"
                border="2px solid"
                borderColor="blue.500"
              />
              {/* The Upload Button overlay */}
              <IconButton
                aria-label="Upload photo"
                icon={<FiImage />}
                size="sm"
                colorScheme="blue"
                rounded="full"
                position="absolute"
                bottom="0"
                right="0"
                onClick={() => fileInputRef.current?.click()}
              />
            </Box>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: "none" }}
            />
            <Text fontSize="sm">
              {selectedImage
                ? "Click icon to change"
                : "Upload a profile photo"}
            </Text>
          </VStack>
          <HStack spacing={4} width="100%">
            <FormControl
              isInvalid={!!errors.username}
              _hover={{ transform: "scale(1.02)" }}
            >
              <FormLabel fontWeight="bold">Username</FormLabel>
              <InputGroup size="md">
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiUser color="gray.300" />}
                />
                <Input
                  pr="4.5rem"
                  id="username"
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                  borderRadius="full"
                />
              </InputGroup>
            </FormControl>

            <FormControl
              isInvalid={!!errors.password}
              _hover={{ transform: "scale(1.02)" }}
            >
              <FormLabel fontWeight="bold">Password</FormLabel>
              <InputGroup size="md">
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiKey color="gray.300" />}
                />
                <Input
                  pr="4.5rem"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="strong"
                  {...register("password")}
                  borderRadius="full"
                />
                <InputRightElement>
                  <IconButton
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    icon={showPassword ? <FiEyeOff /> : <FiEye />}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    size="md"
                    _hover={{ bg: "transparent", color: "blue.200" }}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </HStack>
          <HStack spacing={4} width="100%">
            <FormControl
              isInvalid={!!errors.firstName}
              _hover={{ transform: "scale(1.02)" }}
            >
              <FormLabel fontWeight="bold">First name</FormLabel>
              <InputGroup size="md">
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiType color="gray.300" />}
                />
                <Input
                  pr="4.5rem"
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  {...register("firstName")}
                  borderRadius="full"
                />
              </InputGroup>
            </FormControl>

            <FormControl
              isInvalid={!!errors.lastname}
              _hover={{ transform: "scale(1.02)" }}
            >
              <FormLabel fontWeight="bold">Last name</FormLabel>
              <InputGroup size="md">
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiType color="gray.300" />}
                />
                <Input
                  pr="4.5rem"
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  {...register("lastname")}
                  borderRadius="full"
                />
              </InputGroup>
            </FormControl>
          </HStack>
          <FormControl
            isInvalid={!!errors.emailAddress}
            _hover={{ transform: "scale(1.02)" }}
          >
            <FormLabel fontWeight="bold">Email address</FormLabel>
            <InputGroup size="md">
              <InputLeftElement
                pointerEvents="none"
                children={<FiMail color="gray.300" />}
              />
              <Input
                pr="4.5rem"
                id="emailAddress"
                type="text"
                placeholder="email@example.com"
                {...register("emailAddress")}
                borderRadius="full"
              />
            </InputGroup>
          </FormControl>

          <HStack spacing={4} width="100%">
            <FormControl
              isInvalid={!!errors.shippingAddress}
              _hover={{ transform: "scale(1.02)" }}
            >
              <FormLabel fontWeight="bold">Shipping address</FormLabel>
              <InputGroup size="md">
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiMapPin color="gray.300" />}
                />
                <Input
                  pr="4.5rem"
                  id="shippingAddress"
                  type="text"
                  placeholder="City, country"
                  {...register("shippingAddress")}
                  borderRadius="full"
                />
              </InputGroup>
            </FormControl>
            <FormControl
              isInvalid={!!errors.phoneNumber}
              _hover={{ transform: "scale(1.02)" }}
            >
              <FormLabel fontWeight="bold">Phone number</FormLabel>
              <InputGroup size="md">
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiPhone color="gray.300" />}
                />
                <Input
                  pr="4.5rem"
                  id="phoneNumber"
                  type="text"
                  placeholder="number"
                  {...register("phoneNumber")}
                  borderRadius="full"
                />
              </InputGroup>
            </FormControl>
          </HStack>

          <Button
            type="submit"
            height="42px"
            paddingRight="18px"
            colorScheme="blue"
            size="2xl"
            fontSize="lg"
            leftIcon={<FiLogIn />}
            borderRadius="full"
            transition="all 0.2s"
            _hover={{ transform: "scale(1.05)" }}
            width="100%"
          >
            {isPending ? "Signing up..." : "Sign Up"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
export default SignupPage;
