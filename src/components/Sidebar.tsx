import { Avatar, Button, useToast, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FiBookOpen,
  FiLogOut,
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import useLogout from "../hooks/UseLogout";
import { useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetusers";
import { BsBookmark } from "react-icons/bs";
interface SidebarProps {
  onViewChange: (view: string) => void;
  refetchphoto?: string;
}
const Sidebar = ({ onViewChange, refetchphoto }: SidebarProps) => {
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
        leftIcon={<FiBookOpen />}
        variant={activeView === "books" ? "solid" : "ghost"}
        backgroundColor={activeView === "books" ? "blue.600" : "transparent"}
        color={activeView === "books" ? "white" : "inherit"}
        onClick={() => handleViewChange("books")}
        transform={activeView === "books" ? "scale(1.06)" : "scale(1)"}
        justifyContent="flex-start"
        size="2xl"
        fontSize="lg"
        height="60px"
        paddingLeft="30px"
        borderRadius="full"
        _hover={{ backgroundColor: "gray.600", transform: "scale(1.02)" }}
      >
        Books
      </Button>
      <Button
        leftIcon={<FiUser />}
        variant={activeView === "profile" ? "solid" : "ghost"}
        backgroundColor={activeView === "profile" ? "blue.600" : "transparent"}
        color={activeView === "profile" ? "white" : "inherit"}
        _hover={{ backgroundColor: "gray.600", transform: "scale(1.02)" }}
        onClick={() => handleViewChange("profile")}
        transform={activeView === "profile" ? "scale(1.06)" : "scale(1)"}
        justifyContent="flex-start"
        size="2xl"
        fontSize="lg"
        height="60px"
        paddingLeft="30px"
        borderRadius="full"
      >
        Profile
      </Button>
      <Button
        leftIcon={<BsBookmark />}
        variant={activeView === "saved" ? "solid" : "ghost"}
        backgroundColor={activeView === "saved" ? "blue.500" : "transparent"}
        color={activeView === "saved" ? "white" : "inherit"}
        onClick={() => handleViewChange("saved")}
        transform={activeView === "saved" ? "scale(1.06)" : "scale(1)"}
        _hover={{ backgroundColor: "gray.600", transform: "scale(1.02)" }}
        justifyContent="flex-start"
        size="2xl"
        fontSize="lg"
        height="60px"
        paddingLeft="30px"
        borderRadius="full"
      >
        Saved
      </Button>
      <Button
        leftIcon={<FiShoppingCart />}
        variant={activeView === "cart" ? "solid" : "ghost"}
        backgroundColor={activeView === "cart" ? "blue.600" : "transparent"}
        color={activeView === "cart" ? "white" : "inherit"}
        onClick={() => handleViewChange("cart")}
        transform={activeView === "cart" ? "scale(1.06)" : "scale(1)"}
        _hover={{ backgroundColor: "gray.600", transform: "scale(1.02)" }}
        justifyContent="flex-start"
        size="2xl"
        fontSize="lg"
        height="60px"
        paddingLeft="30px"
        borderRadius="full"
      >
        Cart
      </Button>
      <Button
        leftIcon={<FiShoppingBag />}
        variant={activeView === "orders" ? "solid" : "ghost"}
        backgroundColor={activeView === "orders" ? "blue.500" : "transparent"}
        color={activeView === "orders" ? "white" : "inherit"}
        onClick={() => handleViewChange("orders")}
        transform={activeView === "orders" ? "scale(1.06)" : "scale(1)"}
        _hover={{ backgroundColor: "gray.600", transform: "scale(1.02)" }}
        justifyContent="flex-start"
        size="2xl"
        fontSize="lg"
        height="60px"
        paddingLeft="30px"
        borderRadius="full"
      >
        Orders
      </Button>
      <Button
        leftIcon={<FiLogOut />}
        variant="ghost"
        color="inherit"
        _hover={{ backgroundColor: "gray.600", transform: "scale(1.02)" }}
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
              title: "Logout Failed",
              description: (error as Error)?.message || "Error logging out",
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

export default Sidebar;
