import { useEffect, useRef, useState } from 'react';
import {
  TransactionsAggregateQuery,
  usePortfoliosQuery,
  useTransactionsAggregateQuery,
} from '../../generated/graphql';
import { Box, Grid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Select as ChakraSelect } from 'chakra-react-select';
import { HoldingsSection } from './HoldingsSection';
import { Option } from '../../models/Option';
import { StatementsSection } from './StatementsSection';
import { useLocalStorageState } from '@pfmanager/utils';

const Portfolios = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useLocalStorageState<Array<Option> | undefined>(
    'selected',
    undefined,
  );
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
        {selectedPortfolio ? (
          <Box opacity={loading ? 0.5 : 1}>
            <Tabs>
              <TabList>
                <Tab>Holdings</Tab>
                <Tab>Transactions</Tab>
                <Tab>Charts</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <HoldingsSection aggregate={latestData?.transactionsAggregate} />
                </TabPanel>
                <TabPanel>
                  <StatementsSection aggregate={latestData?.transactionsAggregate} />
                </TabPanel>
                <TabPanel>
                  <p>Showing charts here</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        ) : null}
      </Box>
    </div>
  );
};

export default Portfolios;
