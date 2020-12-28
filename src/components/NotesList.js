/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from 'react';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import { fetchNotes, getFilteredNotes, updateSort } from '../features/notes/notesSlice';
import Container from './ui/Container';

const NotesListContainer = tw.div`grid grid-cols-1 md:grid-cols-3 gap-4 my-8`;
const Card = tw.div`text-left p-4 border rounded-md`;
const Title = tw.h4`text-lg font-semibold text-purple-900`;
const SearchBar = tw.input`m-4 p-2 text-left border rounded focus:outline-none focus:ring focus:border-blue-300`;
const Toolbar = tw.div`flex flex-row w-full justify-end`;
const DropdownInnerWrapper = tw.div`relative inline-block text-left`;
const SortIcon = tw.button`text-base text-right my-4 p-2 border rounded-md`;
const DropdownPanel = tw.div`origin-top-right absolute right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`;
const Menu = tw.ul`py-1`;
const Item = tw.li`block px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900`;


const DropdownMenu = () => {
  const [visible, setVisible] = useState(false);
  const node = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleChange = (e) => {
    setVisible(!visible);
  };

  const handleClick = (e, option) => {
    if (node.current.contains(e.target)) {
      dispatch(updateSort(option));
      return;
    }
    setVisible(false);
  };

  return (
    <DropdownInnerWrapper ref={node}>
      <SortIcon onClick={handleChange}>
        <FontAwesomeIcon icon={faSortAmountUp} size="lg" />
      </SortIcon>
      {visible && (
        <DropdownPanel>
          <Menu role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Item role="menuitem" onClick={(e) => handleClick(e, 'newest')}>
              Newest Modified Date
            </Item>
            <Item role="menuitem" onClick={(e) => handleClick(e, 'oldest')}>
              Oldest Modified Date
            </Item>
          </Menu>
        </DropdownPanel>
      )}
    </DropdownInnerWrapper>
  );
};

const NotesList = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const notes = useSelector((state) => getFilteredNotes(state, keyword));
  const notesStatus = useSelector((state) => state.notes.status);
  const error = useSelector((state) => state.notes.error);

  useEffect(() => {
    if (notesStatus === 'idle') {
      dispatch(fetchNotes());
    }
  }, [notesStatus, dispatch]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  let content;

  if (notesStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (notesStatus === 'succeeded') {
    content = notes.map((note) => {
      return (
        <Card key={note._id}>
          <Title>
            <Link to={`/edit/${note._id}`}>{note.title}</Link>
          </Title>
          <p>{note.note.slice(0, 101)}</p>
        </Card>
      );
    });
  } else if (notesStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <Container>
      <Toolbar>
        <SearchBar placeholder="Search Notes..." onChange={handleChange} />
        <DropdownMenu />
      </Toolbar>
      <NotesListContainer>{content}</NotesListContainer>
    </Container>
  );
};

export default NotesList;
