import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";
interface props {
  children: string;
}
const Expandabletext = ({ children }: props) => {
  const [expanded, setexpanded] = useState(false);
  const limit = 300;
  if (!children) return null;
  if (children.length <= limit) return <Text>{children}</Text>;
  const summary = expanded ? children : children.substring(0, limit) + "....";
  return (
    <Text>
      {summary}
      <Button
        size="xs"
        marginLeft={1}
        fontWeight="bold"
        colorScheme="yellow"
        onClick={() => setexpanded(!expanded)}
        borderRadius="full"
      >
        {expanded ? "Show Less" : "Read More"}
      </Button>
    </Text>
  );
};

export default Expandabletext;
