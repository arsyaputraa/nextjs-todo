import React, { useState } from "react";
import Modal from "./Modal";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <div className="sticky top-0 left-o w-full flex items-center justify-between p-4 bg-inherit border-b border-solid border-white">
        <h1 className="text-3xl sm:6xl">TODO LIST</h1>
        <i
          onClick={() => setOpenModal(true)}
          className="fa-solid fa-user text-xl sm:text-3xl"
        />
      </div>
    </>
  );
};

export default Header;
