import { yupResolver } from '@hookform/resolvers/yup'
import { Button, makeStyles, Typography, LinearProgress } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { LockOutlined } from '@material-ui/icons'
import InputField from 'components/form-controls/InputField'
import PasswordField from 'components/form-controls/PasswordField'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    position: 'relative',
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },

  title: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2),
  },

  buttonSubmit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },

  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}))

function LoginForm({ onSubmit }) {
  const schema = yup.object().shape({
    identifier: yup.string().required(),
    password: yup.string().required(),
  })
  const classes = useStyles()
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const handleSubmitForm = async (values) => {
    if (onSubmit) {
      await onSubmit(values)
    }

    // form.reset()
  }

  const { isSubmitting } = form.formState

  // form control
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>

      <Typography component='h3' variant='h5' className={classes.title}>
        Sign In
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        <InputField name='identifier' form={form} label='Email' />
        <PasswordField name='password' form={form} label='Password' />

        <Button
          className={classes.buttonSubmit}
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
        >
          Sign In
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
