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