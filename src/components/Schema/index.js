import * as Yup from 'yup';

export const SingUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be atleast 8 characters')
    .required('Password Required'),
  email: Yup.string().email('Invalid email').required('Email Required'),
  username: Yup.string().min(5, 'Username Too Short!').required('Username Required'),
  fullName: Yup.string().min(5, 'FullName Too Short!').required('FullName Required'),
});

export const LoginSchema = Yup.object().shape({
  password: Yup.string().required('Password Required'),
  email: Yup.string().email('Invalid email').required('Email Required'),
});

export const IssueSchema = Yup.object().shape({
  fullName: Yup.string().min(5, 'FullName Too Short!').required('FullName Required'),
  email: Yup.string().email('Invalid email').required('Email Required'),
  problem: Yup.string().min(8,'Text too short!').required('This field is mandatory'),
});
