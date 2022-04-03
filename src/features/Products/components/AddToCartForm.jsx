import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Box } from '@material-ui/core'
import InputField from 'components/form-controls/InputField'
import QuantityField from 'components/form-controls/QuantityField'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('please enter quantity')
      .min(1, 'minimum value is 1')
      .typeError('please enter a number'),
  })

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  })

  const handleSubmitForm = (formValue) => {
    onSubmit?.(formValue)
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmitForm)}>
      <Box component='div'>
        <QuantityField name='quantity' form={form} label='Quantity' />
      </Box>

      <Button
        type='submit'
        variant='contained'
        style={{ width: '200px' }}
        color='primary'
        fullWidth
      >
        Add To Cart
      </Button>
    </form>
  )
}

export default AddToCartForm
