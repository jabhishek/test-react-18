import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { StatementEntry, useEditTransactionMutation } from '../../../generated/graphql';
import { SubmitHandler, useForm } from 'react-hook-form';

type IFormInput = Pick<StatementEntry, '_id' | 'date'>;

export const EditTransactionForm = ({
  transaction,
  onSave,
}: {
  transaction: StatementEntry;
  onSave: () => void;
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    defaultValues: transaction,
  });

  const [doEditTransaction, { loading, data }] = useEditTransactionMutation();

  console.log('loading, data', loading, data);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await doEditTransaction({
      variables: {
        editTransactionInput2: {
          _id: data._id,
          date: data.date,
        },
      },
      onCompleted: (response) => {
        onSave();
        console.log('response', response);
      },
    });
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
        <Button mt={8} colorScheme="teal" isLoading={isSubmitting} type="submit" disabled={loading}>
          Submit
        </Button>
      </form>
    </Box>
  );
};
