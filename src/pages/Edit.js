import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import EditNoteForm from '../components/EditNoteForm';
import Container from '../components/ui/Container';
import { HomeLink, Title } from '../components/ui/HomeLink';

const EditPage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <PageLayout>
          <Container>
            <HomeLink>
              <Title>
                <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; <Link to="/">Back</Link>
              </Title>
            </HomeLink>
            <EditNoteForm />
          </Container>
        </PageLayout>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default EditPage;
