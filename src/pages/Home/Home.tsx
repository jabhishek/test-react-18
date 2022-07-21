import { useState, useTransition } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useTransactionsAggregateQuery } from '../../generated/graphql';

const Home = () => {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  const { data, loading } = useTransactionsAggregateQuery();

  function handleClick() {
    startTransition(() => {
      setCount((c) => c + 1);
    });
  }

  console.log('data, loading', data, loading);

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
};

export default Home;
