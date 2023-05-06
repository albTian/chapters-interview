import { Box, Avatar, Text, BoxProps, Button } from "@chakra-ui/react";
import { useState } from "react";
import { ChapterCandidate } from "../types";
import { CandidateInfo } from "./CandidateInfo";

interface CandidateItemProps extends BoxProps {
  candidate: ChapterCandidate;
}

const CandidateItem = ({ candidate, ...props }: CandidateItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fitScore = Math.round(candidate.fit_score * 100);
  let fitColor = "green.500";
  if (fitScore < 50) {
    fitColor = "red.500";
  } else if (fitScore < 80) {
    fitColor = "yellow.500";
  }

  const hasTag = candidate.tag !== "None"

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  
  return (
    <Box
      {...props}
    >
      <Button w="100%" p="8" variant="ghost" onClick={handleExpandClick}>
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
        {isExpanded && (
          <CandidateInfo linkedinId={candidate.id} />
        )}
    </Box>
  );
};

export default CandidateItem;
