import { Box, Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { useGetAlgoTradesQuery } from '../../generated/graphql';
import { ICellRendererParams } from '@ag-grid-community/core';
import { formatNumberWithComma } from '../../components/Grids/cellRenderers';

import { useMemo, useState } from 'react';
import { AnalyzeSecurity } from '../../components/AnalyzeSecurity';
import { TradeTriggers } from './TradeTriggers';
import { ExecuteTrades } from './ExecuteTrades';

export const SecurityNameCellRenderer = (props: ICellRendererParams) => {
  const { data } = props as {
    data: { name: string; symbol: string };
  };

  return (
    <Box sx={{ lineHeight: 1.3 }}>
      <Box>{data?.name}</Box>
      <Box>{data?.symbol}</Box>
    </Box>
  );
};

export const DatesRenderer = (props: ICellRendererParams) => {
  const { data } = props as {
    data: { date: string; sellDate: string };
  };
  return (
    <Box sx={{ lineHeight: 1.3 }}>
      <Box>{data?.date}</Box>
      <Box>{data?.sellDate ?? '-'}</Box>
    </Box>
  );
};

export const PriceRenderer = (props: ICellRendererParams) => {
  const { data } = props as {
    data: { close: number; sellPrice: number };
  };
  return (
    <Box sx={{ lineHeight: 1.3 }}>
      <Box>{formatNumberWithComma(data?.close, 2)}</Box>
      <Box>{data?.sellPrice ? formatNumberWithComma(data?.sellPrice, 2) : '-'}</Box>
    </Box>
  );
};

const Home = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const { data: algoTrades } = useGetAlgoTradesQuery();

  const filteredTrades = useMemo(() => {
    return algoTrades?.getAlgoTrades?.filter(() => {
      //return x?.security?.country === 'UK';
      return true;
    });
  }, [algoTrades?.getAlgoTrades]);

  return (
    <Box>
      <div className="ag-theme-alpine">
        <TradeTriggers triggers={filteredTrades} setSelectedSymbol={setSelectedSymbol} />
        <ExecuteTrades triggers={filteredTrades} setSelectedSymbol={setSelectedSymbol} />
      </div>
      <Modal
        isOpen={!!selectedSymbol}
        onClose={() => setSelectedSymbol(null)}
        isCentered
        scrollBehavior={'inside'}
        size={'full'}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <AnalyzeSecurity symbol={selectedSymbol as string} />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;

// with days < 100
// US - 12.35
// India - 21.27
// UK - 10.37
// All - 22.23

// new logic
// US - 12.35
// India - 26.19
// UK - 10.37
// All - 23.68

// new logic - only completed trades
// US - 17.69
// India - 29.8
// UK - 11.14
// All - 23

// new logic - only completed trades
// US - 18.78
// India - 32.66
// UK - 11.45
// All - 23
