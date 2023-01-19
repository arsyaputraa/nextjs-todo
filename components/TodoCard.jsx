import React, { useRef } from "react";

const TodoCard = ({
  children,
  todoKey,
  setEdit,
  edit,
  editValue,
  setEditValue,
  handleResubmit,
  handleDelete,
}) => {
  const inputRef = useRef(null);
  return (
    <div className="p-2 sm:p-3 border flex items-stretch border-white border-solid">
      <div className="flex-1 flex">
        {!(edit === todoKey) ? (
          <>{children}</>
        ) : (
          <input
            ref={inputRef}
            className="outline-none bg-inherit text-white flex-1"
            value={editValue}
            onChange={(e) => {
              setEditValue(e.target.value);
            }}
          />
        )}
      </div>
      <div className="flex items-center">
        {edit === todoKey ? (
          <i
            onClick={handleResubmit}
            className="fa-solid fa-check px-2 text-xs sm:text-sm cursor-pointer duration-300 hover:scale-110"
          />
        ) : (
          <i
            onClick={() => {
              setEdit(todoKey);
              setEditValue(children);
              inputRef.current?.focus();
            }}
            className="fa-solid fa-pencil px-2 text-xs sm:text-sm duration-300 hover:rotate-45 hover:scale-110 hover:opacity-50 cursor-pointer"
          />
        )}

        <i
          onClick={() => {
            handleDelete(todoKey);
          }}
          className="fa-solid fa-trash-can px-2 text-xs sm:text-sm duration-300 hover:scale-110 hover:opacity-50 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TodoCard;
