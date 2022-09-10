import { useEffect, useState } from 'react';
import { TransactionsAggregateQuery, useTransactionsAggregateQuery } from '../../generated/graphql';
import { Box, Grid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { HoldingsSection } from './HoldingsSection';
import { Option } from '../../models/Option';
import { StatementsSection } from './Statement/StatementsSection';
import { useLocalStorageState } from '@pfmanager/utils';
import { PortfolioSelect } from '../../components/SelectComponents/PortfolioSelect';

const Portfolios = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useLocalStorageState<Array<Option> | undefined>(
    'selected',
    undefined,
  );
  const {
    data,
    loading,
    refetch: refetchAggregate,
  } = useTransactionsAggregateQuery({
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

  return (
    <div>
      <Box p={4}>
        <Grid templateColumns={'repeat(3, 1fr)'} pb={4} gridGap={2}>
          <PortfolioSelect
            selectedPortfolio={selectedPortfolio}
            setSelectedPortfolio={setSelectedPortfolio}
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
                  <StatementsSection
                    aggregate={latestData?.transactionsAggregate}
                    refetchAggregate={() => refetchAggregate()}
                  />
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
