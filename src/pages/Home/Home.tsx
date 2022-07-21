import { usePortfoliosQuery, useTransactionsAggregateQuery } from '../../generated/graphql';
import { Box, Select } from '@chakra-ui/react';
import { useState } from 'react';

const Home = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null);
  const { data: portfolios, loading: portfoliosLoading } = usePortfoliosQuery();
  const { data, loading } = useTransactionsAggregateQuery({
    variables: {
      pfIds: selectedPortfolio,
    },
    skip: !selectedPortfolio,
  });

  console.log('data, loading', data, loading);
  console.log('portfolios, loading', portfolios?.portfolios, portfoliosLoading);

  return (
    <div>
      <Box p={4}>
        <Select
          w={300}
          mb={4}
          value={selectedPortfolio as string}
          onChange={(e) => {
            setSelectedPortfolio(e.target.value);
          }}>
          {portfolios?.portfolios?.map((x) => {
            return <option value={x?._id as string}>{x?.name}</option>;
          })}
        </Select>
      </Box>
    </div>
  );
};

export default Home;
