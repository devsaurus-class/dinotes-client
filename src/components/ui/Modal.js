import React from 'react';
import tw from 'twin.macro';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/header-logo.png';
import { logout } from '../../features/user/userSlice';

const Container = tw.div`fixed z-10 inset-0 overflow-y-auto`;
const ModalWrapper = tw.div`flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`;
const BackgroundOverlayWrapper = tw.div`fixed inset-0 transition-opacity`;
const BackgroundOverlay = tw.div`absolute inset-0 bg-gray-500 opacity-75`;
const Span = tw.span`hidden sm:inline-block sm:align-middle sm:h-screen`;
const Content = tw.div`inline-block bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full`;
const Body = tw.div`inline-block bg-white p-4 m-6 text-center sm:p-6`;
const CloseButtonWrapper = tw.div`flex justify-end`;
const CloseButton = tw.button`bg-white m-4`;
const ImgWrapper = tw.div`flex items-center justify-center`;
const Img = tw.img`py-4`;
const BodyText = tw.p`text-lg text-gray-900`;
const Footer = tw.div`bg-gray-50 p-4 items-center justify-center sm:p-6 sm:flex sm:flex-row`;
const FooterText = tw.button`text-red-700 font-bold`;

const Modal = (props) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.user.username);
  const { close } = props;

  const handleClick = () => {
    close();
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <Container>
      <ModalWrapper>
        <BackgroundOverlayWrapper>
          <BackgroundOverlay />
        </BackgroundOverlayWrapper>
        <Span aria-hidden="true" />
        <Content>
          <CloseButtonWrapper>
            <CloseButton onClick={handleClick}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseButton>
          </CloseButtonWrapper>
          <Body>
            <ImgWrapper>
              <Img src={logo} alt="logo" />
            </ImgWrapper>

            <BodyText>Hi {username}</BodyText>
          </Body>
          <Footer>
            <FooterText onClick={handleLogout}>Logout</FooterText>
          </Footer>
        </Content>
      </ModalWrapper>
    </Container>
  );
};

export default Modal;
