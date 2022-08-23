import { gql } from '@apollo/client';

export const LATEST_QUOTE = gql`
  query getLatestQuote($symbol: String) {
    getLatestQuote(symbol: $symbol) {
      close
    }
  }
`;
