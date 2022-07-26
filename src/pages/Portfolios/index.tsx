import { useEffect, useState } from 'react';
import {
  TransactionsAggregateQuery,
  usePortfoliosQuery,
  useTransactionsAggregateQuery,
} from '../../generated/graphql';
import { Box, Grid } from '@chakra-ui/react';
import { Select as ChakraSelect } from 'chakra-react-select';
import { HoldingsSection } from './HoldingsSection';
import { Option } from '../../models/Option';

const Portfolios = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Array<Option> | undefined>(undefined);
  const { data, loading } = useTransactionsAggregateQuery({
    variables: {
      pfIds: selectedPortfolio?.map((x) => x.value)?.join(','),
    },
    skip: !selectedPortfolio?.length,
  });

  const [latestData, setLatestData] = useState<TransactionsAggregateQuery | undefined>(undefined);

  useEffect(() => {
    if (data) {
      setLatestData(data);
    }
    if (!selectedPortfolio?.length) {
      setLatestData(undefined);
    }
  }, [data, selectedPortfolio]);

  const { data: portfolios } = usePortfoliosQuery();

  const pfOptions = portfolios?.portfolios?.map((x) => ({
    value: x?._id ?? '',
    label: x?.name ?? '',
  }));

  return (
    <div>
      <Box p={4}>
        <Grid templateColumns={'repeat(3, 1fr)'} pb={4} gridGap={2}>
          <ChakraSelect<Option, true>
            isMulti
            options={pfOptions}
            value={selectedPortfolio}
            onChange={(value) => {
              setSelectedPortfolio([...value]);
            }}
          />
        </Grid>
        <Box opacity={loading ? 0.5 : 1}>
          <HoldingsSection aggregate={latestData?.transactionsAggregate} />
        </Box>
      </Box>
    </div>
  );
};

export default Portfolios;
