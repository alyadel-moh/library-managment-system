import { Avatar, Button, calc, useToast, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FiHome,
  FiLogOut,
  FiPackage,
  FiBookOpen,
  FiUser,
} from "react-icons/fi";
import useLogout from "../hooks/UseLogout";
import { useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetusers";

interface SidebarProps {
  onViewChange: (view: string) => void;
  refetchphoto?: string;
}

const Adminsidebar = ({ onViewChange, refetchphoto }: SidebarProps) => {
  const { data } = useGetUser();
  const [activeView, setActiveView] = useState("books");
  const toast = useToast({
    position: "bottom-right",
    duration: 4000,
    isClosable: true,
  });
  const navigate = useNavigate();
  const logoutQuery = useLogout();
  const { isPending } = logoutQuery;
  const handleViewChange = (view: string) => {
    setActiveView(view);
    onViewChange(view);
  };
  return (
    <VStack
      wrap="wrap"
      gap="6"
      spacing={8}
      align="stretch"
      width="200px"
      minHeight="calc(100vh - 100px)"
      height="100%"
    >
      <Button
        leftIcon={<FiHome />}
        variant={activeView === "books" ? "solid" : "ghost"}
        backgroundColor={activeView === "books" ? "blue.500" : "transparent"}
        color={activeView === "books" ? "white" : "inherit"}
        onClick={() => handleViewChange("books")}
        justifyContent="flex-start"
        size="2xl"
        fontSize="lg"
        height="60px"
        paddingLeft="30px"
        transition="all 0.3s"
        transform={activeView === "books" ? "scale(1.06)" : "scale(1)"}
        borderRadius="full"
        _hover={
          activeView === "books"
            ? { backgroundColor: "blue.600" }
            : { backgroundColor: "gray.600" }
        }
      >
        Books
      </Button>
      <Button
        leftIcon={<FiUser />}
        variant={activeView === "profile" ? "solid" : "ghost"}
        backgroundColor={activeView === "profile" ? "blue.500" : "transparent"}
        color={activeView === "profile" ? "white" : "inherit"}
        onClick={() => handleViewChange("profile")}
        justifyContent="flex-start"
        size="2xl"
        fontSize="lg"
        height="60px"
        paddingLeft="30px"
        borderRadius="full"
        transition="all 0.3s"
        transform={activeView === "profile" ? "scale(1.06)" : "scale(1)"}
        _hover={
          activeView === "profile"
            ? { backgroundColor: "blue.600" }
            : { backgroundColor: "gray.600" }
        }
      >
        Profile
      </Button>
      <Button
        leftIcon={<FiBookOpen />}
        variant={activeView === "Addbook" ? "solid" : "ghost"}
        backgroundColor={activeView === "Addbook" ? "blue.500" : "transparent"}
        color={activeView === "Addbook" ? "white" : "inherit"}
        onClick={() => handleViewChange("Addbook")}
        justifyContent="flex-start"
        size="2xl"
        fontSize="lg"
        height="60px"
        paddingLeft="30px"
        borderRadius="full"
        transition="all 0.3s"
        transform={activeView === "Addbook" ? "scale(1.06)" : "scale(1)"}
        _hover={
          activeView === "Addbook"
            ? { backgroundColor: "blue.600" }
            : { backgroundColor: "gray.600" }
        }
      >
        Add book
      </Button>
      <Button
        leftIcon={<FiPackage />}
        variant={activeView === "pending" ? "solid" : "ghost"}
        backgroundColor={activeView === "pending" ? "blue.500" : "transparent"}
        color={activeView === "pending" ? "white" : "inherit"}
        onClick={() => handleViewChange("pending")}
        justifyContent="flex-start"
        size="2xl"
        fontSize="lg"
        height="60px"
        paddingLeft="22px"
        transition="all 0.3s"
        transform={activeView === "pending" ? "scale(1.06)" : "scale(1)"}
        _hover={
          activeView === "pending"
            ? { backgroundColor: "blue.600" }
            : { backgroundColor: "gray.600" }
        }
        borderRadius="full"
      >
        Pending orders
      </Button>
      <Button
        leftIcon={<FiHome />}
        variant={activeView === "reports" ? "solid" : "ghost"}
        backgroundColor={activeView === "reports" ? "blue.500" : "transparent"}
        color={activeView === "reports" ? "white" : "inherit"}
        onClick={() => handleViewChange("reports")}
        justifyContent="flex-start"
        size="2xl"
        fontSize="lg"
        height="60px"
        paddingLeft="30px"
        transition="all 0.3s"
        transform={activeView === "reports" ? "scale(1.06)" : "scale(1)"}
        borderRadius="full"
        _hover={
          activeView === "reports"
            ? { backgroundColor: "blue.600" }
            : { backgroundColor: "gray.600" }
        }
      >
        Reports
      </Button>
      <Button
        leftIcon={<FiLogOut />}
        variant="ghost"
        color="inherit"
        _hover={{ backgroundColor: "gray.600" }}
        justifyContent="flex-start"
        size="2xl"
        fontSize="lg"
        height="60px"
        paddingLeft="30px"
        borderRadius="full"
        onClick={async () => {
          try {
            const data = await logoutQuery.mutateAsync();
            toast({
              title: data?.message,
              status: "success",
            });
            navigate("/", { replace: true });
          } catch (error) {
            toast({
              title: (error as Error)?.message || "Error logging out",
              status: "error",
            });
          }
        }}
      >
        {isPending ? "Logging out..." : "Logout"}
      </Button>
      <Avatar
        marginTop="10px"
        marginLeft="30px"
        size="xl"
        name={`${data?.firstName} ${data?.lastname}`}
        src={refetchphoto || data?.photoUrl}
        border="1px solid #3182ce"
      />
    </VStack>
  );
};

export default Adminsidebar;
