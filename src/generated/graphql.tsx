import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddSymbolToWatchlistInput = {
  symbol: Scalars['String'];
  watchlistId: Scalars['String'];
};

export type AddWatchlistInput = {
  name: Scalars['String'];
  user: Scalars['String'];
};

export enum AssetType {
  Cash = 'cash',
  Fund = 'fund',
  Stock = 'stock',
}

export type Cash = {
  __typename?: 'Cash';
  cashIn: Scalars['Float'];
  cashOut: Scalars['Float'];
  currentCash: Scalars['Float'];
};

export type DeleteWatchlistInput = {
  watchlistId: Scalars['String'];
};

export type Equity = Security & {
  __typename?: 'Equity';
  _id: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  currentStatus?: Maybe<Array<Maybe<ICurrentStatus>>>;
  exchange: Scalars['String'];
  isin?: Maybe<Scalars['String']>;
  lastEventUpdate?: Maybe<Scalars['String']>;
  lastQuoteUpdate?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  portfolios?: Maybe<Array<Maybe<SecurityPortfolio>>>;
  splits?: Maybe<Array<Maybe<Split>>>;
  symbol: Scalars['String'];
  type?: Maybe<Type>;
  watchlists?: Maybe<Array<Maybe<Watchlist>>>;
};

export type Fund = Security & {
  __typename?: 'Fund';
  _id: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  currentStatus?: Maybe<Array<Maybe<ICurrentStatus>>>;
  exchange: Scalars['String'];
  isin?: Maybe<Scalars['String']>;
  lastEventUpdate?: Maybe<Scalars['String']>;
  lastQuoteUpdate?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  portfolios?: Maybe<Array<Maybe<SecurityPortfolio>>>;
  symbol: Scalars['String'];
  type?: Maybe<Type>;
  watchlists?: Maybe<Array<Maybe<Watchlist>>>;
};

export type HistoricalPortfolioState = {
  __typename?: 'HistoricalPortfolioState';
  _id: Scalars['String'];
  buys?: Maybe<Scalars['Float']>;
  cash?: Maybe<Scalars['Float']>;
  cashIn?: Maybe<Scalars['Float']>;
  cashOut?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['String']>;
  dividends?: Maybe<Scalars['Float']>;
  equityHoldingsValue?: Maybe<Scalars['Float']>;
  fundHoldingsValue?: Maybe<Scalars['Float']>;
  netGain?: Maybe<Scalars['Float']>;
  portfolioIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  profitBooked?: Maybe<Scalars['Float']>;
  sells?: Maybe<Scalars['Float']>;
  version?: Maybe<Scalars['String']>;
  xirr?: Maybe<Scalars['Float']>;
};

export type IAroonStat = {
  __typename?: 'IAroonStat';
  down?: Maybe<Scalars['Float']>;
  lastCrossover?: Maybe<IAroonTrade>;
  strategyTrade?: Maybe<IAroonTrade>;
  up?: Maybe<Scalars['Float']>;
};

export type IAroonTrade = {
  __typename?: 'IAroonTrade';
  lastTradeDate?: Maybe<Scalars['String']>;
  lastTradePrice?: Maybe<Scalars['Float']>;
  type?: Maybe<TradeType>;
};

export type IAtrTrade = {
  __typename?: 'IAtrTrade';
  lastTradeDate?: Maybe<Scalars['String']>;
  lastTradePrice?: Maybe<Scalars['Float']>;
  risk?: Maybe<Scalars['Float']>;
  stopLoss?: Maybe<Scalars['Float']>;
  type?: Maybe<TradeType>;
};

