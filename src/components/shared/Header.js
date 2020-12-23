import React from 'react';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import Button from '../ui/Button';
import logo from '../../assets/images/header-logo.png';
import { Link } from 'react-router-dom';

const Navigation = tw.div`flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-3`;

const Img = tw.img`h-14 w-auto sm:h-16`;

const Heading = tw.h2`invisible text-xl font-bold text-gray-900 md:visible`;

const Menu = tw.div`md:flex items-center justify-end md:flex-1 lg:w-0`;

const Header = () => {
  return (
    <Navigation>
      <Img src={logo} alt='logo' />
      <Heading>DinoTes</Heading>
      <Menu>
        <Link to='/add'>
          <Button>
            <FontAwesomeIcon icon={faFile} />
            &nbsp;&nbsp; New Note
          </Button>
        </Link>
      </Menu>
    </Navigation>
  );
};

export default Header;
