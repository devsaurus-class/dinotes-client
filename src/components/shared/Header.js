import React, { useState } from 'react';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import logo from '../../assets/images/header-logo.png';

const Navigation = tw.div`flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-3`;
const Img = tw.img`h-14 w-auto sm:h-16`;
const Heading = tw.h2`invisible text-xl font-bold text-gray-900 md:visible`;
const Menu = tw.div`md:flex items-center justify-end md:flex-1 lg:w-0`;

const Header = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <>
      {visible && <Modal close={handleClick} />}
      <Navigation>
        <Img src={logo} alt="logo" onClick={handleClick} />
        <Heading>DinoTes</Heading>
        <Menu>
          <Link to="/add">
            <Button>
              <FontAwesomeIcon icon={faFile} />
              &nbsp;&nbsp; New Note
            </Button>
          </Link>
        </Menu>
      </Navigation>
    </>
  );
};

export default Header;
