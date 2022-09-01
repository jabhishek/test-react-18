import { AllCommunityModules } from '@ag-grid-community/all-modules';
import homeStyles from './home.module.css';
import { RowStyle } from '@ag-grid-community/core/dist/cjs/es5/entities/gridOptions';
import { AgGridReact } from '@ag-grid-community/react';
import { ColDef } from '@ag-grid-community/core';
import styles from '../../components/Grids/grids.module.css';
import { formatNumberWithComma, LiveQuoteCellRenderer } from '../../components/Grids/cellRenderers';
import { DatesRenderer, PriceRenderer, SecurityNameCellRenderer } from './Home';
import { GetAlgoTradesQuery } from '../../generated/graphql';
import { Dispatch, SetStateAction } from 'react';

export const TradeTriggers = ({
  triggers,
  setSelectedSymbol,
}: {
  triggers: GetAlgoTradesQuery['getAlgoTrades'];
  setSelectedSymbol: Dispatch<SetStateAction<string | null>>;
}) => {
  let activeTriggers = 0;

  const trades = [...(triggers ?? [])]
    ?.sort((a, b) => {
      const buyDateA = a?.date as string;
      const buyDateB = b?.date as string;
      return buyDateA > buyDateB ? 1 : -1;
    })
    ?.map((x) => {
      if (x?.type === 'buy') {
        activeTriggers = activeTriggers + 1;
      } else {
        activeTriggers = activeTriggers - 1;
      }
      return {
        ...x,
        activeTriggers,
      };
    })
    ?.filter((x) => x?.type === 'buy')

    ?.map((x) => {
      const diff = (x?.relatedTrade?.[0]?.close ?? 0) - (x?.close ?? 0);
      const profit = x?.type === 'buy' ? diff : -1 * diff;
      return {
        symbol: x?.symbol,
        type: x?.type,
        name: x?.security?.name,
        date: x?.type === 'buy' ? x?.date : x?.relatedTrade?.[0]?.date,
        close: x?.type === 'buy' ? x?.close : x?.relatedTrade?.[0]?.close,
        sellDate: x?.type === 'buy' ? x?.relatedTrade?.[0]?.date : x?.date,
        sellPrice: x?.type === 'buy' ? x?.relatedTrade?.[0]?.close : x?.close,
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
        activeTriggers: x?.activeTriggers,
      };
    })
    //?.filter((x) => x?.portfolios?.includes('Trades'))
    ?.sort((a, b) => {
      const buyDateA = (a?.type === 'buy' ? a?.date : a?.sellDate) as string;
      const buyDateB = (b?.type === 'buy' ? b?.date : b?.sellDate) as string;
      return buyDateA > buyDateB ? -1 : 1;
    });

  const winTrades = trades?.filter((x) => x?.profitLossP && x?.profitLossP > 0)?.length;
  const lossTrades = trades?.filter((x) => !x?.isProfit)?.length;

  console.log('winTrades', winTrades);
  console.log('lossTrades', lossTrades);

  const triggerColumnDefs: ColDef[] = [
    {
      field: 'symbol',
      resizable: true,
      cellClass: `${styles.flex}`,
      cellRenderer: SecurityNameCellRenderer,
      width: 300,
    },
    {
      headerName: 'Buy/Sell date',
      field: 'date',
      resizable: true,
      cellClass: `${styles.flex}`,
      cellRenderer: DatesRenderer,
      width: 150,
    },
    {
      headerName: 'Profit / loss',
      field: 'profitLossP',
      resizable: true,
      width: 150,
      cellClass: `${styles.flex}`,
      valueFormatter: ({ value }) => {
        return value ? `${formatNumberWithComma(value, 2)}%` : '';
      },
    },
    {
      headerName: 'Buy/Sell price',
      field: 'close',
      resizable: true,
      width: 150,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      cellRenderer: PriceRenderer,
    },

    {
      field: 'liveQuote',
      resizable: true,
      cellRenderer: LiveQuoteCellRenderer,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
    },
    {
      headerName: 'EMA Increase days',
      field: 'daysSinceEma200Increasing',
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      filter: 'agNumberColumnFilter',
      width: 150,
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
      field: 'country',
      resizable: true,
      cellClass: `${styles.flex}`,
      width: 150,
    },
    {
      field: 'activeTriggers',
      resizable: true,
      cellClass: `${styles.flex}`,
    },

    {
      headerName: 'Above EMA days',
      field: 'daysSinceAboveEma200',
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      filter: 'agNumberColumnFilter',
      width: 150,
    },
    {
      field: 'weightedATR',
      resizable: true,
      cellClass: `${styles.flex} ${styles.justifyRight}`,
      headerClass: `ag-right-aligned-header`,
      valueFormatter: ({ value }) => {
        return formatNumberWithComma(value, 2);
      },
      width: 100,
    },
  ];

  return (
    <div className="ag-theme-alpine">
      <AgGridReact
        rowHeight={50}
        className={''}
        columnDefs={triggerColumnDefs}
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
  );
};
