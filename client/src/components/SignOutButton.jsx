import React from "react";
import { logout } from "../http";
import { useDispatch } from "react-redux";
import {
  SignOutFailure,
  SignOutStart,
  SignOutSuccess,
} from "../state/userSlice";
import { toast } from "react-toastify";

const SignOutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      dispatch(SignOutStart());
      const { data } = await logout();
      dispatch(SignOutSuccess());
      return toast.success(data)
    } catch (error) {
      dispatch(SignOutFailure(error.response.data.message));
      return toast.error(error.response.data.message)
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
