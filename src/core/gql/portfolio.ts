import { gql } from '@apollo/client';

export const GET_PORTFOLIOS = gql`
  query Portfolios {
    portfolios {
      _id
      name
    }
  }
`;
