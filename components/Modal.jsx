import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { useAuth } from "../context/AuthContext";

const Modal = ({ setOpenModal }) => {
  const [_document, set_document] = useState(null);
  const { logOut } = useAuth();

  useEffect(() => {
    set_document(document);
  }, []);

  if (!_document) {
    return null;
  }
  return ReactDom.createPortal(
    <div className="flex flex-col h-screen w-screen fixed top-0 left-0 text-slate-900 bg-white text-lg sm:text-xl">
      <div className="flex items-center justify-between border-b border-slate-900 border-solid p-4">
        <h1 className="select-none font-extrabold text-2xl sm:text-5xl">
          MENU
        </h1>
        <i
          onClick={() => {
            setOpenModal(false);
          }}
          className="select-none fa-solid text-lg sm:text-3xl fa-xmark duration-300 hover:rotate-90 cursor-pointer "
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <h2
          onClick={() => {
            logOut();
            setOpenModal(false);
          }}
          className="select-none duration-300 hover:pl-2 cursor-pointer"
        >
          Log out
        </h2>
      </div>
    </div>,
    _document.getElementById("portal")
  );
};

export default Modal;
