import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import tw from 'twin.macro';
import { Formik } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../assets/images/header-logo.png';
import Message from '../components/ui/Message';
import { login, statusReset } from '../features/user/userSlice';

const Container = tw.div`min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8`;
const Img = tw.img`w-auto m-auto sm:h-16`;
const FormContainer = tw.div`max-w-md w-full space-y-8`;
const Title = tw.h2`mt-6 text-center text-3xl font-extrabold text-gray-900`;
const LoginForm = tw.form`mt-8 space-y-6`;
const LoginFormGroup = tw.div`rounded-md shadow-sm -space-y-px`;
const EmailField = tw.input`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`;
const PasswordField = tw.input`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`;
const Button = tw.button`relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`;

const InfoWrapper = (props) => {
  const { status } = props;

  if (status !== null) {
    if (status === false) {
      return <Message type="error" text="Something wrong" />;
    }
    return <Message type="success" text="Login successful!" />;
  }
  return <></>;
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isSuccess, setIsSuccess] = useState(null);

  return (
    <>
      {isLoggedIn ? (
        <Redirect to="/" />
      ) : (
        <Container>
          <FormContainer>
            <Img src={logo} alt="logo" />
            <p>
              <i>"Once upon a time, dinosaur use app to take a note"</i>
            </p>
            <Title>Login to DinoTes</Title>
            <InfoWrapper status={isSuccess} />
            <Formik
              initialValues={{ email: '', password: '' }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = 'Invalid email address';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const actionResult = await dispatch(login(values));
                  const result = unwrapResult(actionResult);
                  if (result) {
                    setIsSuccess(true);
                    window.location.reload(); 
                  } else {
                    setIsSuccess(false);
                  }
                } catch (err) {
                  setIsSuccess(false);
                } finally {
                  dispatch(statusReset());
                  setSubmitting(false);
                }
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                <LoginForm onSubmit={handleSubmit}>
                  <LoginFormGroup>
                    <EmailField
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      onChange={handleChange}
                      value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                    <PasswordField
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={values.password}
                    />
                    {errors.password && touched.password && errors.password}
                  </LoginFormGroup>
                  <Button type="submit" disabled={isSubmitting}>
                    Login
                  </Button>
                  <p>
                    Don't have an account?{' '}
                    <Link to="/register">
                      <b>Register</b>
                    </Link>
                  </p>
                </LoginForm>
              )}
            </Formik>
          </FormContainer>
        </Container>
      )}
    </>
  );
};

export default LoginPage;
