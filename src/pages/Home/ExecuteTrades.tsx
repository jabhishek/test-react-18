import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { RowStyle } from '@ag-grid-community/core/dist/cjs/es5/entities/gridOptions';
import { ColDef } from '@ag-grid-community/core';
import styles from '../../components/Grids/grids.module.css';
import { formatNumberWithComma } from '../../components/Grids/cellRenderers';
import {
  GetAlgoTradesQuery,
  GetLatestQuoteQuery,
  useGetLatestQuoteLazyQuery,
} from '../../generated/graphql';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { backTest, IBackTestTrade } from './back-test';

export const ExecuteTrades = ({
  triggers,
  setSelectedSymbol,
}: {
  triggers: GetAlgoTradesQuery['getAlgoTrades'];
  setSelectedSymbol: Dispatch<SetStateAction<string | null>>;
}) => {
  const [executedTrades, setExecutedTrades] = useState<Array<IBackTestTrade>>([]);
  const [doGetQuote] = useGetLatestQuoteLazyQuery();

  const getQuote = useCallback(
    async (symbol: string): Promise<GetLatestQuoteQuery> => {
      return new Promise((res) => {
        doGetQuote({
          variables: {
            symbol,
          },
          onCompleted: (x) => {
            res(x);
          },
        });
      });
    },
    [doGetQuote],
  );
  const executedColumnDefs: ColDef[] = [
    {
      field: 'symbol',
      resizable: true,
      cellClass: `${styles.flex}`,
    },
    {
      headerName: 'Buy date',
      field: 'date',
      resizable: true,
      cellClass: `${styles.flex}`,
    },
    {
      headerName: 'Sell date',
      field: 'sellTrade.date',
      resizable: true,
      cellClass: `${styles.flex}`,
    },
    {
      headerName: 'Profit Percent',
      field: 'profitP',
      resizable: true,
      cellClass: `${styles.flex}`,
      valueFormatter: ({ value }) => {
        return value ? `${formatNumberWithComma(value, 2)}%` : '';
      },
    },
    {
      field: 'profitAmount',
      resizable: true,
      cellClass: `${styles.flex}`,
      valueFormatter: ({ value }) => {
        return value ? `${formatNumberWithComma(value, 2)}` : '';
      },
    },
    {
      field: 'totalProfit',
      resizable: true,
      cellClass: `${styles.flex}`,
      valueFormatter: ({ value }) => {
        return value ? `${formatNumberWithComma(value, 2)}` : '';
      },
    },
    {
      field: 'activeTrades',
      resizable: true,
      cellClass: `${styles.flex}`,
      valueFormatter: ({ value }) => {
        return value ? `${formatNumberWithComma(value, 2)}` : '';
      },
    },
  ];

  useEffect(() => {
    const algoTrades2 = ([...(triggers ?? [])] as GetAlgoTradesQuery['getAlgoTrades'])
      ?.filter(
        (x) => !x?.hasAnomaly && !!x?.relatedTrade,
        /*
              && x?.security?.country === 'India' &&
              x?.security?.portfolios
                ?.map((x) => x?.pf?.name ?? '')
                ?.join(',')
                ?.includes('NRE'),
    */
      )
      .sort((a, b) => {
        const buyDateA = a?.date as string;
        const buyDateB = b?.date as string;
        return buyDateA < buyDateB ? -1 : 1;
      });
    if (algoTrades2?.length) {
      backTest(algoTrades2, getQuote).then(
        ({ backTestTrades, holdingsValue, xirr, balanceAmount }) => {
          console.log('backTest results', backTestTrades, holdingsValue, xirr, balanceAmount);
          setExecutedTrades(backTestTrades);
        },
      );
    }
  }, [getQuote, triggers]);

  return (
    <AgGridReact
      rowHeight={30}
      className={''}
      columnDefs={executedColumnDefs}
      defaultColDef={{
        resizable: true,
        sortable: true,
        autoHeight: true,
        filter: true,
      }}
      rowData={executedTrades ?? []}
      domLayout={'autoHeight'}
      modules={AllCommunityModules}
      pagination={true}
      paginationPageSize={50}
      onRowClicked={({ data }) => {
        setSelectedSymbol(data?.symbol);
      }}
      getRowStyle={({ data }): RowStyle => {
        if (data.profitP > 0) {
          return { background: 'var(--chakra-colors-green-50)' };
        } else {
          return { background: 'var(--chakra-colors-red-50)' };
        }
      }}
    />
  );
};
