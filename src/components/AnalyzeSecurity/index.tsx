import { useParams } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import {
  AnalyzeStrategyForStockNewQuery,
  useAnalyzeStrategyForStockNewQuery,
} from '../../generated/graphql';
import React, { useMemo } from 'react';
import { PointOptionsObject, RangeSelectorButtonsOptions, SeriesOptionsType } from 'highcharts';
import Highcharts from 'highcharts/highstock';
import Indicators from 'highcharts/indicators/indicators-all';
import annotationsAdvanced from 'highcharts/modules/annotations-advanced';
import fullScreen from 'highcharts/modules/full-screen';
import priceIndicator from 'highcharts/modules/price-indicator';
import StockTools from 'highcharts/modules/stock-tools';
import HighchartsReact from 'highcharts-react-official';

Indicators(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);
StockTools(Highcharts);

const getRangeSelector = (): Array<RangeSelectorButtonsOptions> => {
  return [
    {
      type: 'month',
      count: 1,
      text: '1m',
    },
    {
      type: 'month',
      count: 3,
      text: '3m',
    },
    {
      type: 'month',
      count: 6,
      text: '6m',
    },
    {
      type: 'year',
      count: 1,
      text: '1y',
    },
    {
      type: 'year',
      count: 2,
      text: '2y',
    },
    {
      type: 'year',
      text: '5y',
      count: 5,
    },
    {
      type: 'all',
      text: 'All',
    },
  ];
};

export const AnalyzeSecurity = ({ symbol }: { symbol: string }) => {
  const { data, loading } = useAnalyzeStrategyForStockNewQuery({
    variables: {
      symbol,
    },
  });

  console.log('data, loading', data, loading);
  const seriesData = useMemo(() => {
    const quotesCandles: Array<Array<number>> = [];
    const volumeData: Array<Array<number>> = [];

    const atrStopSeries: Array<Array<number>> = [];

    data?.analyzeStrategyForStockNew?.quotes?.forEach((d) => {
      const date = d?.date as string;
      const open = d?.open as number;
      const high = d?.high ?? 0;
      const low = d?.low ?? 0;
      const close = d?.close ?? 0;
      quotesCandles.push([Date.parse(date), open, high, low, close]);
      if (d?.atrTrade?.stopLoss) {
        atrStopSeries.push([Date.parse(date), d.atrTrade.stopLoss]);
      }
    });

    return {
      quotesCandles,
      volumeData,
      atrStopSeries,
    };
  }, [data?.analyzeStrategyForStockNew?.quotes]);

  const options: Highcharts.Options = useMemo<Highcharts.Options>(() => {
    const { quotesCandles, volumeData, atrStopSeries } = seriesData;

    const emaSeries: Array<SeriesOptionsType> = [500, 200].map((period) => {
      return {
        id: `ema${period}`,
        type: 'ema',
        linkedTo: 'candlestick',
        params: {
          period,
        },
      };
    });

    const trades = data?.analyzeStrategyForStockNew?.trades;
    const flags: Array<PointOptionsObject> =
      [...(trades ?? [])]
        ?.sort((a, b) => {
          const dateA = a?.date ?? '';
          const dateB = b?.date ?? '';
          return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
        })
        .map(
          (
            trade: NonNullable<
              NonNullable<AnalyzeStrategyForStockNewQuery['analyzeStrategyForStockNew']>['trades']
            >[number],
          ) => {
            const isBuyEvent = trade?.type === 'buy';
            const isSellEvent = trade?.type === 'sell';
            const color = isBuyEvent || isSellEvent ? 'red' : 'white';

            const tradeDate = trade?.date as string;
            return {
              id: tradeDate,
              x: Date.parse(tradeDate),
              title: isBuyEvent ? 'B' : isSellEvent ? 'S' : 'N',
              text: `${tradeDate}`,
              fillColor: color,
              value: Date.parse(tradeDate),
              style: {
                padding: 5,
              },
              width: 20,
            };
          },
        ) ?? [];

    return {
      chart: {
        height: '800px',
      },
      yAxis: [
        {
          height: '70%',
        },
        {
          top: '70%',
          height: '10%',
        },
        {
          top: '80%',
          height: '10%',
        },
        {
          top: '90%',
          height: '10%',
        },
      ],
      plotOptions: {
        turboThreshold: 100000,
        candlestick: {
          upColor: 'green',
          color: 'red',
        },
        ema: {
          marker: { enabled: false },
        },
        sma: {
          marker: { enabled: false },
        },
      },
      rangeSelector: {
        selected: 4,
        buttons: getRangeSelector(),
      },

      series: [
        {
          id: 'candlestick',
          name: 'Candlestick chart',
          type: 'candlestick',
          data: quotesCandles,
          yAxis: 0,
          dataGrouping: {
            enabled: false,
          },
        },

        {
          id: 'volume',
          type: 'column',
          yAxis: 1,
          showInLegend: true,
          data: volumeData,
        },
        {
          id: 'atrStop',
          name: 'ATR Stop',
          type: 'line',
          data: atrStopSeries,
          yAxis: 0,
          visible: true,
        },
        {
          id: 'flags',
          type: 'flags',
          data: [...flags],
          onSeries: 'candlestick',
          shape: 'squarepin',
          width: 16,
        },
        ...emaSeries,
      ],
    };
  }, [data?.analyzeStrategyForStockNew?.trades, seriesData]);

  return (
    <div>
      <Text fontSize="4xl">
        {data?.analyzeStrategyForStockNew?.trades?.[0]?.security?.name} (
        {data?.analyzeStrategyForStockNew?.trades?.[0]?.symbol})
      </Text>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        constructorType="stockChart"
        key={data?.analyzeStrategyForStockNew?.quotes?.length}
      />
    </div>
  );
};

const Analyze = () => {
  const x = useParams();

  console.log('x', x);

  const { data, loading } = useAnalyzeStrategyForStockNewQuery({
    variables: {
      symbol: x.id as string,
    },
  });

  console.log('data, loading', data, loading);

  return <div>{x.id ? <AnalyzeSecurity symbol={x.id} /> : null}</div>;
};

export default Analyze;
