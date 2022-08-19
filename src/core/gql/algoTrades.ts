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
      }
      quotes {
        date
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
      relatedTrade {
        type
        date
        close
        symbol
      }
      risk
    }
  }
`;
