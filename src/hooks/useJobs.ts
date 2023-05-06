import useSWR from 'swr';
import { API_URL } from '../constants';
import { ChapterCandidate, ChapterJob } from '../types';



const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useJobs = () => {
  const { data, error, isLoading } = useSWR<ChapterJob[]>(`${API_URL}/takehome/get_jobs`, fetcher);

  return {
    jobs: data,
    isLoading,
    isError: error,
  };
};

export const useCandidatesForJob = (jobId: string) => {
  const { data, error, isValidating, isLoading } = useSWR<ChapterCandidate[]>(
    `${API_URL}/takehome/get_candidates_for_job/${jobId}`,
    fetcher
  );

  return {
    candidates: data,
    isLoading,
    isError: error,
    isUpdating: isValidating,
  };
};