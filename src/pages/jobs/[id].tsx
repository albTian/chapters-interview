import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { DarkModeSwitch } from '../../components/DarkModeSwitch';
import { JobsList } from '../../components/JobsList';

export default function JobsDetails() {
  const router = useRouter();
  const { id } = router.query;

  return (    
  <Flex>
    <JobsList />
    <div>job {id}</div>
    <DarkModeSwitch />
  </Flex>
  );
}
