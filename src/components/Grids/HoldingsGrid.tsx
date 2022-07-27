import { TransactionsAggregateQuery } from '../../generated/graphql';
import { AgGridReact } from '@ag-grid-community/react';
import { ColDef } from '@ag-grid-community/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import styles from './grids.module.css';
import { useState } from 'react';
import {
  formatNumberWithComma,
  LiveQuoteCellRenderer,
  PriceCellRenderer,
  SecurityNameCellRenderer,
  ValueCellRenderer,
} from './cellRenderers';

export const HoldingsGrid = ({
  holdings,
  statements,
}: {
  statements:
    | NonNullable<TransactionsAggregateQuery['transactionsAggregate']>['statement']
    | undefined;
  holdings:
    | NonNullable<TransactionsAggregateQuery['transactionsAggregate']>['holdings']
    | undefined;
}) => {
  const [liveQuotes, setLiveQuotes] = useState<Map<string, number>>(new Map());

  const addLiveQuote = (symbol: string, quote: number) => {
    if (!liveQuotes.has(symbol)) {
      const existing = new Map(liveQuotes);
      existing.set(symbol, quote);
      setLiveQuotes(existing);
    }
  };

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
      valueFormatter: ({ value }) => {
        return formatNumberWithComma(value);
      },
    },
    {
      field: 'liveQuote',
      minWidth: 150,
      resizable: true,
      cellRenderer: LiveQuoteCellRenderer,
      cellRendererParams: { addLiveQuote },
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
