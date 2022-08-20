import { Box, Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { useGetAlgoTradesQuery } from '../../generated/graphql';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { ColDef } from '@ag-grid-community/core';
import { formatNumberWithComma, LiveQuoteCellRenderer } from '../../components/Grids/cellRenderers';

import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

import styles from '../../components/Grids/grids.module.css';
import homeStyles from './home.module.css';
import { RowStyle } from '@ag-grid-community/core/dist/cjs/es5/entities/gridOptions';
import { useState } from 'react';
import { AnalyzeSecurity } from '../../components/AnalyzeSecurity';

const Home = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const { data: algoTrades } = useGetAlgoTradesQuery();

  const trades = algoTrades?.getAlgoTrades
    ?.filter((x) => x?.type === 'buy')
    ?.map((x) => {
      return {
        symbol: x?.symbol,
        date: x?.date,
        close: x?.close,
        sellDate: x?.relatedTrade?.[0]?.date,
        sellPrice: x?.relatedTrade?.[0]?.close,
        isProfit: (x?.relatedTrade?.[0]?.close ?? 0) > (x?.close ?? 0),
      };
    })
    /*?.filter((x) => !x.isProfit)*/
    ?.sort((a, b) => {
      const sellDateA = a?.sellDate as string;
      const sellDateB = b?.sellDate as string;
      const buyDateA = a?.date as string;
      const buyDateB = b?.date as string;
      if (!sellDateA) {
        return buyDateA > buyDateB ? -1 : 1;
      }
      if (sellDateA > sellDateB) {
        return -1;
      }
      return 1;
    });
  console.log('algo trades', trades);

  const columnDefs: ColDef[] = [
    {
      field: 'symbol',
      minWidth: 300,
      resizable: true,
      cellClass: `${styles.flex}`,
    },
    {
      headerName: 'Buy date',
      field: 'date',
      minWidth: 200,
      resizable: true,
      cellClass: `${styles.flex}`,
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
      headerName: 'Sell date',
      field: 'sellDate',
      minWidth: 200,
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
      minWidth: 150,
      resizable: true,
      cellRenderer: LiveQuoteCellRenderer,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
    },
  ];

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
