import { TransactionsAggregateQuery } from '../../generated/graphql';
import { AgGridReact } from '@ag-grid-community/react';
import { ColDef, ICellRendererParams } from '@ag-grid-community/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Box } from '@chakra-ui/react';
import styles from './grids.module.css';

export const formatNumberWithComma = (value: number | string) => {
  if (typeof value !== 'number') {
    return '';
  }

  return value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
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
      <Box>{data?.symbol}</Box>
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
      <Box>{formatNumberWithComma(data?.costPrice ?? 0)}</Box>
    </Box>
  );
};

export const ValueCellRenderer = (props: ICellRendererParams) => {
  const { data } = props as {
    data: NonNullable<
      NonNullable<TransactionsAggregateQuery['transactionsAggregate']>['holdings']
    >[number];
  };
  const isProfit = (data?.valueAtCurrentPrice ?? 0) > (data?.valueAtCostPrice ?? 0);
  return (
    <Box sx={{ lineHeight: 1.3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Box color={isProfit ? 'green.400' : 'red.400'}>
        {formatNumberWithComma(data?.valueAtCurrentPrice ?? 0)}
      </Box>
      <Box>{formatNumberWithComma(data?.valueAtCostPrice ?? 0)}</Box>
    </Box>
  );
};

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

export const HoldingsGrid = ({
  holdings,
  statements,
}: {
  statements: NonNullable<TransactionsAggregateQuery['transactionsAggregate']>['statement'];
  holdings: NonNullable<TransactionsAggregateQuery['transactionsAggregate']>['holdings'];
}) => {
  const columnDefs: ColDef[] = [
    {
      field: 'stock.name',
      minWidth: 300,
      resizable: true,
      cellRenderer: SecurityNameCellRenderer,
      cellClass: `${styles.flex}`,
    },
    {
      field: 'qty',
      minWidth: 100,
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
    },
    {
      field: 'currentPrice',
      minWidth: 150,
      resizable: true,
      cellRenderer: PriceCellRenderer,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
    },
    {
      field: 'valueAtCurrentPrice',
      minWidth: 150,
      resizable: true,
      cellRenderer: ValueCellRenderer,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      sort: 'desc',
    },
    {
      field: 'currentPnL',
      headerName: 'Current P&L',
      minWidth: 150,
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      valueGetter: ({ data }) => {
        return data?.currentPnL ?? data?.profitLossBooked;
      },
      valueFormatter: ({ value }) => {
        return formatNumberWithComma(value);
      },
      cellStyle: (params) => {
        return {
          color:
            params.value > 0 ? 'var(--chakra-colors-green-400)' : 'var(--chakra-colors-red-400)',
        };
      },
    },
    {
      field: 'dividends',
      headerName: 'Dividends',
      minWidth: 150,
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      valueGetter: (d): number => {
        const symbol = d?.data?.symbol;

        return (
          statements
            ?.filter((x) => x?.symbol === symbol && x?.trxType === 'dividend')
            ?.reduce((acc, d) => {
              return acc + (d?.amount ?? 0);
            }, 0) ?? 0
        );
      },
      valueFormatter: ({ value }) => {
        return formatNumberWithComma(value);
      },
    },
  ];

  return (
    <>
      <div className="ag-theme-alpine">
        <AgGridReact
          rowHeight={50}
          className={''}
          columnDefs={columnDefs}
          defaultColDef={{
            resizable: true,
            sortable: true,
            autoHeight: true,
            filter: true,
          }}
          rowData={holdings ?? []}
          domLayout={'autoHeight'}
          modules={AllCommunityModules}
        />
      </div>
    </>
  );
};
