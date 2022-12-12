import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';

import Papa from 'papaparse';
import { PortfolioSelect } from '../../components/SelectComponents/PortfolioSelect';
import { formatDate, useLocalStorageState } from '@pfmanager/utils';
import parse from 'date-fns/parse';
import { Option } from '../../models/Option';
import {
  AssetType,
  TransactionInput,
  useAddTransactionsMutation,
  useAllSecuritiesQuery,
} from '../../generated/graphql';

type I212Transaction = {
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

const UploadTrades = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useLocalStorageState<Array<Option> | undefined>(
    'selected',
    undefined,
  );

  const { data: allSecurities } = useAllSecuritiesQuery();
  const [doAddTransactions, { data: addResult }] = useAddTransactionsMutation();

  console.log('allSecurities', allSecurities?.allSecurities);

  // This state will store the parsed data
  const [data, setData] = useState<Array<TransactionInput>>([]);

  // It will store the file uploaded by the user
  const [file, setFile] = useState('');

  // This function will be called when
  // the file input changes
  const handleFileChange = (e: any) => {
    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // If input type is correct set the state
      setFile(inputFile);

      handleParse();
    }
  };

  const getTransactions = (data: Array<I212Transaction>) => {
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

  const handleParse = () => {
    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      if (target?.result) {
        const csv = Papa.parse(target?.result as string, { header: true });
        const parsedData = csv?.data as Array<I212Transaction>;

        setData(getTransactions(parsedData));
      }
    };
    // @ts-ignore
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    /*doAddTransactions({
      variables: {
        input: data ?? [],
      },
    });*/

    if (data) {
      await doAddTransactions({
        variables: {
          input: data,
        },
        onCompleted: () => {
          console.log('uploaded');
        },
      });
    }
  };

  console.log('data', data, addResult);

  return (
    <Box>
      <Box p={4}>
        <PortfolioSelect
          selectedPortfolio={selectedPortfolio}
          setSelectedPortfolio={setSelectedPortfolio}
        />
      </Box>
      <Box p={4}>
        <input onChange={handleFileChange} id="csvInput" name="file" type="File" />
      </Box>
      <Box p={4}>
        <Button onClick={handleParse}>Parse</Button>
      </Box>
      <Box p={4}>
        <Button onClick={handleUpload}>Upload</Button>
      </Box>
    </Box>
  );
};

export default UploadTrades;
