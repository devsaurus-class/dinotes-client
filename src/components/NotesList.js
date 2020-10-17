/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotesListContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 30vw;
  text-align: left;
  margin: 1rem;
  padding: 1rem;
  border: 2px solid #a0aec0;
  border-radius: 5px;
`;

const List = styled.ul`
  list-style: none;
`;

const ListItem = styled.li`
  margin: 0.5rem;
`;

const Separator = styled.hr`
  width: 90%;
  margin: -1px;
  background-color: #edf2f7;
  color: #edf2f7;
`;

const NotesList = () => {
  const [notes, setNotes] = useState(null);

  useEffect(() => {

    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/notes`);
      const data = await response.json();
      setNotes({data});
    }

    fetchData();

  }, []);

  const listItems =
    notes &&
    notes.data.map((note) => {
      return (
        <ListItem key={note._id}>
          <h4>
            <Link to={`/edit/${note._id}`}>{note.title}</Link>
          </h4>
          <p>{note.note.slice(0, 101)}</p>
          <Separator />
        </ListItem>
      );
    });

  return (
    <NotesListContainer>
      <List>{listItems}</List>
    </NotesListContainer>
  );
};

export default NotesList;
