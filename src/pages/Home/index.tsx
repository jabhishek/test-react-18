import { Box, Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { useAllSecuritiesQuery } from '../../generated/graphql';
import { useMemo, useState } from 'react';
import { ColDef } from '@ag-grid-community/core';

import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { AnalyzeSecurity } from '../../components/AnalyzeSecurity';

import styles from '../../components/Grids/grids.module.css';

const Securities = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const { data, loading } = useAllSecuritiesQuery();

  const flattened = useMemo(
    () =>
      data?.allSecurities?.map((x) => {
        const status = x?.currentStatus?.[0];
        return {
          ...x,
          daysSinceEma200Increasing: status?.daysSinceEma200Increasing,
          daysSinceEma20Increasing: status?.daysSinceEma20Increasing,
          daysSinceEma50Increasing: status?.daysSinceEma50Increasing,
          portfolios: x?.portfolios?.map((x) => x?.pf?.name)?.join(','),
          watchlists: x?.watchlists?.map((x) => x?.name)?.join(','),
        };
      }),
    [data?.allSecurities],
  );

  const columnDefs: ColDef[] = [
    {
      field: 'symbol',
      resizable: true,
      cellClass: `${styles.flex}`,
    },
    {
      field: 'name',
      resizable: true,
      cellClass: `${styles.flex}`,
    },
    /*
    {
      field: 'liveQuote',
      resizable: true,
      cellRenderer: LiveQuoteCellRenderer,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
    },
*/
    {
      field: 'country',
      resizable: true,
      cellClass: `${styles.flex}`,
    },
    {
      field: 'portfolios',
      resizable: true,
      cellClass: `${styles.flex}`,
    },
    {
      field: 'watchlists',
      resizable: true,
      cellClass: `${styles.flex}`,
    },
    {
      field: 'daysSinceEma20Increasing',
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'daysSinceEma50Increasing',
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'daysSinceEma200Increasing',
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      filter: 'agNumberColumnFilter',
    },
  ];
  console.log('data', flattened, loading);

  return (
    <Box>
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
          rowData={flattened ?? []}
          domLayout={'autoHeight'}
          modules={AllCommunityModules}
          pagination={true}
          paginationPageSize={50}
          onRowClicked={({ data }) => {
            setSelectedSymbol(data?.symbol);
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

export default Securities;
