import { XIRR, formatDate } from '@pfmanager/utils';
import { GetAlgoTradesQuery, GetLatestQuoteQuery } from '../../generated/graphql';
import pLimit from 'p-limit';

const SEED_MONEY = 0;
const BROKERAGE = 0.0;
const trxAmount = 100;
const maxTrades = 1000;
export type IBackTestTrade = {
  symbol: string;
  date: string;
  qty: number;
  price: number;
  amount: number;
  balanceAmount: number;
  activeTrades: number;
  //quote: IHistoricalQuoteEnhanced;
  sellTrade?: {
    date: string;
    qty: number;
    price: number;
    amount: number;
    balanceAmount: number;
    activeTrades: number;
    //quote: IHistoricalQuoteEnhanced;
  };

  currentValue?: number;
  profitP?: number;
  profitAmount?: number;
  totalProfit?: number;
};

const values: number[] = [];
const dates: string[] = [];

export const backTest = async (
  triggers: GetAlgoTradesQuery['getAlgoTrades'],
  getQuote: (symbol: string) => Promise<GetLatestQuoteQuery | undefined>,
): Promise<{
  backTestTrades: Array<IBackTestTrade>;
  holdingsValue: number;
  balanceAmount: number;
  xirr: number;
}> => {
  let allTrades: Array<IBackTestTrade> = [];
  // let activeTrades: Array<IBackTestTrade> = [];
  let portfolioAmount = SEED_MONEY;
  let activeTradeCount = 0;
  //let closedTradeCount = 0;
  let totalProfit = 0;

  triggers?.forEach((t: NonNullable<GetAlgoTradesQuery['getAlgoTrades']>[number]) => {
    const { type, close, symbol, date } = t ?? {};
    if (symbol && date && close && type) {
      if (type === 'buy' && activeTradeCount < maxTrades) {
        const price = (close ?? 0) * (1 + BROKERAGE);
        const qty = trxAmount / price;

        values.push(-1 * trxAmount);
        dates.push(date);

        activeTradeCount++;

        const trade: IBackTestTrade = {
          symbol,
          price,
          qty,
          amount: trxAmount,
          date,
          balanceAmount: 0,
          activeTrades: activeTradeCount,
          totalProfit,
        };
        allTrades.push(trade);
      }

      if (type === 'sell') {
        const matchedTrade = allTrades.find(
          (x) => x.symbol === symbol && typeof x.sellTrade === 'undefined',
        );

        if (matchedTrade) {
          const { qty, amount } = matchedTrade;

          const price = close * (1 - BROKERAGE);
          const trxValue = price * qty;

          values.push(trxValue);
          dates.push(date);

          const profitAmount = trxValue - amount;
          const profitP = Math.round((profitAmount / amount) * 100);

          //closedTradeCount++;
          activeTradeCount--;
          totalProfit = totalProfit + profitAmount;
          /*

          console.log(
            'totalProfit',
            totalProfit,
            activeTradeCount,
            (totalProfit + SEED_MONEY) * RISK_PERCENT,
          );
  */

          allTrades = allTrades.map((trade: IBackTestTrade): IBackTestTrade => {
            if (trade.symbol === symbol && !trade.sellTrade) {
              return {
                ...trade,
                sellTrade: {
                  qty,
                  amount: trxValue,
                  balanceAmount: 0,
                  date,
                  price,
                  activeTrades: activeTradeCount,
                },
                profitP,
                profitAmount,
                totalProfit,
              };
            }
            return trade;
          });
        }
      }
    }
  });

  const symbolsWithActiveTrades = allTrades.filter((x) => !x.sellTrade).map((x) => x.symbol);

  const limit = pLimit(1);

  console.log('fetching quotes');
  const quotePromises = symbolsWithActiveTrades.map((x) => {
    return limit(async () => {
      const q = await getQuote(x);
      return {
        symbol: x,
        close: q?.getLatestQuote?.close,
      };
    });
  });
  const quotes = await Promise.all(quotePromises);

  console.log('quotes fetched');

  let holdingsValue = 0;

  const enhancedTrades = allTrades.map((t) => {
    if (!t.sellTrade) {
      const latestPrice = quotes.find((x) => x?.symbol === t.symbol)?.close ?? 0;
      const currentValue = t.qty * latestPrice;

      holdingsValue = holdingsValue + currentValue;
      return {
        ...t,
        currentValue: currentValue,
      };
    }

    return t;
  });

  const pfValue = holdingsValue;
  console.log('pfValue', pfValue);

  values.push(pfValue);
  dates.push(formatDate(new Date(), 'yyyy-MM-dd'));

  console.log('allTrades', allTrades);

  console.log('dates', dates);
  console.log('values', values);

  let xirr = 0;
  try {
    xirr = XIRR(values, dates, 0.00000000000001);
    console.log('xirr', xirr);
  } catch (err) {
    console.log('error', err);
  }

  return { backTestTrades: allTrades, holdingsValue, balanceAmount: 0, xirr };
};
