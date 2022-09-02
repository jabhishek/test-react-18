import {
  Box,
  Button,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  Drawer,
} from '@chakra-ui/react';
import { TransactionsAggregateQuery } from '../../../generated/graphql';
import { StatementGrid } from './StatementGrid';
import { useRef, useState } from 'react';
import { AddTransactionForm } from './AddTransactionForm';

export const StatementsSection = ({
  aggregate,
}: {
  aggregate: TransactionsAggregateQuery['transactionsAggregate'] | undefined;
}) => {
  const [showAddTransactionModal, setShowAddTransactionModal] = useState<boolean>(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const statements = aggregate?.statement;
  return (
    <Box>
      <Box>
        <Button
          ref={btnRef}
          type={'button'}
          variant={'link'}
          mb={4}
          onClick={() => setShowAddTransactionModal(true)}>
          Add Transaction
        </Button>
      </Box>

      <StatementGrid statements={statements} />

      <Drawer
        isOpen={showAddTransactionModal}
        placement="right"
        onClose={() => setShowAddTransactionModal(false)}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <AddTransactionForm />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
