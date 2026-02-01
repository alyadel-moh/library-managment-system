import {
  VStack,
  Box,
  Avatar,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FiImage, FiTrash2 } from "react-icons/fi";
import useUpdateProfilePhoto from "../hooks/useUpdateprofilephoto";
import Usedeletephoto from "../hooks/usedeletephoto";

const UpdateProfilePhoto = ({
  user,
  refetchphoto,
}: {
  user: any;
  refetchphoto?: (photo: string) => void;
}) => {
  const toast = useToast({
    position: "bottom-right",
    duration: 3000,
    isClosable: true,
  });
  const {
    mutate: updateMutate,
    isSuccess: updateIsSuccess,
    data: updateData,
  } = useUpdateProfilePhoto();
  const {
    mutate: deleteMutate,
    isSuccess: deleteIsSuccess,
    data: deleteData,
  } = Usedeletephoto();
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
    updateMutate(cloudinaryData.secure_url);
  };
  useEffect(() => {
    if (updateIsSuccess && updateData) {
      toast({
        title: updateData.message,
        status: "success",
      });
      if (refetchphoto) refetchphoto(selectedImage || "");
    }
  }, [updateIsSuccess]);

  const handleDeletePhoto = () => {
    deleteMutate();
  };
  useEffect(() => {
    if (deleteIsSuccess && deleteData) {
      toast({
        title: deleteData.message,
        status: "success",
      });
      setSelectedImage(null);
      if (refetchphoto) refetchphoto("");
    }
  }, [deleteIsSuccess]);
  return (
    <>
      <VStack spacing={1}>
        <Box position="relative" marginTop="15px">
          {/* The Visual "Icon" or Avatar */}
          <Avatar
            size="xl"
            src={selectedImage || user.photoUrl}
            name={`${user?.firstName} ${user?.lastname}`}
            border="1px solid #3182ce"
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
          {(selectedImage || user.photoUrl) && (
            <IconButton
              aria-label="Delete photo"
              icon={<FiTrash2 />}
              size="sm"
              colorScheme="red"
              rounded="full"
              position="absolute"
              bottom="0"
              left="0"
              onClick={handleDeletePhoto}
            />
          )}
        </Box>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        <Text fontSize="sm" color="gray.500">
          Click icon to change photo
        </Text>
      </VStack>
    </>
  );
};

export default UpdateProfilePhoto;
