import { gql } from '@apollo/client';

export const AllSecurities = gql`
  query AllSecurities {
    allSecurities {
      _id
      country
      currentStatus {
        aroon200Strategy {
          date
        }
        aroon20Strategy {
          type
        }
        aroon50Strategy {
          type
        }
      }
      name
      portfolios {
        pf {
          name
        }
      }
      symbol
      type
      watchlists {
        name
      }
    }
  }
`;
