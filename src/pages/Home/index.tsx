import { Box, Button, Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { AllSecuritiesQuery, useAllSecuritiesQuery } from '../../generated/graphql';
import { useMemo, useRef, useState } from 'react';
import { ColDef } from '@ag-grid-community/core';

import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { AnalyzeSecurity } from '../../components/AnalyzeSecurity';

import styles from '../../components/Grids/grids.module.css';

const Securities = () => {
  const [selected, setSelected] = useState<Array<string>>([]);
  const gridRef = useRef<AgGridReact>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const { data, loading, refetch } = useAllSecuritiesQuery();

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
      checkboxSelection: true,
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
  console.log('selected', selected);

  return (
    <Box>
      <Box py={2} px={4}>
        <Button
          onClick={() => {
            const symbols = selected.join(',');
            fetch(`http://localhost:5001/api/security/${symbols}`, { method: 'DELETE' }).then(
              (x) => {
                x.json().then((y) => {
                  console.log('y', y);
                  refetch();
                });
              },
            );
          }}
          disabled={!selected?.length}>
          Delete
        </Button>
      </Box>
      <div className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
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
          rowSelection={'multiple'}
          suppressRowClickSelection={true}
          // onRowSelected={({data}) => {
          //     console.log('data', data);
          // }}
          onSelectionChanged={() => {
            const selectedRows: AllSecuritiesQuery['allSecurities'] =
              gridRef?.current?.api.getSelectedRows();
            console.log('selectedRows', selectedRows);

            setSelected(selectedRows?.map((x) => x?.symbol ?? '') ?? []);
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