export type ICurrentStatus = {
  __typename?: 'ICurrentStatus';
  aroon5?: Maybe<IAroonStat>;
  aroon5Crossover?: Maybe<IPossibleTrade>;
  aroon5Strategy?: Maybe<IPossibleTrade>;
  aroon20?: Maybe<IAroonStat>;
  aroon20Crossover?: Maybe<IPossibleTrade>;
  aroon20Strategy?: Maybe<IPossibleTrade>;
  aroon50?: Maybe<IAroonStat>;
  aroon50Crossover?: Maybe<IPossibleTrade>;
  aroon50Strategy?: Maybe<IPossibleTrade>;
  aroon200?: Maybe<IAroonStat>;
  aroon200Crossover?: Maybe<IPossibleTrade>;
  aroon200Strategy?: Maybe<IPossibleTrade>;
  atr?: Maybe<IAtrTrade>;
  atrRisk?: Maybe<Scalars['Float']>;
  close?: Maybe<Scalars['Float']>;
  donchian20?: Maybe<IDonchianStat>;
  donchian50?: Maybe<IDonchianStat>;
  donchian200?: Maybe<IDonchianStat>;
  emaAligned?: Maybe<IPossibleTrade>;
  interval?: Maybe<Interval>;
  symbol?: Maybe<Scalars['String']>;
};

export type IDonchianStat = {
  __typename?: 'IDonchianStat';
  donchianBreakoutsSinceTrade?: Maybe<Scalars['Float']>;
  high?: Maybe<Scalars['Float']>;
  lastDonchianBreakout?: Maybe<ITrade>;
  lastTrade?: Maybe<ITrade>;
  low?: Maybe<Scalars['Float']>;
  medium?: Maybe<Scalars['Float']>;
  range?: Maybe<Scalars['Float']>;
  risk?: Maybe<Scalars['Float']>;
};

