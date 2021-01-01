import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import NotesList from '../components/NotesList';
import Container from '../components/ui/Container';

const HomePage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <PageLayout>
          <Container>
            <NotesList>Notes List</NotesList>
          </Container>
        </PageLayout>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default HomePage;
