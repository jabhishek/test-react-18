import { Box, Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import {
  GetAlgoTradesQuery,
  GetLatestQuoteQuery,
  useGetAlgoTradesQuery,
  useGetLatestQuoteLazyQuery,
} from '../../generated/graphql';
import { IStrategyTrade } from '@pfmanager/types';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { ColDef } from '@ag-grid-community/core';
import { formatNumberWithComma, LiveQuoteCellRenderer } from '../../components/Grids/cellRenderers';

import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

import styles from '../../components/Grids/grids.module.css';
import homeStyles from './home.module.css';
import { RowStyle } from '@ag-grid-community/core/dist/cjs/es5/entities/gridOptions';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnalyzeSecurity } from '../../components/AnalyzeSecurity';
import { backTest } from './back-test';

const Home = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const { data: algoTrades } = useGetAlgoTradesQuery();

  const [doGetQuote] = useGetLatestQuoteLazyQuery();

  const getQuote = useCallback(async (symbol: string): Promise<GetLatestQuoteQuery> => {
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
  }, []);

  const algoTrades2 = useMemo(() => {
    return ([...(algoTrades?.getAlgoTrades ?? [])] as GetAlgoTradesQuery['getAlgoTrades'])
      ?.filter((x) => !x?.hasAnomaly && x?.security?.country === 'India')
      .sort((a, b) => {
        const buyDateA = a?.date as string;
        const buyDateB = b?.date as string;
        return buyDateA < buyDateB ? -1 : 1;
      });
  }, [algoTrades?.getAlgoTrades]);

  // const x = backTest(algoTrades2, getQuote);

  //console.log('x', x);

  const trades = algoTrades?.getAlgoTrades
    ?.filter((x) => x?.type === 'buy')
    ?.map((x) => {
      const profit = (x?.relatedTrade?.[0]?.close ?? 0) - (x?.close ?? 0);
      return {
        symbol: x?.symbol,
        name: x?.security?.name,
        date: x?.date,
        close: x?.close,
        sellDate: x?.relatedTrade?.[0]?.date,
        sellPrice: x?.relatedTrade?.[0]?.close,
        isProfit: profit > 0,
        profitLossP: x?.relatedTrade ? (profit * 100) / (x?.close as number) : null,
        country: x?.security?.country,
        daysSinceEma200Increasing: x?.daysSinceEma200Increasing,
        daysSinceAboveEma200: x?.daysSinceAboveEma200,
        weightedATR: x?.weightedATR,
        watchlists: x?.security?.watchlists
          ?.map((x) => x?.name)
          .filter((x: string | undefined) => typeof x === 'string')
          ?.join(', '),
        portfolios: x?.security?.portfolios
          ?.map((x) => x?.pf?.name)
          .filter((x: string | null | undefined) => typeof x === 'string')
          ?.join(', '),
        hasAnomaly: x?.hasAnomaly,
      };
    })
    /*?.filter((x) => !x.isProfit)*/
    ?.sort((a, b) => {
      const buyDateA = a?.date as string;
      const buyDateB = b?.date as string;
      return buyDateA > buyDateB ? -1 : 1;
    });

  const columnDefs: ColDef[] = [
    {
      field: 'symbol',
      resizable: true,
      cellClass: `${styles.flex}`,
    },
    {
      field: 'name',
      minWidth: 300,
      resizable: true,
      cellClass: `${styles.flex}`,
    },
    {
      field: 'hasAnomaly',
      minWidth: 300,
      resizable: true,
      cellClass: `${styles.flex}`,
    },
    {
      field: 'portfolios',
      minWidth: 300,
      resizable: true,
      cellClass: `${styles.flex}`,
    },
    {
      field: 'country',
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
      headerName: 'Profit / loss',
      field: 'profitLossP',
      resizable: true,
      cellClass: `${styles.flex}`,
      valueFormatter: ({ value }) => {
        return value ? `${formatNumberWithComma(value, 2)}%` : '';
      },
    },
    {
      headerName: 'Buy price',
      field: 'close',
      minWidth: 100,
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      valueFormatter: ({ value }) => {
        return formatNumberWithComma(value, 2);
      },
    },
    {
      field: 'daysSinceEma200Increasing',
      minWidth: 100,
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'daysSinceAboveEma200',
      minWidth: 100,
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'weightedATR',
      minWidth: 100,
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      valueFormatter: ({ value }) => {
        return formatNumberWithComma(value, 2);
      },
    },
    {
      headerName: 'Sell date',
      field: 'sellDate',
      minWidth: 100,
      resizable: true,
      cellClass: `${styles.flex}`,
    },

    {
      headerName: 'Sell price',
      field: 'sellPrice',
      minWidth: 100,
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      valueFormatter: ({ value }) => {
        return formatNumberWithComma(value, 2);
      },
    },
    {
      field: 'liveQuote',
      minWidth: 100,
      resizable: true,
      cellRenderer: LiveQuoteCellRenderer,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
    },
  ];

  useEffect(() => {
    const algoTrades2 = (
      [...(algoTrades?.getAlgoTrades ?? [])] as GetAlgoTradesQuery['getAlgoTrades']
    )
      ?.filter((x) => !x?.hasAnomaly)
      .sort((a, b) => {
        const buyDateA = a?.date as string;
        const buyDateB = b?.date as string;
        return buyDateA < buyDateB ? -1 : 1;
      });
    if (algoTrades2?.length) {
      backTest(algoTrades2, getQuote).then((x) => {
        console.log('backTest results', x);
      });
    }
  }, [algoTrades?.getAlgoTrades]);

  return (
    <Box>
      <div className="ag-theme-alpine">
        <AgGridReact
          rowHeight={30}
          className={''}
          columnDefs={columnDefs}
          defaultColDef={{
            resizable: true,
            sortable: true,
            autoHeight: true,
            filter: true,
          }}
          rowData={trades ?? []}
          domLayout={'autoHeight'}
          modules={AllCommunityModules}
          pagination={true}
          paginationPageSize={50}
          onRowClicked={({ data }) => {
            setSelectedSymbol(data?.symbol);
          }}
          rowClassRules={{
            [`${homeStyles.positive}`]: () => true,
          }}
          getRowStyle={({ data }): RowStyle => {
            if (!data?.sellDate) {
              return {};
            }
            if (data?.hasAnomaly) {
              return { background: 'var(--chakra-colors-blue-100)' };
            }
            if (data.isProfit) {
              return { background: 'var(--chakra-colors-green-50)' };
            } else {
              return { background: 'var(--chakra-colors-red-50)' };
            }
          }}
        />
      </div>
      <Modal
        isOpen={!!selectedSymbol}
        onClose={() => setSelectedSymbol(null)}
        isCentered
        scrollBehavior={'inside'}
        size={'full'}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <AnalyzeSecurity symbol={selectedSymbol as string} />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
