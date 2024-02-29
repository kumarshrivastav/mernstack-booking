import React from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../http";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {SignInFailure,SignInSuccess,StartSignIn} from "../state/userSlice"
const Login = () => {
  const location=useLocation()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = handleSubmit(async (payload) => {
    try {
      dispatch(StartSignIn())
      const { data } = await loginUser(payload)
      toast.success("Login Successfully!")
      dispatch(SignInSuccess(data))
      navigate(location.state?.from?.pathname || '/');
    } catch (error) {
      dispatch(SignInFailure(error.response.data.message))
      return toast.error(error.response.data.message);
    }
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>

      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 5,
              message: "password must be atleast 5 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered Yet ?{" "}
          <Link to="/register" className="underline text-blue-800">
            Create an account here!
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default Login;
