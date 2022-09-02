import { Box } from '@chakra-ui/react';
import { TransactionsAggregateQuery } from '../../generated/graphql';
import { ColDef } from '@ag-grid-community/core';
import styles from '../../components/Grids/grids.module.css';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { formatNumberWithComma } from '../../components/Grids/cellRenderers';

export const StatementGrid = ({
  statements,
}: {
  statements:
    | NonNullable<TransactionsAggregateQuery['transactionsAggregate']>['statement']
    | undefined;
}) => {
  const columnDefs: ColDef[] = [
    {
      field: '_id',
      cellClass: `${styles.flex}`,
    },
    {
      field: 'symbol',
      cellClass: `${styles.flex}`,
    },
    {
      field: 'security.name',
      cellClass: `${styles.flex}`,
    },
    {
      field: 'portfolio.name',
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
        />
      </div>
    </Box>
  );
};
