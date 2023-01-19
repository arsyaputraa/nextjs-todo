import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative bg-slate-900 text-white">
      <Header />
      <main className="flex-1 p-4 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
