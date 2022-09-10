import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';

import Papa from 'papaparse';
import { PortfolioSelect } from '../../components/SelectComponents/PortfolioSelect';
import { useLocalStorageState } from '@pfmanager/utils';
import { Option } from '../../models/Option';
import { AssetType, TransactionInput, useAddTransactionsMutation } from '../../generated/graphql';

type I212Transaction = {
  Action: 'Deposit' | 'Market buy';
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

  const [doAddTransactions, { data: addResult }] = useAddTransactionsMutation();

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
      const date = x?.Time?.substring(0, 10);
      if (x?.Action === 'Deposit') {
        const trx: TransactionInput = {
          user: 'abhi2000@gmail.com',
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
