import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { StatementEntry, TransactionsAggregateQuery } from '../../../generated/graphql';
import { ColDef } from '@ag-grid-community/core';
import styles from '../../../components/Grids/grids.module.css';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { formatNumberWithComma } from '../../../components/Grids/cellRenderers';
import { useState } from 'react';
import { EditTransactionForm } from './EditTransactionForm';

export const StatementGrid = ({
  statements,
  refetchAggregate,
}: {
  refetchAggregate: () => void;
  statements:
    | NonNullable<TransactionsAggregateQuery['transactionsAggregate']>['statement']
    | undefined;
}) => {
  const [selectedTransaction, setSelectedTransaction] = useState<StatementEntry | null>(null);
  const columnDefs: ColDef[] = [
    {
      field: '_id',
      cellClass: `${styles.flex}`,
      hide: true,
    },
    {
      field: 'symbol',
      cellClass: `${styles.flex}`,
    },
    {
      field: 'date',
      cellClass: `${styles.flex}`,
    },
    {
      field: 'assetType',
      cellClass: `${styles.flex}`,
    },
    {
      field: 'trxType',
      cellClass: `${styles.flex}`,
    },
    {
      field: 'comment',
      cellClass: `${styles.flex}`,
    },
    {
      field: 'amount',
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      valueFormatter: ({ value }) => {
        return formatNumberWithComma(value);
      },
    },
    {
      field: 'balance',
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      valueFormatter: ({ value }) => {
        return formatNumberWithComma(value);
      },
    },
    {
      field: 'security.name',
      cellClass: `${styles.flex}`,
    },
    {
      field: 'portfolio.name',
      cellClass: `${styles.flex}`,
    },
  ];
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
          rowData={statements ?? []}
          domLayout={'autoHeight'}
          modules={AllCommunityModules}
          pagination={true}
          paginationPageSize={50}
          singleClickEdit={true}
          onRowClicked={({ data }) => {
            setSelectedTransaction(data);
          }}
        />
      </div>
      <Drawer
        isOpen={!!selectedTransaction}
        placement="right"
        onClose={() => setSelectedTransaction(null)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Transaction</DrawerHeader>

          <DrawerBody>
            <EditTransactionForm
              transaction={selectedTransaction as StatementEntry}
              onSave={() => {
                setSelectedTransaction(null);
                refetchAggregate();
              }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
