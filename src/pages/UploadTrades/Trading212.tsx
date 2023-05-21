import { AllSecuritiesQuery, AssetType, TransactionInput } from '../../generated/graphql';
import { formatDate } from '@pfmanager/utils';
import parse from 'date-fns/parse';
import { Option } from '../../models/Option';

export type I212Transaction = {
  Action:
    | 'Deposit'
    | 'Market buy'
    | 'Limit buy'
    | 'Market sell'
    | 'Limit sell'
    | 'Dividend (Bonus)'
    | 'Dividend (Ordinary)';
  Time: string;
  ISIN: string;
  Ticker: string;
  Name: string;
  'No. of shares': string;
  'Price / share': string;
  'Currency (Price / share)': string;
  'Exchange rate': string;
  'Total (GBP)': string;
  'Charge amount (GBP)': string;
  'Stamp duty reserve tax (GBP)': string;
  Notes: string;
  ID: string;
  'Currency conversion fee (GBP)': string;
};

export const getTransactions = (
  data: Array<I212Transaction>,
  allSecurities: AllSecuritiesQuery | undefined,
  selectedPortfolio: Array<Option> | undefined,
): Array<TransactionInput> => {
  const transactions: Array<TransactionInput> = [];

  data.forEach((x) => {
    const security = allSecurities?.allSecurities?.find((y) => y?.symbol === x?.Ticker);
    if (!security) {
      console.log(x?.Ticker);
    }

    const user = 'abhi2000@gmail.com';
    console.log('x?.Time', x?.Time);
    console.log(
      x?.Time?.substring(0, 10),
      formatDate(parse(x?.Time?.substring(0, 10), 'dd/MM/yyyy', new Date())),
    );
    const date = formatDate(parse(x?.Time?.substring(0, 10), 'dd/MM/yyyy', new Date()));

    if (x?.Action === 'Deposit') {
      const trx: TransactionInput = {
        user,
        date,
        amount: parseFloat(x?.['Total (GBP)']),
        trxType: 'cash-in',
        assetType: AssetType.Cash,
        pfId: selectedPortfolio?.[0]?.value as string,
        symbol: 'CASH',
        baseCurrency: 'GBP',
        sourceTradeId: x?.ID,
        comment: '',
      };

      transactions.push(trx);
    }
    if (x?.Action === 'Dividend (Bonus)' || x?.Action === 'Dividend (Ordinary)') {
      const trx: TransactionInput = {
        user,
        date,
        amount: parseFloat(x?.['Total (GBP)']),
        trxType: 'dividend',
        assetType: AssetType.Stock,
        pfId: selectedPortfolio?.[0]?.value as string,

        baseCurrency: 'GBP',
        sourceTradeId: x?.ID,
        comment: '',

        symbol: x?.Ticker,
      };

      transactions.push(trx);
    }

    const pricePerShare = x?.['Price / share'] ? parseFloat(x?.['Price / share']) : undefined;
    const tradeCurrency = x?.['Currency (Price / share)'];
    const tradeExchRate = x?.['Exchange rate'] ? parseFloat(x?.['Exchange rate']) : undefined;

    const effectivePrice =
      pricePerShare && tradeCurrency === 'GBX' ? pricePerShare / 100 : pricePerShare;
    const currency = tradeCurrency === 'GBX' ? 'GBP' : tradeCurrency;
    const exchangeRate = tradeCurrency === 'GBX' ? 1 : tradeExchRate;

    if (x?.Action === 'Market buy' || x?.Action === 'Limit buy') {
      const trx: TransactionInput = {
        user,
        date,
        amount: -1 * parseFloat(x?.['Total (GBP)']),
        trxType: 'buy',
        assetType: AssetType.Stock,
        pfId: selectedPortfolio?.[0]?.value as string,

        baseCurrency: 'GBP',
        sourceTradeId: x?.ID,
        comment: '',

        symbol: x?.Ticker,
        qty: x?.['No. of shares'] ? parseFloat(x?.['No. of shares']) : undefined,

        currency: currency,
        exchangeRate: exchangeRate,
        price: effectivePrice,
      };

      transactions.push(trx);
    }
    if (x?.Action === 'Market sell' || x?.Action === 'Limit sell') {
      const trx: TransactionInput = {
        user,
        date,
        amount: parseFloat(x?.['Total (GBP)']),
        trxType: 'sell',
        assetType: AssetType.Stock,
        pfId: selectedPortfolio?.[0]?.value as string,

        baseCurrency: 'GBP',
        sourceTradeId: x?.ID,
        comment: '',

        symbol: x?.Ticker,
        qty: x?.['No. of shares'] ? parseFloat(x?.['No. of shares']) : undefined,

        currency,
        exchangeRate,
        price: effectivePrice,
      };

      transactions.push(trx);
    }
  });

  return transactions;
};
