/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, TextArea } from './ui/Form';
import Button from './ui/Button';
import Message from './ui/Message';

const InfoWrapper = (props) => {
  const { status } = props;

  if (status !== null) {
    if (status === false) {
      return <Message type="error" text="Title harus diisi"  />;
    }
    return <Message type="success" text="Data berhasil disimpan" />;
  }
  return <></>;
};

const AddNoteForm = () => {
  const [state, setState] = useState({ title: '', note: '' });
  const [isSuccess, setIsSuccess] = useState(null);

  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value });
  };

  const handleNoteChange = (e) => {
    setState({ ...state, note: e.target.value });
  };

  const handleSubmit = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    };

    async function submitData() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/note`, requestOptions);
      if (response.ok) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    }

    submitData();

    e.preventDefault();
  };

  const { title, note } = state;

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
          <Button type="submit">Add</Button>
        </FormGroup>
      </Form>
    </>
  );
};

export default AddNoteForm;
