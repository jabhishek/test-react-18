import { Option } from '../../models/Option';
import { Select as ChakraSelect } from 'chakra-react-select';
import { usePortfoliosQuery } from '../../generated/graphql';
import { Dispatch, SetStateAction } from 'react';

export const PortfolioSelect = ({
  selectedPortfolio,
  setSelectedPortfolio,
}: {
  selectedPortfolio: Array<Option> | undefined;
  setSelectedPortfolio: Dispatch<SetStateAction<Array<Option> | undefined>>;
}) => {
  const { data: portfolios } = usePortfoliosQuery();

  const pfOptions = portfolios?.portfolios?.map((x) => ({
    value: x?._id ?? '',
    label: x?.name ?? '',
  }));

  return (
    <ChakraSelect<Option, true>
      isMulti
      options={pfOptions}
      value={selectedPortfolio}
      onChange={(value) => {
        setSelectedPortfolio([...value]);
      }}
      placeholder={'Select Portfolio'}
    />
  );
};
