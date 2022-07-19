import { Button as ChakraButton } from '@chakra-ui/react';

export const Button = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <ChakraButton onClick={onClick} size={'sm'}>
      {text}
    </ChakraButton>
  );
};
