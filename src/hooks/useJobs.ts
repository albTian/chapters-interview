import useSWR from "swr";
import { API_URL } from "../constants";
import { ChapterCandidate, ChapterJob } from "../types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useJobs = () => {
  const { data, error, isLoading } = useSWR<ChapterJob[]>(
    `${API_URL}/takehome/get_jobs`,
    fetcher
  );

  return {
    jobs: data,
    isLoading,
    isError: error,
  };
};


// TODO: Better typing !!! Need better backend -> frontend data matching
interface CandidateResponse {
  id: string;
  name: string;
  linkedin_url: string;
  job_list: string;
}

type UseCandidatesForJobResponse = {
  candidate: CandidateResponse
  fit_score: string
  tags: string
}

// Backend already sorts based on fit_score
export const useCandidatesForJob = (jobId: string) => {
  const { data, error, isValidating, isLoading } = useSWR<UseCandidatesForJobResponse[]>(
    `${API_URL}/takehome/get_candidates_for_job/${jobId}`,
    fetcher
  );

  const candidates: ChapterCandidate[] = []

  if (data) {
    data.forEach(res => {
      const candidate: ChapterCandidate = {
        id: res.candidate.id,
        name: res.candidate.name,
        profile_image: res.candidate.linkedin_url,
        tag: res.tags,
        fit_score: Number(res.fit_score)
      }
      candidates.push(candidate)
    })
  }


  return {
    candidates,
    isLoading,
    isError: error,
    isUpdating: isValidating,
  };
};
