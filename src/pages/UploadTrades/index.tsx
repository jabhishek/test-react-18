import { Box, Button } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';

import Papa from 'papaparse';
import { PortfolioSelect } from '../../components/SelectComponents/PortfolioSelect';
import { Option } from '../../models/Option';
import {
  TransactionInput,
  useAddTransactionsMutation,
  useAllSecuritiesQuery,
} from '../../generated/graphql';
import { getTransactions, I212Transaction } from './Trading212';
import { Select as ChakraSelect } from 'chakra-react-select';

type ITemplate = 'generic' | 'trading212';
const templates: Array<ITemplate> = ['trading212', 'generic'];

export const TemplateSelect = ({
  selectedTemplate,
  setSelectedTemplate,
}: {
  selectedTemplate: Option<ITemplate> | null;
  setSelectedTemplate: Dispatch<SetStateAction<Option<ITemplate> | null>>;
}) => {
  const templateOptions = templates.map((x) => ({
    value: x,
    label: x,
  }));

  return (
    <ChakraSelect<Option<ITemplate>>
      options={templateOptions}
      value={selectedTemplate}
      onChange={(value) => {
        console.log(value);
        setSelectedTemplate(value);
      }}
      placeholder={'Select Template'}
    />
  );
};

const UploadTrades = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Array<Option> | undefined>(undefined);
  const [selectedTemplate, setSelectedTemplate] = useState<Option<ITemplate> | null>(null);

  const { data: allSecurities } = useAllSecuritiesQuery();
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

      //handleParse();
    }
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

        let transactions: Array<TransactionInput> = [];
        if (selectedTemplate?.value === 'trading212') {
          const parsedData = csv?.data as Array<I212Transaction>;
          transactions = getTransactions(parsedData, allSecurities, selectedPortfolio);
        }
        setData(transactions);
      }
    };
    // @ts-ignore
    reader.readAsText(file);
  };

  const handleUpload = async () => {
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
      <Box p={4} justifyContent={'space-between'} display={'flex'}>
        <Box flex={1} mr={1}>
          <TemplateSelect
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        </Box>
        <Box flex={1}>
          <PortfolioSelect
            selectedPortfolio={selectedPortfolio}
            setSelectedPortfolio={setSelectedPortfolio}
          />
        </Box>
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
