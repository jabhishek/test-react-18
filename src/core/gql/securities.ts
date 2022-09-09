import { gql } from '@apollo/client';

export const AllSecurities = gql`
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

export const LIVE_QUOTE = gql`
  query getLiveQuote($symbol: String!) {
    liveQuote(symbol: $symbol) {
      close
      previousClose
    }
  }
`;
