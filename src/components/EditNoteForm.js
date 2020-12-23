/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Form, FormGroup, FormButtonGroup, Input, TextArea } from './ui/Form';
import Button from './ui/Button';
import Message from './ui/Message';
import { useSelector, useDispatch } from 'react-redux';

import {
  getNoteById,
  updateExistingNote,
  deleteNote,
  statusReset,
} from '../features/notes/notesSlice';

const InfoWrapper = (props) => {
  const { status } = props;

  if (status !== null) {
    if (status === false) {
      return <Message type='error' text='Title cannot be empty' />;
    }
    return <Message type='success' text='Data successfully saved' />;
  }
  return <></>;
};

const EditNoteForm = () => {
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const noteId = location.pathname.replace('/edit/', '');

  const currentNote = useSelector((state) => getNoteById(state, noteId));

  const [state, setState] = useState(currentNote);
  const [isSuccess, setIsSuccess] = useState(null);

  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value });
  };

  const handleNoteChange = (e) => {
    setState({ ...state, note: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const actionResult = await dispatch(updateExistingNote(state));
      const result = unwrapResult(actionResult);
      if (result) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (err) {
      console.error('Terjadi kesalahan: ', err);
      setIsSuccess(false);
    } finally {
      dispatch(statusReset());
    }
  };

  const handleDeleteNote = async (e) => {
    e.preventDefault();

    try {
      const actionResult = await dispatch(deleteNote(state));
      const result = unwrapResult(actionResult);
      if (result) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (err) {
      console.error('Terjadi kesalahan: ', err);
      setIsSuccess(false);
    } finally {
      dispatch(statusReset());
      history.push('/');
    }
  };

  const { title, note } = state;

  return (
    <>
      <InfoWrapper status={isSuccess} />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type='text'
            name='title'
            value={title}
            onChange={handleTitleChange}
          />
        </FormGroup>
        <FormGroup>
          <TextArea
            name='note'
            rows='12'
            value={note}
            onChange={handleNoteChange}
          />
        </FormGroup>
        <FormButtonGroup>
          <Button type='submit'>
            <FontAwesomeIcon icon={faSave} /> &nbsp; Save
          </Button>
          <Button danger onClick={handleDeleteNote}>
            <FontAwesomeIcon icon={faTrashAlt} /> &nbsp; Delete
          </Button>
        </FormButtonGroup>
      </Form>
    </>
  );
};

export default EditNoteForm;
