/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, TextArea } from './ui/Form';
import Button from './ui/Button';
import Message from './ui/Message';

const InfoWrapper = (props) => {
  const { status } = props;

  if (status !== null) {
    if (status === false) {
      return <Message type="error" text="Title harus diisi" />;
    }
    return <Message type="success" text="Data berhasil disimpan" />;
  }
  return <></>;
};

const EditNoteForm = () => {
  const location = useLocation();
  const history = useHistory();
  const [currentNote, setCurrentNote] = useState({ title: '', note: '' });
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    const noteId = location.pathname.replace('/edit/', '');

    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/note/${noteId}`);
      const data = await response.json();
      setCurrentNote(data);
    }

    fetchData();
  }, []);

  const handleTitleChange = (e) => {
    setCurrentNote({ ...currentNote, title: e.target.value });
  };

  const handleNoteChange = (e) => {
    setCurrentNote({ ...currentNote, note: e.target.value });
  };

  const handleSubmit = (e) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentNote)
    };

    async function submitData() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/note/${currentNote._id}`, options);
      if (response.ok) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    }

    submitData();

    e.preventDefault();
  };

  const handleDeleteNote = () => {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };

    async function deleteData() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/note/${currentNote._id}`, options);
      if (response.ok) {
        history.push('/');
      }
    }

    deleteData();
  };

  const { title, note } = currentNote;

  return (
    <>
      <InfoWrapper status={isSuccess} />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input type="text" name="title" value={title} onChange={handleTitleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Note</Label>
          <TextArea name="note" rows="12" value={note} onChange={handleNoteChange} />
        </FormGroup>
        <FormGroup>
          <Button type="submit">Save</Button>
          <Button danger onClick={handleDeleteNote}>
            Delete
          </Button>
        </FormGroup>
      </Form>
    </>
  );
};

export default EditNoteForm;
