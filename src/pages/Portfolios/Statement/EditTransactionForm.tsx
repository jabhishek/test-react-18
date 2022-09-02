import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { StatementEntry } from '../../../generated/graphql';
import { SubmitHandler, useForm } from 'react-hook-form';

type IFormInput = Pick<StatementEntry, '_id' | 'date'>;

export const EditTransactionForm = ({ transaction }: { transaction: StatementEntry }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    defaultValues: transaction,
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.date} py={4}>
          <FormLabel htmlFor="date">Date</FormLabel>
          <Input
            id="date"
            placeholder="Date"
            {...register('date', {
              required: 'Date is required',
            })}
          />
          <FormErrorMessage>
            {errors?.date ? (errors?.date?.message as string | undefined) : ''}
          </FormErrorMessage>
        </FormControl>
        <Button mt={8} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};
