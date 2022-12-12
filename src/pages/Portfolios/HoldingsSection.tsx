import { Box, Grid } from '@chakra-ui/react';
import { TransactionsAggregateQuery } from '../../generated/graphql';
import { HoldingsGrid } from './HoldingsGrid';
import { useMemo, useState } from 'react';
import { Select as ChakraSelect } from 'chakra-react-select';
import { Option } from '../../models/Option';
import { formatNumberWithComma } from '../../components/Grids/cellRenderers';

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

  const holdingsValue = useMemo(
    () =>
      holdings
        ?.filter((x) => x?.qty && x.qty > 0)
        ?.reduce((a, b) => {
          return (b?.valueAtCurrentPrice ?? 0) + a;
        }, 0) ?? 0,
    [holdings],
  );

  const cash = aggregate?.cash?.currentCash ?? 0;

  console.log('HoldingsSection render', aggregate?.cash?.currentCash);
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

      <Box>Cash: {formatNumberWithComma(cash)}</Box>

      {aggregate ? (
        <HoldingsGrid
          holdings={holdings}
          statements={aggregate.statement}
          holdingsValue={holdingsValue}
          cash={cash}
        />
      ) : null}
    </Box>
  );
};
