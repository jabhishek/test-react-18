import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { AddTransactionMutation } from '../../../generated/graphql';

type IFormInput = AddTransactionMutation['addTransaction'];

export const AddTransactionForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.symbol}>
          <FormLabel htmlFor="name">Symbol</FormLabel>
          <Input
            id="name"
            placeholder="symbol"
            {...register('symbol', {
              required: 'Symbol is required',
            })}
          />
          <FormErrorMessage>
            {errors?.symbol ? (errors?.symbol?.message as string | undefined) : ''}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};
