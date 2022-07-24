import {
  TransactionsAggregateQuery,
  usePortfoliosQuery,
  useTransactionsAggregateQuery,
} from '../../generated/graphql';
import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Select as ChakraSelect } from 'chakra-react-select';

type Option = { value: string; label: string };

const Home = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Array<Option> | undefined>(undefined);
  const { data, loading } = useTransactionsAggregateQuery({
    variables: {
      pfIds: selectedPortfolio?.map((x) => x.value)?.join(','),
    },
    skip: !selectedPortfolio?.length,
  });

  const [latestData, setLatestData] = useState<TransactionsAggregateQuery | undefined>(undefined);

  useEffect(() => {
    console.log('selectedPortfolio, data', selectedPortfolio, data);
    if (data) {
      setLatestData(data);
    }
    if (!selectedPortfolio?.length) {
      setLatestData(undefined);
    }
  }, [data, selectedPortfolio]);

  const { data: portfolios } = usePortfoliosQuery();

  const options = portfolios?.portfolios?.map((x) => ({
    value: x?._id ?? '',
    label: x?.name ?? '',
  }));

  return (
    <div>
      <Box p={4}>
        <ChakraSelect<Option, true>
          isMulti
          options={options}
          value={selectedPortfolio}
          onChange={(value) => {
            setSelectedPortfolio([...value]);
          }}
        />
        <Box opacity={loading ? 0.5 : 1}>
          <Text>{latestData?.transactionsAggregate?.cash?.cashIn ?? 0}</Text>
          <Text>{latestData?.transactionsAggregate?.cash?.cashOut ?? 0}</Text>
          <Text>{latestData?.transactionsAggregate?.cash?.currentCash ?? 0}</Text>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
