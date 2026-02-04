import { Card, Skeleton, SkeletonText, CardBody, Box, VStack, HStack } from "@chakra-ui/react";


const BookCardskeleton = () => {
  return (
    <Card 
      height="100%"
      display="flex"
      flexDirection="column"
      borderRadius="3xl"
      overflow="hidden"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Box bg="gray.50">
        <Skeleton height="250px" />
      </Box>
      <CardBody
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p={4}
      >
        <Box flex="1">
          <VStack align="stretch" spacing={2}>
            <SkeletonText noOfLines={2} spacing="2" skeletonHeight="2" />
            
            <HStack justifyContent="space-between" alignItems="center">
              <Skeleton height="16px" width="30px" />
              <Skeleton height="14px" width="70px" />
            </HStack>

            <Skeleton height="40px" borderRadius="full" mt={2} />
          </VStack>
        </Box>
      </CardBody>
    </Card>
  );
};

export default BookCardskeleton;
