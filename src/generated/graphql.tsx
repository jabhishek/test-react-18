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

export type AddPortfolioInput = {
  name: Scalars['String'];
  user: Scalars['String'];
};

export type AddSymbolToWatchlistInput = {
  symbol: Scalars['String'];
  watchlistId: Scalars['String'];
};

export type AddWatchlistInput = {
  name: Scalars['String'];
  user: Scalars['String'];
};

export type AnalyzeResponse = {
  __typename?: 'AnalyzeResponse';
  quotes?: Maybe<Array<Maybe<IHistoricalQuoteEnhanced>>>;
  trades?: Maybe<Array<Maybe<IStrategyTrade>>>;
};

export enum AssetType {
  Cash = 'cash',
  Fund = 'fund',
  Stock = 'stock'
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

export type EditTransactionInput = {
  _id: Scalars['String'];
  date: Scalars['String'];
};

export type EditTransactionResponse = {
  __typename?: 'EditTransactionResponse';
  _id?: Maybe<Scalars['String']>;
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

export type IAdx = {
  __typename?: 'IAdx';
  adx?: Maybe<Scalars['Float']>;
  minusDI?: Maybe<Scalars['Float']>;
  plusDI?: Maybe<Scalars['Float']>;
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
  daysSinceAboveEma200?: Maybe<Scalars['Int']>;
  daysSinceEma20Increasing?: Maybe<Scalars['Int']>;
  daysSinceEma50Increasing?: Maybe<Scalars['Int']>;
  daysSinceEma200Increasing?: Maybe<Scalars['Int']>;
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
  adxShort?: Maybe<IAdx>;
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

export type ILiveQuoteEod = {
  __typename?: 'ILiveQuoteEod';
  change?: Maybe<Scalars['Float']>;
  change_p?: Maybe<Scalars['Float']>;
  close?: Maybe<Scalars['Float']>;
  high?: Maybe<Scalars['Float']>;
  low?: Maybe<Scalars['Float']>;
  open?: Maybe<Scalars['Float']>;
  previousClose?: Maybe<Scalars['Float']>;
  timestamp?: Maybe<Scalars['Float']>;
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
  atr?: Maybe<Scalars['Float']>;
  close?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['String']>;
  daysSinceAboveEma200?: Maybe<Scalars['Int']>;
  daysSinceEma200Increasing?: Maybe<Scalars['Int']>;
  hasAnomaly?: Maybe<Scalars['Boolean']>;
  relatedTrade?: Maybe<Array<Maybe<IStrategyTrade>>>;
  risk?: Maybe<Scalars['Float']>;
  security?: Maybe<Security>;
  symbol?: Maybe<Scalars['String']>;
  type?: Maybe<TradeType>;
  weightedATR?: Maybe<Scalars['Float']>;
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
  W = 'w'
}

export type Mutation = {
  __typename?: 'Mutation';
  addPortfolio: SuccessResponse;
  addSecurity: Security;
  addStockSplit: Equity;
  addSymbolToWatchlist: Watchlist;
  addTransaction: Transaction;
  addTransactions: SuccessResponse;
  addWatchlist: Watchlist;
  deleteWatchlist?: Maybe<Array<Maybe<Watchlist>>>;
  editTransaction?: Maybe<EditTransactionResponse>;
  removeSymbolFromWatchlist: Watchlist;
  syncCurrentStatusForAll?: Maybe<SuccessResponse>;
  syncCurrentStatusForStock?: Maybe<SuccessResponse>;
  syncHistoricalEventsForAll?: Maybe<SuccessResponse>;
  syncHistoricalEventsForStock?: Maybe<SuccessResponse>;
  syncHistoricalQuotes?: Maybe<SuccessResponse>;
  syncHistoricalQuotesForStock?: Maybe<SuccessResponse>;
  updateQuote?: Maybe<SuccessResponse>;
};


export type MutationAddPortfolioArgs = {
  input: AddPortfolioInput;
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


export type MutationAddTransactionsArgs = {
  input: Array<InputMaybe<TransactionInput>>;
};


export type MutationAddWatchlistArgs = {
  input: AddWatchlistInput;
};


export type MutationDeleteWatchlistArgs = {
  input: DeleteWatchlistInput;
};


export type MutationEditTransactionArgs = {
  input: EditTransactionInput;
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
  analyzeStrategyForStockNew?: Maybe<AnalyzeResponse>;
  analyzeStrategyNew?: Maybe<Array<Maybe<IStrategyTrade>>>;
  checkConnection?: Maybe<TestResponse>;
  clearAlgoTrades?: Maybe<Array<Maybe<SuccessResponse>>>;
  deleteHistoricalEvents?: Maybe<SuccessResponse>;
  deleteHistoricalQuotes?: Maybe<SuccessResponse>;
  deleteHistoricalQuotesForStock?: Maybe<SuccessResponse>;
  deleteSecurity?: Maybe<SuccessResponse>;
  evaluateTechDataForStock?: Maybe<Array<Maybe<IHistoricalQuoteEnhanced>>>;
  extractQuotes?: Maybe<SuccessResponse>;
  getAlgoTrades?: Maybe<Array<Maybe<IStrategyTrade>>>;
  getHistoricalEvents?: Maybe<Array<Maybe<IHistoricalEvent>>>;
  getHistoricalQuotesForStock?: Maybe<Array<Maybe<IHistoricalQuoteEod>>>;
  getLatestQuote?: Maybe<IHistoricalQuoteEod>;
  getPortfoliosForUsers?: Maybe<SuccessResponse>;
  liveQuote?: Maybe<ILiveQuoteEod>;
  portfolios?: Maybe<Array<Maybe<Portfolio>>>;
  renamePfId?: Maybe<SuccessResponse>;
  resetQuoteDate?: Maybe<SuccessResponse>;
  searchSecurity?: Maybe<Array<Maybe<SearchSecurity>>>;
  security?: Maybe<Security>;
  setHistoricalPortfolioStates?: Maybe<SuccessResponse>;
  transactions: Array<Maybe<Transaction>>;
  transactionsAggregate: TrxAggregate;
  updateTransactionSymbol?: Maybe<SuccessResponse>;
};


export type QueryAnalyzeStrategyForStockNewArgs = {
  symbol: Scalars['String'];
};


export type QueryAnalyzeStrategyNewArgs = {
  fromIndex?: InputMaybe<Scalars['Int']>;
  toIndex?: InputMaybe<Scalars['Int']>;
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


export type QueryGetAlgoTradesArgs = {
  symbol?: InputMaybe<Scalars['String']>;
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


export type QueryGetLatestQuoteArgs = {
  symbol?: InputMaybe<Scalars['String']>;
};


export type QueryLiveQuoteArgs = {
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
  Sell = 'sell'
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
  holdings: Array<Maybe<StockTransactions>>;
  statement: Array<Maybe<StatementEntry>>;
  transactions: Array<Maybe<Transaction>>;
};


export type TrxAggregateHoldingsArgs = {
  date?: InputMaybe<Scalars['String']>;
};

export enum Type {
  Equity = 'equity',
  Fund = 'fund',
  Index = 'index'
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

export type AnalyzeStrategyForStockNewQueryVariables = Exact<{
  symbol: Scalars['String'];
}>;


export type AnalyzeStrategyForStockNewQuery = { __typename?: 'Query', analyzeStrategyForStockNew?: { __typename?: 'AnalyzeResponse', trades?: Array<{ __typename?: 'IStrategyTrade', symbol?: string | null, type?: TradeType | null, date?: string | null, close?: number | null, risk?: number | null, relatedTrade?: Array<{ __typename?: 'IStrategyTrade', type?: TradeType | null, close?: number | null, date?: string | null, symbol?: string | null } | null> | null, security?: { __typename?: 'Equity', country?: string | null, name: string, watchlists?: Array<{ __typename?: 'Watchlist', name: string } | null> | null, portfolios?: Array<{ __typename?: 'SecurityPortfolio', qty?: number | null, pf?: { __typename?: 'Portfolio', name?: string | null, symbols?: Array<string | null> | null } | null } | null> | null } | { __typename?: 'Fund', country?: string | null, name: string, watchlists?: Array<{ __typename?: 'Watchlist', name: string } | null> | null, portfolios?: Array<{ __typename?: 'SecurityPortfolio', qty?: number | null, pf?: { __typename?: 'Portfolio', name?: string | null, symbols?: Array<string | null> | null } | null } | null> | null } | { __typename?: 'Index', country?: string | null, name: string, watchlists?: Array<{ __typename?: 'Watchlist', name: string } | null> | null, portfolios?: Array<{ __typename?: 'SecurityPortfolio', qty?: number | null, pf?: { __typename?: 'Portfolio', name?: string | null, symbols?: Array<string | null> | null } | null } | null> | null } | null } | null> | null, quotes?: Array<{ __typename?: 'IHistoricalQuoteEnhanced', date?: string | null, open?: number | null, high?: number | null, low?: number | null, close?: number | null, atrTrade?: { __typename?: 'IAtrTrade', stopLoss?: number | null } | null } | null> | null } | null };

export type GetAlgoTradesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAlgoTradesQuery = { __typename?: 'Query', getAlgoTrades?: Array<{ __typename?: 'IStrategyTrade', close?: number | null, date?: string | null, symbol?: string | null, type?: TradeType | null, daysSinceEma200Increasing?: number | null, daysSinceAboveEma200?: number | null, atr?: number | null, weightedATR?: number | null, hasAnomaly?: boolean | null, risk?: number | null, relatedTrade?: Array<{ __typename?: 'IStrategyTrade', type?: TradeType | null, date?: string | null, close?: number | null, symbol?: string | null } | null> | null, security?: { __typename?: 'Equity', country?: string | null, name: string, watchlists?: Array<{ __typename?: 'Watchlist', name: string } | null> | null, portfolios?: Array<{ __typename?: 'SecurityPortfolio', qty?: number | null, pf?: { __typename?: 'Portfolio', name?: string | null, symbols?: Array<string | null> | null } | null } | null> | null } | { __typename?: 'Fund', country?: string | null, name: string, watchlists?: Array<{ __typename?: 'Watchlist', name: string } | null> | null, portfolios?: Array<{ __typename?: 'SecurityPortfolio', qty?: number | null, pf?: { __typename?: 'Portfolio', name?: string | null, symbols?: Array<string | null> | null } | null } | null> | null } | { __typename?: 'Index', country?: string | null, name: string, watchlists?: Array<{ __typename?: 'Watchlist', name: string } | null> | null, portfolios?: Array<{ __typename?: 'SecurityPortfolio', qty?: number | null, pf?: { __typename?: 'Portfolio', name?: string | null, symbols?: Array<string | null> | null } | null } | null> | null } | null } | null> | null };

export type GetLatestQuoteQueryVariables = Exact<{
  symbol?: InputMaybe<Scalars['String']>;
}>;


export type GetLatestQuoteQuery = { __typename?: 'Query', getLatestQuote?: { __typename?: 'IHistoricalQuoteEod', close?: number | null } | null };

export type PortfoliosQueryVariables = Exact<{ [key: string]: never; }>;


export type PortfoliosQuery = { __typename?: 'Query', portfolios?: Array<{ __typename?: 'Portfolio', _id?: string | null, name?: string | null } | null> | null };

export type AllSecuritiesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSecuritiesQuery = { __typename?: 'Query', allSecurities?: Array<{ __typename?: 'Equity', symbol: string, name: string, country?: string | null, lastQuoteUpdate?: string | null, type?: Type | null, currentStatus?: Array<{ __typename?: 'ICurrentStatus', daysSinceEma200Increasing?: number | null, daysSinceEma50Increasing?: number | null, daysSinceEma20Increasing?: number | null, aroon200Strategy?: { __typename?: 'IPossibleTrade', type?: TradeType | null } | null } | null> | null, watchlists?: Array<{ __typename?: 'Watchlist', name: string } | null> | null, portfolios?: Array<{ __typename?: 'SecurityPortfolio', qty?: number | null, pf?: { __typename?: 'Portfolio', name?: string | null } | null } | null> | null } | { __typename?: 'Fund', symbol: string, name: string, country?: string | null, lastQuoteUpdate?: string | null, type?: Type | null, currentStatus?: Array<{ __typename?: 'ICurrentStatus', daysSinceEma200Increasing?: number | null, daysSinceEma50Increasing?: number | null, daysSinceEma20Increasing?: number | null, aroon200Strategy?: { __typename?: 'IPossibleTrade', type?: TradeType | null } | null } | null> | null, watchlists?: Array<{ __typename?: 'Watchlist', name: string } | null> | null, portfolios?: Array<{ __typename?: 'SecurityPortfolio', qty?: number | null, pf?: { __typename?: 'Portfolio', name?: string | null } | null } | null> | null } | { __typename?: 'Index', symbol: string, name: string, country?: string | null, lastQuoteUpdate?: string | null, type?: Type | null, currentStatus?: Array<{ __typename?: 'ICurrentStatus', daysSinceEma200Increasing?: number | null, daysSinceEma50Increasing?: number | null, daysSinceEma20Increasing?: number | null, aroon200Strategy?: { __typename?: 'IPossibleTrade', type?: TradeType | null } | null } | null> | null, watchlists?: Array<{ __typename?: 'Watchlist', name: string } | null> | null, portfolios?: Array<{ __typename?: 'SecurityPortfolio', qty?: number | null, pf?: { __typename?: 'Portfolio', name?: string | null } | null } | null> | null } | null> | null };

export type GetLiveQuoteQueryVariables = Exact<{
  symbol: Scalars['String'];
}>;


export type GetLiveQuoteQuery = { __typename?: 'Query', liveQuote?: { __typename?: 'ILiveQuoteEod', close?: number | null, previousClose?: number | null } | null };

export type TransactionsAggregateQueryVariables = Exact<{
  pfIds?: InputMaybe<Scalars['String']>;
  dateTo?: InputMaybe<Scalars['String']>;
}>;


export type TransactionsAggregateQuery = { __typename?: 'Query', transactionsAggregate: { __typename?: 'TrxAggregate', statement: Array<{ __typename?: 'StatementEntry', _id: string, symbol: string, assetType: AssetType, trxType: string, date: string, amount: number, balance?: number | null, comment?: string | null, qty?: number | null, portfolio?: { __typename?: 'Portfolio', _id?: string | null, name?: string | null } | null, security?: { __typename?: 'Equity', name: string } | { __typename?: 'Fund', name: string } | { __typename?: 'Index', name: string } | null } | null>, holdings: Array<{ __typename?: 'StockTransactions', symbol: string, assetType: string, qty: number, costPrice?: number | null, profitLossBooked?: number | null, valueAtCostPrice?: number | null, currentPrice?: number | null, valueAtCurrentPrice?: number | null, date?: string | null, currentPnL?: number | null, stock?: { __typename?: 'Equity', name: string, currentStatus?: Array<{ __typename?: 'ICurrentStatus', interval?: Interval | null, aroon20Strategy?: { __typename?: 'IPossibleTrade', type?: TradeType | null } | null, aroon200Strategy?: { __typename?: 'IPossibleTrade', type?: TradeType | null } | null, aroon50Strategy?: { __typename?: 'IPossibleTrade', type?: TradeType | null } | null } | null> | null, watchlists?: Array<{ __typename?: 'Watchlist', name: string } | null> | null } | { __typename?: 'Fund', name: string, currentStatus?: Array<{ __typename?: 'ICurrentStatus', interval?: Interval | null, aroon20Strategy?: { __typename?: 'IPossibleTrade', type?: TradeType | null } | null, aroon200Strategy?: { __typename?: 'IPossibleTrade', type?: TradeType | null } | null, aroon50Strategy?: { __typename?: 'IPossibleTrade', type?: TradeType | null } | null } | null> | null, watchlists?: Array<{ __typename?: 'Watchlist', name: string } | null> | null } | { __typename?: 'Index', name: string, currentStatus?: Array<{ __typename?: 'ICurrentStatus', interval?: Interval | null, aroon20Strategy?: { __typename?: 'IPossibleTrade', type?: TradeType | null } | null, aroon200Strategy?: { __typename?: 'IPossibleTrade', type?: TradeType | null } | null, aroon50Strategy?: { __typename?: 'IPossibleTrade', type?: TradeType | null } | null } | null> | null, watchlists?: Array<{ __typename?: 'Watchlist', name: string } | null> | null } | null } | null>, cash: { __typename?: 'Cash', cashIn: number, cashOut: number, currentCash: number } }, cashTransactions: Array<{ __typename?: 'Transaction', _id: string, date: string, amount: number, trxType: string } | null> };

export type AddTransactionMutationVariables = Exact<{
  input: TransactionInput;
}>;


export type AddTransactionMutation = { __typename?: 'Mutation', addTransaction: { __typename?: 'Transaction', _id: string, pfId: string, user: string, symbol: string, date: string, comment?: string | null, assetType: AssetType, trxType: string, amount: number, qty?: number | null, price?: number | null, brokerage?: number | null, trxValue?: number | null } };

export type AddTransactionsMutationVariables = Exact<{
  input: Array<InputMaybe<TransactionInput>> | InputMaybe<TransactionInput>;
}>;


export type AddTransactionsMutation = { __typename?: 'Mutation', addTransactions: { __typename?: 'SuccessResponse', success?: boolean | null } };

export type EditTransactionMutationVariables = Exact<{
  editTransactionInput2: EditTransactionInput;
}>;


export type EditTransactionMutation = { __typename?: 'Mutation', editTransaction?: { __typename?: 'EditTransactionResponse', _id?: string | null } | null };


export const AnalyzeStrategyForStockNewDocument = gql`
    query AnalyzeStrategyForStockNew($symbol: String!) {
  analyzeStrategyForStockNew(symbol: $symbol) {
    trades {
      symbol
      type
      date
      close
      risk
      relatedTrade {
        type
        close
        date
        symbol
      }
      security {
        country
        name
        watchlists {
          name
        }
        portfolios {
          pf {
            name
            symbols
          }
          qty
        }
      }
    }
    quotes {
      date
      open
      high
      low
      close
      atrTrade {
        stopLoss
      }
    }
  }
}
    `;

/**
 * __useAnalyzeStrategyForStockNewQuery__
 *
 * To run a query within a React component, call `useAnalyzeStrategyForStockNewQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnalyzeStrategyForStockNewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnalyzeStrategyForStockNewQuery({
 *   variables: {
 *      symbol: // value for 'symbol'
 *   },
 * });
 */
export function useAnalyzeStrategyForStockNewQuery(baseOptions: Apollo.QueryHookOptions<AnalyzeStrategyForStockNewQuery, AnalyzeStrategyForStockNewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnalyzeStrategyForStockNewQuery, AnalyzeStrategyForStockNewQueryVariables>(AnalyzeStrategyForStockNewDocument, options);
      }
export function useAnalyzeStrategyForStockNewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnalyzeStrategyForStockNewQuery, AnalyzeStrategyForStockNewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnalyzeStrategyForStockNewQuery, AnalyzeStrategyForStockNewQueryVariables>(AnalyzeStrategyForStockNewDocument, options);
        }
export type AnalyzeStrategyForStockNewQueryHookResult = ReturnType<typeof useAnalyzeStrategyForStockNewQuery>;
export type AnalyzeStrategyForStockNewLazyQueryHookResult = ReturnType<typeof useAnalyzeStrategyForStockNewLazyQuery>;
export type AnalyzeStrategyForStockNewQueryResult = Apollo.QueryResult<AnalyzeStrategyForStockNewQuery, AnalyzeStrategyForStockNewQueryVariables>;
export const GetAlgoTradesDocument = gql`
    query GetAlgoTrades {
  getAlgoTrades {
    close
    date
    symbol
    type
    daysSinceEma200Increasing
    daysSinceAboveEma200
    atr
    weightedATR
    hasAnomaly
    relatedTrade {
      type
      date
      close
      symbol
    }
    risk
    security {
      country
      name
      watchlists {
        name
      }
      portfolios {
        pf {
          name
          symbols
        }
        qty
      }
    }
  }
}
    `;

/**
 * __useGetAlgoTradesQuery__
 *
 * To run a query within a React component, call `useGetAlgoTradesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlgoTradesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlgoTradesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAlgoTradesQuery(baseOptions?: Apollo.QueryHookOptions<GetAlgoTradesQuery, GetAlgoTradesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAlgoTradesQuery, GetAlgoTradesQueryVariables>(GetAlgoTradesDocument, options);
      }
export function useGetAlgoTradesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlgoTradesQuery, GetAlgoTradesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAlgoTradesQuery, GetAlgoTradesQueryVariables>(GetAlgoTradesDocument, options);
        }
export type GetAlgoTradesQueryHookResult = ReturnType<typeof useGetAlgoTradesQuery>;
export type GetAlgoTradesLazyQueryHookResult = ReturnType<typeof useGetAlgoTradesLazyQuery>;
export type GetAlgoTradesQueryResult = Apollo.QueryResult<GetAlgoTradesQuery, GetAlgoTradesQueryVariables>;
export const GetLatestQuoteDocument = gql`
    query getLatestQuote($symbol: String) {
  getLatestQuote(symbol: $symbol) {
    close
  }
}
    `;

/**
 * __useGetLatestQuoteQuery__
 *
 * To run a query within a React component, call `useGetLatestQuoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestQuoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestQuoteQuery({
 *   variables: {
 *      symbol: // value for 'symbol'
 *   },
 * });
 */
export function useGetLatestQuoteQuery(baseOptions?: Apollo.QueryHookOptions<GetLatestQuoteQuery, GetLatestQuoteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLatestQuoteQuery, GetLatestQuoteQueryVariables>(GetLatestQuoteDocument, options);
      }
export function useGetLatestQuoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLatestQuoteQuery, GetLatestQuoteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLatestQuoteQuery, GetLatestQuoteQueryVariables>(GetLatestQuoteDocument, options);
        }
export type GetLatestQuoteQueryHookResult = ReturnType<typeof useGetLatestQuoteQuery>;
export type GetLatestQuoteLazyQueryHookResult = ReturnType<typeof useGetLatestQuoteLazyQuery>;
export type GetLatestQuoteQueryResult = Apollo.QueryResult<GetLatestQuoteQuery, GetLatestQuoteQueryVariables>;
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
export function usePortfoliosQuery(baseOptions?: Apollo.QueryHookOptions<PortfoliosQuery, PortfoliosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PortfoliosQuery, PortfoliosQueryVariables>(PortfoliosDocument, options);
      }
export function usePortfoliosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PortfoliosQuery, PortfoliosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PortfoliosQuery, PortfoliosQueryVariables>(PortfoliosDocument, options);
        }
export type PortfoliosQueryHookResult = ReturnType<typeof usePortfoliosQuery>;
export type PortfoliosLazyQueryHookResult = ReturnType<typeof usePortfoliosLazyQuery>;
export type PortfoliosQueryResult = Apollo.QueryResult<PortfoliosQuery, PortfoliosQueryVariables>;
export const AllSecuritiesDocument = gql`
    query AllSecurities {
  allSecurities {
    currentStatus {
      daysSinceEma200Increasing
      daysSinceEma50Increasing
      daysSinceEma20Increasing
      aroon200Strategy {
        type
      }
    }
    symbol
    name
    country
    watchlists {
      name
    }
    portfolios {
      pf {
        name
      }
      qty
    }
    lastQuoteUpdate
    type
  }
}
    `;

/**
 * __useAllSecuritiesQuery__
 *
 * To run a query within a React component, call `useAllSecuritiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSecuritiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSecuritiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSecuritiesQuery(baseOptions?: Apollo.QueryHookOptions<AllSecuritiesQuery, AllSecuritiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllSecuritiesQuery, AllSecuritiesQueryVariables>(AllSecuritiesDocument, options);
      }
export function useAllSecuritiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSecuritiesQuery, AllSecuritiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllSecuritiesQuery, AllSecuritiesQueryVariables>(AllSecuritiesDocument, options);
        }
export type AllSecuritiesQueryHookResult = ReturnType<typeof useAllSecuritiesQuery>;
export type AllSecuritiesLazyQueryHookResult = ReturnType<typeof useAllSecuritiesLazyQuery>;
export type AllSecuritiesQueryResult = Apollo.QueryResult<AllSecuritiesQuery, AllSecuritiesQueryVariables>;
export const GetLiveQuoteDocument = gql`
    query getLiveQuote($symbol: String!) {
  liveQuote(symbol: $symbol) {
    close
    previousClose
  }
}
    `;

/**
 * __useGetLiveQuoteQuery__
 *
 * To run a query within a React component, call `useGetLiveQuoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLiveQuoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLiveQuoteQuery({
 *   variables: {
 *      symbol: // value for 'symbol'
 *   },
 * });
 */
export function useGetLiveQuoteQuery(baseOptions: Apollo.QueryHookOptions<GetLiveQuoteQuery, GetLiveQuoteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLiveQuoteQuery, GetLiveQuoteQueryVariables>(GetLiveQuoteDocument, options);
      }
export function useGetLiveQuoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLiveQuoteQuery, GetLiveQuoteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLiveQuoteQuery, GetLiveQuoteQueryVariables>(GetLiveQuoteDocument, options);
        }
export type GetLiveQuoteQueryHookResult = ReturnType<typeof useGetLiveQuoteQuery>;
export type GetLiveQuoteLazyQueryHookResult = ReturnType<typeof useGetLiveQuoteLazyQuery>;
export type GetLiveQuoteQueryResult = Apollo.QueryResult<GetLiveQuoteQuery, GetLiveQuoteQueryVariables>;
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
      qty
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
export function useTransactionsAggregateQuery(baseOptions?: Apollo.QueryHookOptions<TransactionsAggregateQuery, TransactionsAggregateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionsAggregateQuery, TransactionsAggregateQueryVariables>(TransactionsAggregateDocument, options);
      }
export function useTransactionsAggregateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsAggregateQuery, TransactionsAggregateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionsAggregateQuery, TransactionsAggregateQueryVariables>(TransactionsAggregateDocument, options);
        }
export type TransactionsAggregateQueryHookResult = ReturnType<typeof useTransactionsAggregateQuery>;
export type TransactionsAggregateLazyQueryHookResult = ReturnType<typeof useTransactionsAggregateLazyQuery>;
export type TransactionsAggregateQueryResult = Apollo.QueryResult<TransactionsAggregateQuery, TransactionsAggregateQueryVariables>;
export const AddTransactionDocument = gql`
    mutation AddTransaction($input: TransactionInput!) {
  addTransaction(input: $input) {
    _id
    pfId
    user
    symbol
    date
    comment
    assetType
    trxType
    amount
    qty
    price
    brokerage
    trxValue
  }
}
    `;
export type AddTransactionMutationFn = Apollo.MutationFunction<AddTransactionMutation, AddTransactionMutationVariables>;

/**
 * __useAddTransactionMutation__
 *
 * To run a mutation, you first call `useAddTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTransactionMutation, { data, loading, error }] = useAddTransactionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTransactionMutation(baseOptions?: Apollo.MutationHookOptions<AddTransactionMutation, AddTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTransactionMutation, AddTransactionMutationVariables>(AddTransactionDocument, options);
      }
export type AddTransactionMutationHookResult = ReturnType<typeof useAddTransactionMutation>;
export type AddTransactionMutationResult = Apollo.MutationResult<AddTransactionMutation>;
export type AddTransactionMutationOptions = Apollo.BaseMutationOptions<AddTransactionMutation, AddTransactionMutationVariables>;
export const AddTransactionsDocument = gql`
    mutation AddTransactions($input: [TransactionInput]!) {
  addTransactions(input: $input) {
    success
  }
}
    `;
export type AddTransactionsMutationFn = Apollo.MutationFunction<AddTransactionsMutation, AddTransactionsMutationVariables>;

/**
 * __useAddTransactionsMutation__
 *
 * To run a mutation, you first call `useAddTransactionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTransactionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTransactionsMutation, { data, loading, error }] = useAddTransactionsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTransactionsMutation(baseOptions?: Apollo.MutationHookOptions<AddTransactionsMutation, AddTransactionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTransactionsMutation, AddTransactionsMutationVariables>(AddTransactionsDocument, options);
      }
export type AddTransactionsMutationHookResult = ReturnType<typeof useAddTransactionsMutation>;
export type AddTransactionsMutationResult = Apollo.MutationResult<AddTransactionsMutation>;
export type AddTransactionsMutationOptions = Apollo.BaseMutationOptions<AddTransactionsMutation, AddTransactionsMutationVariables>;
export const EditTransactionDocument = gql`
    mutation EditTransaction($editTransactionInput2: EditTransactionInput!) {
  editTransaction(input: $editTransactionInput2) {
    _id
  }
}
    `;
export type EditTransactionMutationFn = Apollo.MutationFunction<EditTransactionMutation, EditTransactionMutationVariables>;

/**
 * __useEditTransactionMutation__
 *
 * To run a mutation, you first call `useEditTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTransactionMutation, { data, loading, error }] = useEditTransactionMutation({
 *   variables: {
 *      editTransactionInput2: // value for 'editTransactionInput2'
 *   },
 * });
 */
export function useEditTransactionMutation(baseOptions?: Apollo.MutationHookOptions<EditTransactionMutation, EditTransactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditTransactionMutation, EditTransactionMutationVariables>(EditTransactionDocument, options);
      }
export type EditTransactionMutationHookResult = ReturnType<typeof useEditTransactionMutation>;
export type EditTransactionMutationResult = Apollo.MutationResult<EditTransactionMutation>;
export type EditTransactionMutationOptions = Apollo.BaseMutationOptions<EditTransactionMutation, EditTransactionMutationVariables>;