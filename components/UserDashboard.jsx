import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TodoCard from "./TodoCard";
import { deleteField, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useFetchTodos } from "../hooks/fetchTodos";

const UserDashboard = () => {
  const { userInfo, currentUser } = useAuth();
  const [edit, setEdit] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [todo, setTodo] = useState("");

  const { todos, loading, error, setTodos } = useFetchTodos();

  const handleAddTodo = async () => {
    if (!todo) {
      return null;
    }
    const newKey =
      Object.keys(todos).length === 0 ? 1 : Math.max(...Object.keys(todos)) + 1;
    setTodos({ ...todos, [newKey]: todo });
    setTodo("");
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(userRef, { todos: { [newKey]: todo } }, { merge: true });
  };

  const handleEditTodo = async () => {
    if (!editValue) {
      return null;
    }
    setTodos({ ...todos, [edit]: editValue });
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(userRef, { todos: { [edit]: editValue } }, { merge: true });
    setEdit(null);
    setEditValue("");
  };
  const handleDeleteTodo = async (todoKey) => {
    delete todos[todoKey];
    setTodos({ ...todos });
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      { todos: { [todoKey]: deleteField() } },
      { merge: true }
    );
  };

  useEffect(() => {
    if (!userInfo || Object.keys(userInfo).length === 0) {
      // setAddTodo(true);
    }
  }, [userInfo]);

  return (
    <div className="w-full max-w-[65ch] text-xs sm:text-sm mx-auto  flex flex-col flex-1 gap-3 sm:gap-5">
      {/* {addTodo && ( */}
      <div className="flex items-stretch ">
        <input
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          value={todo}
          placeholder="Add some todo"
          type="text"
          className="p-3 flex-1 text-slate-900 outline-none text-base sm:text-lg"
        />
        <button
          onClick={() => {
            handleAddTodo();
          }}
          className="w-fit bg-orange-400  duration-300 hover:bg-white  p-3 text-base font-medium relative overflow-hidden after:absolute after:top-0 after:right-full after:w-full after:h-full after:bg-cyan-600 after:z-10 hover:after:translate-x-full after:duration-300 "
        >
          <h2 className="relative z-20 "> ADD</h2>
        </button>
      </div>
      {/* )} */}
      {loading && (
        <div className="flex-1  grid place-items-center">
          <i className="fa-solid fa-spinner text-4xl animate-spin" />
        </div>
      )}
      {!loading && (
        <>
          {Object.keys(todos).map((todo, i) => (
            <TodoCard
              key={i}
              editValue={editValue}
              setEditValue={setEditValue}
              setEdit={setEdit}
              edit={edit}
              todoKey={todo}
              handleDelete={handleDeleteTodo}
              handleResubmit={handleEditTodo}
            >
              {todos[todo]}
            </TodoCard>
          ))}
        </>
      )}

      {/* {!addTodo && (
        <button
          onClick={() => {
            setAddTodo(true);
          }}
          className="border border-solid border-cyan-300 text-cyan-300 duration-300 hover:opacity-40 py-3 text-center max-w-[65ch]"
        >
          ADD TO DO
        </button>
      )} */}
    </div>
  );
};

export default UserDashboard;
