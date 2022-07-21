import { gql } from '@apollo/client';

export const GET_STATEMENT = gql`
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