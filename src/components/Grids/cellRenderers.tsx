import { ICellRendererParams } from '@ag-grid-community/core';
import { TransactionsAggregateQuery, useGetLiveQuoteQuery } from '../../generated/graphql';
import { Box } from '@chakra-ui/react';
import { memo, useEffect } from 'react';

export const formatNumberWithComma = (value: number | string, decimalPlaces: number = 2) => {
  if (typeof value !== 'number') {
    return '';
  }

  return value.toFixed(decimalPlaces).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
export const SecurityNameCellRenderer = (props: ICellRendererParams) => {
  const { data } = props as {
    data: NonNullable<
      NonNullable<TransactionsAggregateQuery['transactionsAggregate']>['holdings']
    >[number];
  };
  return (
    <Box sx={{ lineHeight: 1.3 }}>
      <Box>{data?.stock?.name}</Box>
      <Box>
        {data?.symbol} ({data?.currency})
      </Box>
    </Box>
  );
};
export const PriceCellRenderer = (props: ICellRendererParams) => {
  const { data } = props as {
    data: NonNullable<
      NonNullable<TransactionsAggregateQuery['transactionsAggregate']>['holdings']
    >[number];
  };
  return (
    <Box sx={{ lineHeight: 1.3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Box>{formatNumberWithComma(data?.currentPrice ?? 0)}</Box>
      <Box>{formatNumberWithComma(data?.currencyCostPrice ?? 0)}</Box>
    </Box>
  );
};

export const LiveQuoteChangeCellRenderer = (
  props: ICellRendererParams & {
    addLiveQuote: (symbol: string, quote: number) => void;
  },
) => {
  const { data } = props as {
    data: NonNullable<
      NonNullable<TransactionsAggregateQuery['transactionsAggregate']>['holdings']
    >[number];
  };

  const { data: quote } = useGetLiveQuoteQuery({
    variables: {
      symbol: data?.symbol as string,
    },
    skip: !data?.symbol,
  });

  useEffect(() => {
    if (quote?.liveQuote?.close && data?.symbol) {
      props?.addLiveQuote?.(data?.symbol, quote?.liveQuote?.close);
    }
  }, [data?.symbol, props, quote?.liveQuote?.close]);

  const isProfit = (quote?.liveQuote?.close ?? 0) >= (quote?.liveQuote?.previousClose ?? 0);
  return (
    <Box sx={{ lineHeight: 1.3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Box color={isProfit ? 'green.400' : 'red.400'}>
        {formatNumberWithComma(quote?.liveQuote?.close ?? '-')}
      </Box>
      <Box>{formatNumberWithComma(quote?.liveQuote?.previousClose ?? '-')}</Box>
    </Box>
  );
};

export const LiveQuoteCellRenderer = (props: ICellRendererParams) => {
  const { data } = props as {
    data: NonNullable<
      NonNullable<TransactionsAggregateQuery['transactionsAggregate']>['holdings']
    >[number];
  };

  const { data: quote } = useGetLiveQuoteQuery({
    variables: {
      symbol: data?.symbol as string,
    },
    skip: !data?.symbol,
  });

  const isProfit = (quote?.liveQuote?.close ?? 0) >= (quote?.liveQuote?.previousClose ?? 0);
  return (
    <Box sx={{ lineHeight: 1.3, display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
      <Box color={isProfit ? 'green.400' : 'red.400'}>
        {formatNumberWithComma(quote?.liveQuote?.close ?? '-')}
      </Box>
    </Box>
  );
};

export const ValueCellRenderer = memo(
  (props: ICellRendererParams) => {
    const { data } = props as {
      data: NonNullable<
        NonNullable<TransactionsAggregateQuery['transactionsAggregate']>['holdings']
      >[number];
    };
    const isProfit = (data?.valueAtCurrentPrice ?? 0) > (data?.valueAtCostPrice ?? 0);

    return (
      <Box
        sx={{ lineHeight: 1.3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Box color={isProfit ? 'green.400' : 'red.400'}>
          {formatNumberWithComma(data?.valueAtCurrentPrice ?? 0)}
        </Box>
        <Box>{formatNumberWithComma(data?.valueAtCostPrice ?? 0)}</Box>
      </Box>
    );
  },
  ({ data }, { data: previousData }) => {
    if (data?.valueAtCurrentPrice !== previousData?.valueAtCurrentPrice) {
      /*
      console.log('data?.valueAtCurrentPrice', data?.valueAtCurrentPrice);
      console.log('previousData?.valueAtCurrentPrice', previousData?.valueAtCurrentPrice);
*/
    }
    return data?.valueAtCurrentPrice === previousData?.valueAtCurrentPrice;
  },
);

export const DividendCellRenderer = (
  props: ICellRendererParams & {
    aggregate: TransactionsAggregateQuery['transactionsAggregate'];
  },
) => {
  const { data, aggregate } = props as {
    data: NonNullable<
      NonNullable<TransactionsAggregateQuery['transactionsAggregate']>['holdings']
    >[number];
    aggregate: TransactionsAggregateQuery['transactionsAggregate'];
  };

  const symbol = data?.symbol;

  const dividends = aggregate?.statement
    ?.filter((x) => x?.symbol === symbol && x?.trxType === 'dividend')
    ?.reduce((acc, d) => {
      return acc + (d?.amount ?? 0);
    }, 0);
  return (
    <Box sx={{ lineHeight: 1.3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Box>{dividends}</Box>
    </Box>
  );
};
