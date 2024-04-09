import { FormControl, FormErrorMessage, Input, VStack } from '@chakra-ui/react';
import useLogin from '../../hooks/useLogin';
import { Field, Form, Formik } from 'formik';
import { LoginSchema } from '../Schema';
import LoginButton from '../Buttons/LoginButton';

const Login = () => {
  const { loading, login } = useLogin();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => login(values)}
      validationSchema={LoginSchema}
    >
      {() => (
        <Form style={{ width: '100%' }}>
          <VStack spacing={4} align="flex-start">
            <Field name="email">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <Input {...field} size={'lg'} placeholder="Email" variant="flushed" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.password && form.touched.password}>
                  <Input
                    {...field}
                    size={'lg'}
                    type="password"
                    variant="flushed"
                    placeholder="Password"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <LoginButton isLoading={loading} />
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
