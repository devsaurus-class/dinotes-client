import React from 'react';
import PageLayout from '../layouts/PageLayout';
import NotesList from '../components/NotesList';
import Container from '../components/ui/Container';

const HomePage = () => {
  return (
    <PageLayout>
      <Container>
        <NotesList>Notes List</NotesList>
      </Container>
    </PageLayout>
  );
};

export default HomePage;
