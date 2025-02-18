import React from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";

const TemplateUser = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">{children}</main>
      <Footer />
    </div>
  );
};

export default TemplateUser;
