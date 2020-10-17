/* eslint-disable react/prop-types */
import React from "react";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

const PageLayout = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default PageLayout;
