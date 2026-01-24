import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const submit =async (data) => {
    await login(data);
    reset();
  };

  return (
    <div className="mt-40 flex flex-col items-center justify-center px-10">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form
        className="flex w-full max-w-96 flex-col gap-2"
        onSubmit={handleSubmit(submit)}
      >
        <label htmlFor="email">Email*:</label>
        <input
          className="w-full rounded border"
          type="email"
          name="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required!",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address, please try again.",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <div className="flex w-full flex-col">
          <label htmlFor="password">Password*:</label>
          <input
            className="w-full rounded border"
            type="password"
            name="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required!",
              minLength: {
                value: 4,
                message: "Password should contain at least 4 symbols.",
              },
              maxLength: {
                value: 16,
                message: "Password should be no more than 16 symbols.",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button className="rounded border bg-sky-100 px-2 py-px">
          {isSubmitting ? "Loading..." : "Log in"}
        </button>
        <small className="justify-cetner flex flex-col items-center">
          <Link
            to={"/register"}
            className="text-center text-[15px] text-blue-300 underline"
          >
            If you don't have an account yet - register
          </Link>
        </small>
      </form>
    </div>
  );
}

export default Login;
