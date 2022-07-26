import { Box } from '@chakra-ui/react';
import { useAllSecuritiesQuery } from '../../generated/graphql';

const Home = () => {
  const { data, loading } = useAllSecuritiesQuery();

  console.log('data, loading', data, loading);

  return <Box>Home</Box>;
};

export default Home;
