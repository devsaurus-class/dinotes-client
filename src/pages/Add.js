import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import AddNoteForm from '../components/AddNoteForm';
import Container from '../components/ui/Container';

const AddPage = () => {
  return (
    <PageLayout>
      <Container>
        <div>
          <h4><Link to="/">Home</Link> / Add</h4>
        </div>
        <h2>Add New Note</h2>
        <AddNoteForm />
      </Container>
    </PageLayout>
  );
};

export default AddPage;
