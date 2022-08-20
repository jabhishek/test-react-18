import { useParams } from 'react-router-dom';
import { useAnalyzeStrategyForStockNewQuery } from '../../generated/graphql';
import React from 'react';

export const AnalyzeSecurity = ({ symbol }: { symbol: string }) => {
  const { data, loading } = useAnalyzeStrategyForStockNewQuery({
    variables: {
      symbol,
    },
  });

  console.log('data, loading', data, loading);

  return <div>{data?.analyzeStrategyForStockNew?.trades?.length} trades</div>;
};

const Analyze = () => {
  const x = useParams();

  console.log('x', x);

  const { data, loading } = useAnalyzeStrategyForStockNewQuery({
    variables: {
      symbol: x.id as string,
    },
  });

  console.log('data, loading', data, loading);

  return <div>{x.id ? <AnalyzeSecurity symbol={x.id} /> : null}</div>;
};

export default Analyze;
