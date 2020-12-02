/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { Form, FormGroup, Label, Input, TextArea } from "./ui/Form";
import Button from "./ui/Button";
import Message from "./ui/Message";
import { addNewNote, statusReset } from "../features/notes/notesSlice";

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

const AddNoteForm = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ title: "", note: "" });
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
      const actionResult = await dispatch(addNewNote(state));
      const result = unwrapResult(actionResult);
      if(result) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (err) {
      console.error("Terjadi kesalahan: ", err);
      setIsSuccess(false);
    } finally {
      dispatch(statusReset())
    }
  };

  const { title, note } = state;

  return (
    <>
      <InfoWrapper status={isSuccess} />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Note</Label>
          <TextArea
            name="note"
            rows="12"
            value={note}
            onChange={handleNoteChange}
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit">Add</Button>
        </FormGroup>
      </Form>
    </>
  );
};

export default AddNoteForm;
