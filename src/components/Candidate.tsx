import { Box, Avatar, Text, BoxProps, Button } from "@chakra-ui/react";
import { ChapterCandidate } from "../types";

interface CandidateItemProps extends BoxProps {
  candidate: ChapterCandidate;
}

const CandidateItem = ({ candidate, ...props }: CandidateItemProps) => {
  const fitScore = Math.round(candidate.fit_score * 100);
  let fitColor = "green.500";
  if (fitScore < 50) {
    fitColor = "red.500";
  } else if (fitScore < 80) {
    fitColor = "yellow.500";
  }

  const hasTag = candidate.tag !== "None"

  
  return (
    <Box
      {...props}
    >
      <Button w="100%" p="8" variant="ghost">
        <Avatar src={candidate.profile_image} />
        <Box ml="4" textAlign={"left"}>
          <Text fontWeight="bold">{candidate.name}</Text>
          {hasTag && <Text fontSize="sm">{candidate.tag}</Text>}
        </Box>
        <Box ml="auto" textAlign="right">
          <Text fontWeight="bold" color={fitColor}>
            {fitScore}
          </Text>
        </Box>
      </Button>
    </Box>
  );
};

export default CandidateItem;
