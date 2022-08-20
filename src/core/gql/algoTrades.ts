import { gql } from '@apollo/client';

export const AnalyzeTrades = gql`
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

export const GetAlgoTrades = gql`
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
