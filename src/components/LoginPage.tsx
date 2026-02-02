import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import useLoginUser from "../hooks/useLoginuser";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetUser from "../hooks/useGetusers";
import {
  FiKey,
  FiLogIn,
  FiUser,
  FiUserPlus,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Text,
  useToast,
  Box,
  Divider,
  HStack,
} from "@chakra-ui/react";

const schema = z.object({
  username: z.string().min(1, { message: "UserName is required" }),
  password: z.string().min(1, { message: "Password  is required" }),
});
type formdata = z.infer<typeof schema>; // infers input types (name and age) based on schema
const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast({
    position: "bottom-right",
    duration: 4000,
    isClosable: true,
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }, // is valid for disabelling submit buttton and formsate used for displaying error messages
  } = useForm<formdata>({ resolver: zodResolver(schema) }); // manage form state errors validations submissionhandling i mean it builds and validate form
  const loginuser = useLoginUser();
  const { isSuccess, data, error, isError, isPending } = loginuser;
  const { refetch } = useGetUser();

  // Show success toast
  useEffect(() => {
    if (isSuccess && data?.token) {
      toast({
        title: data?.message,
        status: "success",
      });
    }
  }, [isSuccess, data]);

  // Show error toast
  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Username or Password is incorrect",
        status: "error",
      });
    }
  }, [isError, error]);

  // Navigate based on user role after successful login
  useEffect(() => {
    if (isSuccess && data?.token) {
      // Refetch user data after login to get role
      refetch().then(async (result) => {
        if (result.data?.role) {
          console.log("Navigating for role:", result.data.role);
          if (result.data.role === "ROLE_ADMIN") {
            navigate("/Adminpage", { replace: true });
          } else if (result.data.role === "ROLE_CUSTOMER") {
            navigate("/homepage", { replace: true });
          }
        }
      });
    }
  }, [isSuccess, data, refetch, navigate]);

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "500px", // Limits the width on desktop
        padding: "40px",
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent white
        backdropFilter: "blur(7px)", // Frosted glass effect
        WebkitBackdropFilter: "blur(10px)", // Safari support
        borderRadius: "44px", // Rounded corners
        border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle outline
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)", // Depth shadow
        textAlign: "center",
        color: "white",
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          loginuser.mutate(data);
        })}
        style={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box textAlign="center" marginBottom="-10px">
          <Heading as="h1" fontSize="3xl" letterSpacing="tight">
            The Next Chapter
          </Heading>
          <Text color="gray.400" mt={1}>
            Enter your details to access your library.
          </Text>
        </Box>
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
              placeholder="Enter your Username"
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
              placeholder="Enter your Password"
              {...register("password")}
              borderRadius="full"
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
        </FormControl>

        <Button
          type="submit"
          height="45px"
          paddingRight="18px"
          colorScheme="blue"
          size="2xl"
          fontSize="lg"
          leftIcon={<FiLogIn />}
          borderRadius="full"
          transition="all 0.2s"
          _hover={{ transform: "scale(1.05)" }}
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
            <HStack w="100%" py={0} marginTop={-1} >
            <Divider marginTop={-1}/>
            <Text fontSize="sm" color="gray.300">OR</Text>
            <Divider marginTop={-1}/>
        </HStack>

        {/* --- NEW: Google Login Button --- */}
        <Button
          as="a"
          href="http://localhost:8080/oauth2/authorization/google"
          height="45px"
          width="100%"
          colorScheme="red"
          fontSize="lg"
          leftIcon={<FaGoogle />}
          borderRadius="full"
          transition="all 0.2s"
          _hover={{ transform: "scale(1.05)", bg: "red.600" }}
          marginTop={-6}
        >
          Log in with Google
        </Button>
        <Text fontWeight="bold"  marginTop={-2}>Don't have an account ?</Text>
        <Button
          onClick={() => navigate("/signup")}
          size="2xl"
          height="45px"
          fontSize="lg"
          variant="ghost"
          border="0.5px solid"
          transition="all 0.2s"
          _hover={{ bg: "gray.500", transform: "scale(1.05)" }}
          marginTop="-22px"
          leftIcon={<FiUserPlus />}
          borderRadius="full"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Form;
