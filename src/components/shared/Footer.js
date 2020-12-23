import React from "react";
import tw from "twin.macro";

const Container = tw.div`m-4 p-2`;

const Footer = () => {
  return (
    <Container>
      <p>
        by <a href="https://devsaurus.com">devsaurus</a> &copy; 2020
      </p>
    </Container>
  );
};

export default Footer;
