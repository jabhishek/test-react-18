import { TransactionsAggregateQuery } from '../../generated/graphql';
import { AgGridReact } from '@ag-grid-community/react';
import { ColDef } from '@ag-grid-community/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import styles from '../../components/Grids/grids.module.css';
import { useMemo, useState, useTransition } from 'react';
import {
  formatNumberWithComma,
  PriceCellRenderer,
  SecurityNameCellRenderer,
  ValueCellRenderer,
} from '../../components/Grids/cellRenderers';

export const HoldingsGrid = ({
  holdings,
  statements,
  cash,
  holdingsValue,
}: {
  statements:
    | NonNullable<TransactionsAggregateQuery['transactionsAggregate']>['statement']
    | undefined;
  holdings:
    | NonNullable<TransactionsAggregateQuery['transactionsAggregate']>['holdings']
    | undefined;
  cash: number;
  holdingsValue: number;
}) => {
  const [liveQuotes, setLiveQuotes] = useState<Map<string, number>>(new Map());

  const [loading, startTransition] = useTransition();

  const addLiveQuote = (symbol: string, quote: number) => {
    if (!liveQuotes.has(symbol)) {
      const existing = new Map(liveQuotes);
      existing.set(symbol, quote);
      startTransition(() => setLiveQuotes(existing));
    }
  };

  const pfValue = holdingsValue + (cash ?? 0);
  console.log('pfValue', pfValue);

  const enhancedHoldings = useMemo(() => {
    return holdings?.map((x) => {
      return {
        ...x,
        weightage: pfValue ? (x?.valueAtCurrentPrice ?? 0) / pfValue : 0,
        percentPnL:
          x?.valueAtCostPrice && x?.valueAtCurrentPrice && x?.currentPnL
            ? (x?.currentPnL * 100) / x?.valueAtCostPrice
            : 0,
      };
    });
  }, [holdings, pfValue]);

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
        return formatNumberWithComma(value, 2);
      },
    },
    {
      field: 'weightage',
      minWidth: 100,
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      valueFormatter: ({ value }) => {
        return formatNumberWithComma(value * 100);
      },
    },
    /*
    {
      field: 'liveQuote',
      minWidth: 150,
      resizable: true,
      cellRenderer: LiveQuoteChangeCellRenderer,
      cellRendererParams: { addLiveQuote },
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
    },
*/
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
      minWidth: 100,
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
      field: 'percentPnL',
      headerName: 'Percent P&L',
      minWidth: 100,
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      valueFormatter: ({ value }) => {
        return `${formatNumberWithComma(value, 2)}%`;
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
          rowData={enhancedHoldings ?? []}
          domLayout={'autoHeight'}
          modules={AllCommunityModules}
        />
      </div>
    </>
  );
};