export type IHistoricalEvent = {
  __typename?: 'IHistoricalEvent';
  _id?: Maybe<Scalars['String']>;
  close?: Maybe<Scalars['Float']>;
  currentPrice?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['String']>;
  interval?: Maybe<Scalars['String']>;
  security?: Maybe<Security>;
  symbol?: Maybe<Scalars['String']>;
  type?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IHistoricalQuoteEnhanced = {
  __typename?: 'IHistoricalQuoteEnhanced';
  actualClose?: Maybe<Scalars['Float']>;
  aroon5?: Maybe<IAroonStat>;
  aroon20?: Maybe<IAroonStat>;
  aroon50?: Maybe<IAroonStat>;
  aroon200?: Maybe<IAroonStat>;
  atr?: Maybe<Scalars['Float']>;
  atrTrade?: Maybe<IAtrTrade>;
  close?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['String']>;
  donchianLong?: Maybe<IDonchianStat>;
  donchianMid?: Maybe<IDonchianStat>;
  donchianShort?: Maybe<IDonchianStat>;
  ema20?: Maybe<Scalars['Float']>;
  ema50?: Maybe<Scalars['Float']>;
  ema100?: Maybe<Scalars['Float']>;
  ema200?: Maybe<Scalars['Float']>;
  high?: Maybe<Scalars['Float']>;
  low?: Maybe<Scalars['Float']>;
  open?: Maybe<Scalars['Float']>;
  splitFactor?: Maybe<Scalars['Float']>;
  volume?: Maybe<Scalars['Float']>;
};

export type IHistoricalQuoteEod = {
  __typename?: 'IHistoricalQuoteEod';
  actualClose?: Maybe<Scalars['Float']>;
  close?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['String']>;
  high?: Maybe<Scalars['Float']>;
  low?: Maybe<Scalars['Float']>;
  open?: Maybe<Scalars['Float']>;
  splitFactor?: Maybe<Scalars['Float']>;
  volume?: Maybe<Scalars['Float']>;
};

export type IPossibleTrade = {
  __typename?: 'IPossibleTrade';
  close?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['String']>;
  type?: Maybe<TradeType>;
};

export type IStrategyTrade = {
  __typename?: 'IStrategyTrade';
  close?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['String']>;
  relatedTrade?: Maybe<Array<Maybe<IStrategyTrade>>>;
  symbol?: Maybe<Scalars['String']>;
  type?: Maybe<TradeType>;
};

export type ITrade = {
  __typename?: 'ITrade';
  date?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  type?: Maybe<TradeType>;
};

export type Index = Security & {
  __typename?: 'Index';
  _id: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  currentStatus?: Maybe<Array<Maybe<ICurrentStatus>>>;
  exchange: Scalars['String'];
  isin?: Maybe<Scalars['String']>;
  lastEventUpdate?: Maybe<Scalars['String']>;
  lastQuoteUpdate?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  portfolios?: Maybe<Array<Maybe<SecurityPortfolio>>>;
  symbol: Scalars['String'];
  type?: Maybe<Type>;
  watchlists?: Maybe<Array<Maybe<Watchlist>>>;
};

export enum Interval {
  D = 'd',
  M = 'm',
  W = 'w',
}

export type Mutation = {
  __typename?: 'Mutation';
  addSecurity: Security;
  addStockSplit: Equity;
  addSymbolToWatchlist: Watchlist;
  addTransaction: Transaction;
  addWatchlist: Watchlist;
  deleteWatchlist?: Maybe<Array<Maybe<Watchlist>>>;
  removeSymbolFromWatchlist: Watchlist;
  syncCurrentStatusForAll?: Maybe<SuccessResponse>;
  syncCurrentStatusForStock?: Maybe<SuccessResponse>;
  syncHistoricalEventsForAll?: Maybe<SuccessResponse>;
  syncHistoricalEventsForStock?: Maybe<SuccessResponse>;
  syncHistoricalQuotes?: Maybe<SuccessResponse>;
  syncHistoricalQuotesForStock?: Maybe<SuccessResponse>;
  updateQuote?: Maybe<SuccessResponse>;
};

export type MutationAddSecurityArgs = {
  input: SecurityInput;
};

export type MutationAddStockSplitArgs = {
  input: StockSplitInput;
};

export type MutationAddSymbolToWatchlistArgs = {
  input: AddSymbolToWatchlistInput;
};

export type MutationAddTransactionArgs = {
  input: TransactionInput;
};

export type MutationAddWatchlistArgs = {
  input: AddWatchlistInput;
};

export type MutationDeleteWatchlistArgs = {
  input: DeleteWatchlistInput;
};

export type MutationRemoveSymbolFromWatchlistArgs = {
  input: RemoveSymbolFromWatchlistInput;
};

export type MutationSyncCurrentStatusForStockArgs = {
  symbol: Scalars['String'];
};

export type MutationSyncHistoricalEventsForStockArgs = {
  symbol: Scalars['String'];
};

export type MutationSyncHistoricalQuotesForStockArgs = {
  clearBeforeSync?: InputMaybe<Scalars['Boolean']>;
  symbol: Scalars['String'];
};

export type MutationUpdateQuoteArgs = {
  close?: InputMaybe<Scalars['Float']>;
  date: Scalars['String'];
  high?: InputMaybe<Scalars['Float']>;
  low?: InputMaybe<Scalars['Float']>;
  open?: InputMaybe<Scalars['Float']>;
  symbol: Scalars['String'];
};

export type Portfolio = {
  __typename?: 'Portfolio';
  _id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  symbols?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Query = {
  __typename?: 'Query';
  allSecurities?: Maybe<Array<Maybe<Security>>>;
  allWatchlists?: Maybe<Array<Maybe<Watchlist>>>;
  analyzeStrategy?: Maybe<Array<Maybe<IStrategyTrade>>>;
  analyzeStrategyForStock?: Maybe<Array<Maybe<IStrategyTrade>>>;
  analyzeStrategyForStockNew?: Maybe<Array<Maybe<IStrategyTrade>>>;
  analyzeStrategyNew?: Maybe<Array<Maybe<IStrategyTrade>>>;
  checkConnection?: Maybe<TestResponse>;
  deleteHistoricalEvents?: Maybe<SuccessResponse>;
  deleteHistoricalQuotes?: Maybe<SuccessResponse>;
  deleteHistoricalQuotesForStock?: Maybe<SuccessResponse>;
  deleteSecurity?: Maybe<SuccessResponse>;
  evaluateTechDataForStock?: Maybe<Array<Maybe<IHistoricalQuoteEnhanced>>>;
  extractQuotes?: Maybe<SuccessResponse>;
  getAlgoTrades?: Maybe<Array<Maybe<IStrategyTrade>>>;
  getHistoricalEvents?: Maybe<Array<Maybe<IHistoricalEvent>>>;
  getHistoricalQuotesForStock?: Maybe<Array<Maybe<IHistoricalQuoteEod>>>;
  getPortfoliosForUsers?: Maybe<SuccessResponse>;
  portfolios?: Maybe<Array<Maybe<Portfolio>>>;
  renamePfId?: Maybe<SuccessResponse>;
  resetQuoteDate?: Maybe<SuccessResponse>;
  searchSecurity?: Maybe<Array<Maybe<SearchSecurity>>>;
  security?: Maybe<Security>;
  setHistoricalPortfolioStates?: Maybe<SuccessResponse>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
  transactionsAggregate?: Maybe<TrxAggregate>;
  updateTransactionSymbol?: Maybe<SuccessResponse>;
};

export type QueryAnalyzeStrategyForStockArgs = {
  remote?: InputMaybe<Scalars['Boolean']>;
  symbol: Scalars['String'];
};

export type QueryAnalyzeStrategyForStockNewArgs = {
  symbol: Scalars['String'];
};

export type QueryDeleteHistoricalEventsArgs = {
  interval?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
};

export type QueryDeleteHistoricalQuotesForStockArgs = {
  interval?: InputMaybe<Scalars['String']>;
  symbol: Scalars['String'];
};

export type QueryDeleteSecurityArgs = {
  symbol: Scalars['String'];
};

export type QueryEvaluateTechDataForStockArgs = {
  fromDb?: InputMaybe<Scalars['Boolean']>;
  interval?: InputMaybe<Scalars['String']>;
  symbol: Scalars['String'];
};

export type QueryExtractQuotesArgs = {
  legacySymbol?: InputMaybe<Scalars['String']>;
  newSymbol?: InputMaybe<Scalars['String']>;
};

export type QueryGetHistoricalEventsArgs = {
  eventTypes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  from?: InputMaybe<Scalars['String']>;
  interval?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
};

export type QueryGetHistoricalQuotesForStockArgs = {
  interval?: InputMaybe<Scalars['String']>;
  symbol: Scalars['String'];
};

export type QueryResetQuoteDateArgs = {
  date?: InputMaybe<Scalars['String']>;
};

export type QuerySearchSecurityArgs = {
  text?: InputMaybe<Scalars['String']>;
};

export type QuerySecurityArgs = {
  symbol: Scalars['String'];
};

export type QuerySetHistoricalPortfolioStatesArgs = {
  pfIds: Array<InputMaybe<Scalars['String']>>;
};

export type QueryTransactionsArgs = {
  assetType?: InputMaybe<Scalars['String']>;
  dateTo?: InputMaybe<Scalars['String']>;
  pfIds?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  transactionType?: InputMaybe<Scalars['String']>;
  transactionTypes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryTransactionsAggregateArgs = {
  assetType?: InputMaybe<Scalars['String']>;
  dateTo?: InputMaybe<Scalars['String']>;
  pfIds?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  transactionType?: InputMaybe<Scalars['String']>;
  transactionTypes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type QueryUpdateTransactionSymbolArgs = {
  newSymbol?: InputMaybe<Scalars['String']>;
  oldSymbol?: InputMaybe<Scalars['String']>;
};

export type RemoveSymbolFromWatchlistInput = {
  symbol: Scalars['String'];
  watchlistId: Scalars['String'];
};

export type SearchSecurity = {
  __typename?: 'SearchSecurity';
  Code: Scalars['String'];
  Country?: Maybe<Scalars['String']>;
  Currency?: Maybe<Scalars['String']>;
  Exchange: Scalars['String'];
  ISIN?: Maybe<Scalars['String']>;
  Name: Scalars['String'];
  Type?: Maybe<Scalars['String']>;
};

export type Security = {
  _id: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  currentStatus?: Maybe<Array<Maybe<ICurrentStatus>>>;
  exchange: Scalars['String'];
  isin?: Maybe<Scalars['String']>;
  lastEventUpdate?: Maybe<Scalars['String']>;
  lastQuoteUpdate?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  portfolios?: Maybe<Array<Maybe<SecurityPortfolio>>>;
  symbol: Scalars['String'];
  type?: Maybe<Type>;
  watchlists?: Maybe<Array<Maybe<Watchlist>>>;
};

export type SecurityInput = {
  Code: Scalars['String'];
  Country?: InputMaybe<Scalars['String']>;
  Currency?: InputMaybe<Scalars['String']>;
  Exchange: Scalars['String'];
  ISIN?: InputMaybe<Scalars['String']>;
  Name: Scalars['String'];
  Type?: InputMaybe<Scalars['String']>;
};

export type SecurityPortfolio = {
  __typename?: 'SecurityPortfolio';
  pf?: Maybe<Portfolio>;
  qty?: Maybe<Scalars['Float']>;
};

export type Split = {
  __typename?: 'Split';
  date?: Maybe<Scalars['String']>;
  splitCoefficient?: Maybe<Scalars['Float']>;
};

export type StatementEntry = {
  __typename?: 'StatementEntry';
  _id: Scalars['String'];
  amount: Scalars['Float'];
  assetType: AssetType;
  balance?: Maybe<Scalars['Float']>;
  brokerage?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
  date: Scalars['String'];
  pfId: Scalars['String'];
  portfolio?: Maybe<Portfolio>;
  price?: Maybe<Scalars['Float']>;
  qty?: Maybe<Scalars['Float']>;
  security?: Maybe<Security>;
  symbol: Scalars['String'];
  trxType: Scalars['String'];
  trxValue?: Maybe<Scalars['Float']>;
  user: Scalars['String'];
};

export type StockSplitInput = {
  date: Scalars['String'];
  splitCoefficient: Scalars['Float'];
  symbol: Scalars['String'];
};

export type StockTransactions = {
  __typename?: 'StockTransactions';
  assetType: Scalars['String'];
  costPrice?: Maybe<Scalars['Float']>;
  currentPnL?: Maybe<Scalars['Float']>;
  currentPrice?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['String']>;
  pfId: Scalars['String'];
  profitLossBooked?: Maybe<Scalars['Float']>;
  qty: Scalars['Float'];
  stock?: Maybe<Security>;
  symbol: Scalars['String'];
  transactions?: Maybe<Array<Maybe<Transaction>>>;
  valueAtCostPrice?: Maybe<Scalars['Float']>;
  valueAtCurrentPrice?: Maybe<Scalars['Float']>;
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  success?: Maybe<Scalars['Boolean']>;
};

export type TestResponse = {
  __typename?: 'TestResponse';
  count?: Maybe<Scalars['Float']>;
};

export enum TradeType {
  Buy = 'buy',
  Sell = 'sell',
}

export type Transaction = {
  __typename?: 'Transaction';
  _id: Scalars['String'];
  amount: Scalars['Float'];
  assetType: AssetType;
  brokerage?: Maybe<Scalars['Float']>;
  comment?: Maybe<Scalars['String']>;
  date: Scalars['String'];
  pfId: Scalars['String'];
  portfolio?: Maybe<Portfolio>;
  price?: Maybe<Scalars['Float']>;
  qty?: Maybe<Scalars['Float']>;
  symbol: Scalars['String'];
  trxType: Scalars['String'];
  trxValue?: Maybe<Scalars['Float']>;
  user: Scalars['String'];
};

export type TransactionInput = {
  amount?: InputMaybe<Scalars['Float']>;
  assetType: AssetType;
  brokerage?: InputMaybe<Scalars['Float']>;
  comment: Scalars['String'];
  date: Scalars['String'];
  pfId: Scalars['String'];
  price?: InputMaybe<Scalars['Float']>;
  qty?: InputMaybe<Scalars['Float']>;
  symbol: Scalars['String'];
  trxType: Scalars['String'];
  user: Scalars['String'];
};

export type TrxAggregate = {
  __typename?: 'TrxAggregate';
  cash: Cash;
  holdings?: Maybe<Array<Maybe<StockTransactions>>>;
  statement?: Maybe<Array<Maybe<StatementEntry>>>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};

export type TrxAggregateHoldingsArgs = {
  date?: InputMaybe<Scalars['String']>;
};

export enum Type {
  Equity = 'equity',
  Fund = 'fund',
  Index = 'index',
}

export type Watchlist = {
  __typename?: 'Watchlist';
  _id: Scalars['String'];
  name: Scalars['String'];
  securities?: Maybe<Array<Maybe<Security>>>;
  user: Scalars['String'];
};

export type WatchlistEntry = {
  __typename?: 'WatchlistEntry';
  symbol?: Maybe<Scalars['String']>;
};

export type PortfoliosQueryVariables = Exact<{ [key: string]: never }>;

export type PortfoliosQuery = {
  __typename?: 'Query';
  portfolios?: Array<{
    __typename?: 'Portfolio';
    _id?: string | null;
    name?: string | null;
  } | null> | null;
};

export type TransactionsAggregateQueryVariables = Exact<{
  pfIds?: InputMaybe<Scalars['String']>;
  dateTo?: InputMaybe<Scalars['String']>;
}>;

export type TransactionsAggregateQuery = {
  __typename?: 'Query';
  transactionsAggregate?: {
    __typename?: 'TrxAggregate';
    statement?: Array<{
      __typename?: 'StatementEntry';
      _id: string;
      symbol: string;
      assetType: AssetType;
      trxType: string;
      date: string;
      amount: number;
      balance?: number | null;
      comment?: string | null;
      portfolio?: { __typename?: 'Portfolio'; _id?: string | null; name?: string | null } | null;
      security?:
        | { __typename?: 'Equity'; name: string }
        | { __typename?: 'Fund'; name: string }
        | { __typename?: 'Index'; name: string }
        | null;
    } | null> | null;
    holdings?: Array<{
      __typename?: 'StockTransactions';
      symbol: string;
      assetType: string;
      qty: number;
      costPrice?: number | null;
      profitLossBooked?: number | null;
      valueAtCostPrice?: number | null;
      currentPrice?: number | null;
      valueAtCurrentPrice?: number | null;
      date?: string | null;
      currentPnL?: number | null;
      stock?:
        | {
            __typename?: 'Equity';
            name: string;
            currentStatus?: Array<{
              __typename?: 'ICurrentStatus';
              interval?: Interval | null;
              aroon20Strategy?: { __typename?: 'IPossibleTrade'; type?: TradeType | null } | null;
              aroon200Strategy?: { __typename?: 'IPossibleTrade'; type?: TradeType | null } | null;
              aroon50Strategy?: { __typename?: 'IPossibleTrade'; type?: TradeType | null } | null;
            } | null> | null;
            watchlists?: Array<{ __typename?: 'Watchlist'; name: string } | null> | null;
          }
        | {
            __typename?: 'Fund';
            name: string;
            currentStatus?: Array<{
              __typename?: 'ICurrentStatus';
              interval?: Interval | null;
              aroon20Strategy?: { __typename?: 'IPossibleTrade'; type?: TradeType | null } | null;
              aroon200Strategy?: { __typename?: 'IPossibleTrade'; type?: TradeType | null } | null;
              aroon50Strategy?: { __typename?: 'IPossibleTrade'; type?: TradeType | null } | null;
            } | null> | null;
            watchlists?: Array<{ __typename?: 'Watchlist'; name: string } | null> | null;
          }
        | {
            __typename?: 'Index';
            name: string;
            currentStatus?: Array<{
              __typename?: 'ICurrentStatus';
              interval?: Interval | null;
              aroon20Strategy?: { __typename?: 'IPossibleTrade'; type?: TradeType | null } | null;
              aroon200Strategy?: { __typename?: 'IPossibleTrade'; type?: TradeType | null } | null;
              aroon50Strategy?: { __typename?: 'IPossibleTrade'; type?: TradeType | null } | null;
            } | null> | null;
            watchlists?: Array<{ __typename?: 'Watchlist'; name: string } | null> | null;
          }
        | null;
    } | null> | null;
    cash: { __typename?: 'Cash'; cashIn: number; cashOut: number; currentCash: number };
  } | null;
  cashTransactions?: Array<{
    __typename?: 'Transaction';
    _id: string;
    date: string;
    amount: number;
    trxType: string;
  } | null> | null;
};

export const PortfoliosDocument = gql`
  query Portfolios {
    portfolios {
      _id
      name
    }
  }
`;

/**
 * __usePortfoliosQuery__
 *
 * To run a query within a React component, call `usePortfoliosQuery` and pass it any options that fit your needs.
 * When your component renders, `usePortfoliosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortfoliosQuery({
 *   variables: {
 *   },
 * });
 */
export function usePortfoliosQuery(
  baseOptions?: Apollo.QueryHookOptions<PortfoliosQuery, PortfoliosQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PortfoliosQuery, PortfoliosQueryVariables>(PortfoliosDocument, options);
}

export function usePortfoliosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PortfoliosQuery, PortfoliosQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PortfoliosQuery, PortfoliosQueryVariables>(
    PortfoliosDocument,
    options,
  );
}

export type PortfoliosQueryHookResult = ReturnType<typeof usePortfoliosQuery>;
export type PortfoliosLazyQueryHookResult = ReturnType<typeof usePortfoliosLazyQuery>;
export type PortfoliosQueryResult = Apollo.QueryResult<PortfoliosQuery, PortfoliosQueryVariables>;
export const TransactionsAggregateDocument = gql`
  query TransactionsAggregate($pfIds: String, $dateTo: String) {
    transactionsAggregate(pfIds: $pfIds) {
      statement {
        _id
        symbol
        assetType
        trxType
        date
        amount
        balance
        comment
        portfolio {
          _id
          name
        }
        security {
          name
        }
      }
      holdings {
        symbol
        assetType
        qty
        costPrice
        profitLossBooked
        valueAtCostPrice
        currentPrice
        valueAtCurrentPrice
        date
        currentPnL
        stock {
          name
          currentStatus {
            interval
            aroon20Strategy {
              type
            }
            aroon200Strategy {
              type
            }
            aroon50Strategy {
              type
            }
          }
          watchlists {
            name
          }
        }
      }
      cash {
        cashIn
        cashOut
        currentCash
      }
    }
    cashTransactions: transactions(symbol: "CASH", pfIds: $pfIds, dateTo: $dateTo) {
      _id
      date
      amount
      trxType
    }
  }
`;

/**
 * __useTransactionsAggregateQuery__
 *
 * To run a query within a React component, call `useTransactionsAggregateQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsAggregateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsAggregateQuery({
 *   variables: {
 *      pfIds: // value for 'pfIds'
 *      dateTo: // value for 'dateTo'
 *   },
 * });
 */
export function useTransactionsAggregateQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TransactionsAggregateQuery,
    TransactionsAggregateQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TransactionsAggregateQuery, TransactionsAggregateQueryVariables>(
    TransactionsAggregateDocument,
    options,
  );
}

export function useTransactionsAggregateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TransactionsAggregateQuery,
    TransactionsAggregateQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TransactionsAggregateQuery, TransactionsAggregateQueryVariables>(
    TransactionsAggregateDocument,
    options,
  );
}

export type TransactionsAggregateQueryHookResult = ReturnType<typeof useTransactionsAggregateQuery>;
export type TransactionsAggregateLazyQueryHookResult = ReturnType<
  typeof useTransactionsAggregateLazyQuery
>;
export type TransactionsAggregateQueryResult = Apollo.QueryResult<
  TransactionsAggregateQuery,
  TransactionsAggregateQueryVariables
>;
