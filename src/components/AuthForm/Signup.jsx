import { Button, Input } from '@chakra-ui/react';
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';
import { FormControl, FormErrorMessage, VStack } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { SingUpSchema } from '../Schema';
import { USER_ACTION } from '../../constants';

const Signup = () => {
  const { loading, signup } = useSignUpWithEmailAndPassword();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        username: '',
        fullName: '',
      }}
      onSubmit={(values) => signup(values)}
      validationSchema={SingUpSchema}
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
            <Field name="username">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.username && form.touched.username}>
                  <Input {...field} size={'lg'} placeholder="Username" variant="flushed" />
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="fullName">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.fullName && form.touched.fullName}>
                  <Input {...field} size={'lg'} placeholder="FullName" variant="flushed" />
                  <FormErrorMessage>{form.errors.fullName}</FormErrorMessage>
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
            <Button
              justifyContent={'center'}
              width={'100%'}
              gap={4}
              mt={10}
              type="submit"
              colorScheme="purple"
              disabled={loading}
            >
              {USER_ACTION.SIGN_UP}
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
