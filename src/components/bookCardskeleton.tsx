import { Card, Skeleton, SkeletonText, CardBody } from "@chakra-ui/react";


const BookCardskeleton = () => {
  return (
    <Card>
      <Skeleton height="200px" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default BookCardskeleton;
