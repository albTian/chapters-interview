import useSWR from 'swr';
import { API_URL } from '../constants';
import { ChapterCandidate, ChapterJob } from '../types';



const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCandidate = () => {
  const { data, error, isLoading } = useSWR<ChapterJob[]>(`${API_URL}/takehome/get_jobs`, fetcher);

  return {
    jobs: data,
    isLoading,
    isError: error,
  };
};

export type CandidateReferrable = {
  status: string;
  referrers?: CandidateReferrer[];
  message?: string
}

export type CandidateReferrer = {
  name: string;
  linkedin_url: string;
  closeness_score: number;
  tags: string;
  user_id: number;
}

export const useContactCandidate = (linkedin_id: string) => {
  // Hardcoding this since its random on the backend
  const { data, error, isLoading } = useSWR<CandidateReferrable>(`${API_URL}/takehome/contact_candidate/${linkedin_id}`, fetcher);
  let referrers: CandidateReferrer[] = []
  let reachable = true
  if (data && data.status === "referrable" && "referrers" in data) {
    referrers = data.referrers
    reachable = false
  }

  return {
    referrers,
    reachable,
    isLoading,
    isError: error,
  };
};