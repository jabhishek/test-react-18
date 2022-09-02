import { Box, Grid } from '@chakra-ui/react';
import { TransactionsAggregateQuery } from '../../generated/graphql';
import { HoldingsGrid } from './HoldingsGrid';
import { useMemo, useState } from 'react';
import { Select as ChakraSelect } from 'chakra-react-select';
import { Option } from '../../models/Option';

type IHoldingOption = 'all' | 'holdings' | 'no-holdings';

const holdingOptions: Array<Option<IHoldingOption>> = [
  {
    value: 'holdings',
    label: 'Holdings only',
  },
  {
    value: 'no-holdings',
    label: 'No Holdings',
  },
  {
    value: 'all',
    label: 'All Holdings',
  },
];

export const HoldingsSection = ({
  aggregate,
}: {
  aggregate: TransactionsAggregateQuery['transactionsAggregate'] | undefined;
}) => {
  const [selectedHoldingFilter, setSelectedHoldingFilter] = useState<
    Option<IHoldingOption> | undefined
  >(holdingOptions.find((x) => x.value === 'holdings'));

  const holdings = useMemo(
    () =>
      aggregate?.holdings?.filter((x) => {
        if (selectedHoldingFilter?.value === 'holdings') {
          return x && x.qty > 0;
        }
        if (selectedHoldingFilter?.value === 'no-holdings') {
          return x && x.qty === 0;
        }
        return true;
      }),
    [aggregate?.holdings, selectedHoldingFilter?.value],
  );

  console.log('HoldingsSection render');
  return (
    <Box>
      <Grid templateColumns={'repeat(3, 1fr)'} pb={4} gridGap={2}>
        <ChakraSelect<Option<IHoldingOption>, false>
          options={holdingOptions}
          value={selectedHoldingFilter}
          onChange={(value) => {
            setSelectedHoldingFilter(value as Option<IHoldingOption>);
          }}
        />
      </Grid>

      {aggregate ? <HoldingsGrid holdings={holdings} statements={aggregate.statement} /> : null}
    </Box>
  );
};
