import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

export const useFetchTodos = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTodos("todos" in docSnap.data() ? docSnap.data().todos : {});
        } else {
          setTodos({});
        }
      } catch (error) {
        setError("Failed to load todos");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  return { todos, loading, error, setTodos };
};
