import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { logIn, signUp, currentUser } = useAuth();
  console.log(currentUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const onSubmit = async (data) => {
    if (isLoggingIn) {
      try {
        await logIn(data.email, data.password);
      } catch (error) {
        setError("invalid email or password");
      }
      return;
    }
    await signUp(data.email, data.password);
  };

  useEffect(() => {
    if (errors.password || errors.email) {
      setError("Please enter email and password");
    }
  }, [errors]);

  return (
    <div className=" text-xs sm:text-sm flex-1 flex flex-col justify-center items-center gap-2 sm:gap-4">
      <h1 className="font-extrabold text-3xl sm:text-4xl select-none">
        {!isLoggingIn ? "REGISTER" : "LOGIN"}
      </h1>
      {error && (
        <div className="py-2 w-full max-w-[40ch] border border-solid border-rose-400 text-rose-400 text-center">
          {error}
        </div>
      )}

      <form
        className="flex w-full flex-col justify-center items-center gap-2 sm:gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("email", { required: "email required" })}
          type="email"
          name="email"
          placeholder="Email Address"
          className="outline-none p-2 rounded-sm text-slate-900 w-full max-w-[40ch] duration-300 border-b-2 border-white focus:border-cyan-500"
        />
        <input
          {...register("password", { required: "password required" })}
          type="password"
          name="password"
          placeholder="Password"
          className="outline-none p-2 rounded-sm text-slate-900 w-full max-w-[40ch] duration-300 border-b-2 border-white focus:border-cyan-500"
        />
        <button
          type="submit"
          className="p-2 duration-500 hover:text-slate-900 hover:font-bold  hover:bg-white w-full max-w-[40ch] border border-white border-solid relative overflow-hidden after:absolute after:top-0 after:left-full after:w-full after:h-full after:bg-white after:z-10 hover:after:-translate-x-full after:duration-300"
        >
          <h2 className="relative z-20">SUBMIT</h2>
        </button>
        <h2
          className="duration-300 hover:scale-110 font-bold cursor-pointer"
          onClick={() => {
            setIsLoggingIn(!isLoggingIn);
          }}
        >
          {isLoggingIn ? "REGISTER" : "LOGIN"}
        </h2>
      </form>
    </div>
  );
};

export default Login;
