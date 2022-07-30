import { Box, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Dispatch, SetStateAction, useState } from 'react';

type ITabs = 'home' | 'events' | 'portfolios';

const Tab = ({
  routeName,
  to,
  label,
  selectedRoute,
  setSelectedRoute,
}: {
  routeName: ITabs;
  to: string;
  label: string;
  selectedRoute: ITabs;
  setSelectedRoute: Dispatch<SetStateAction<ITabs>>;
}) => {
  return (
    <Link to={to} onClick={() => setSelectedRoute(routeName)}>
      <Box px={4} py={2} bg={selectedRoute === routeName ? 'gray.300' : 'initial'}>
        {label}
      </Box>
    </Link>
  );
};

export const AppHeader = () => {
  const [selectedRoute, setSelectedRoute] = useState<ITabs>('home');
  return (
    <Box bg={'gray.100'}>
      <Box
        sx={{ height: '80px', display: 'flex', alignItems: 'center' }}
        borderBottom={'2px solid var(--chakra-colors-gray-300)'}>
        <Heading>PF Manager</Heading>
      </Box>
      <Box display={'flex'}>
        <Tab
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          routeName={'home'}
          to={'/'}
          label={'Home'}
        />
        <Tab
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          routeName={'events'}
          to={'/events'}
          label={'Events'}
        />
        <Tab
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          routeName={'portfolios'}
          to={'/portfolios'}
          label={'Portfolios'}
        />
      </Box>
    </Box>
  );
};
