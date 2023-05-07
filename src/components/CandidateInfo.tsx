import {
  Spinner,
  Text
} from "@chakra-ui/react";
import React from "react";
import { useContactCandidate } from "../hooks/useCandidate";
import { ChapterCandidate } from "../types";
import { ReachableCandidate } from "./Candidates/ReachableCandidate";
import { ReferrableCandidate } from "./Candidates/ReferrableCandidate";

interface ContactCandidateProps {
  candidate: ChapterCandidate;
}

export const CandidateInfo: React.FC<ContactCandidateProps> = ({
  candidate,
}) => {
  const { referrers, isLoading, isError, reachable } = useContactCandidate(
    candidate.id
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !referrers) {
    return <Text>Error fetching referrers</Text>;
  }

  return reachable ? (
    <ReachableCandidate candidate={candidate} />
  ) : (
    <ReferrableCandidate referrers={referrers} />
  );
};
