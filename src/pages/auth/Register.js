import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { loginAction } from "../../redux/Features/auth/authLoginSlice.ts";
import userService from "../../redux/Features/user/userService.ts";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token } = useSelector((state) => state.authUser);
const [interests, setInterests] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    setIsLoggedIn(true);
  }, []);

  const initial = {
    email: "",
    password: "",
    interests_id: "",
    username: "",
    phone: "",
  };
  const [state, setState] = useState(initial);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };




  const submitHandler = async (e) => {
    e.preventDefault();

    if (!state.email || !state.password || !state.username || !state.phone || !state.interests_id){
      return toast.warn("Please fill in all fields");
    }
    setIsSubmitting(true);

    try{
      const res = await userService.registerUser(state)
      console.log(res, "THE RES")

      if (res.status === 'success') {
        toast.success("Account created successfully. Please login to continue.");
        navigate("/")
        setIsSubmitting(false);
      } else{
        setIsSubmitting(false);
      }
    } catch (error){
      console.log(error)
      toast.error(error.response.data.message || "An error occured. Please try again")
      setIsSubmitting(false)
    }

  };

  /**
   * @description Get all interests
   * @returns {Array} interests
   */
  const getInterestes = async () => {
    const res = await userService.getAllInterests()
    if (res){
      setInterests(res.interest)
    }
  }

  useEffect(() => {
    getInterestes()
  }, []);


  console.log(interests, "THE INTERESTS")
  return (
    <>
      <div className="flex border-3 w-screen  h-screen  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight">
              Sign up to your account
            </h2>
            <div className="text-sm">
              <p className="mt-1 text-center  text-blue-500 text-sm  leading-9 tracking-tight">
                Already have account{" "}
                <a
                  href="/"
                  className="font-semibold text-red-500 hover:text-red-300"
                >
                  Login
                </a>
              </p>
            </div>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={submitHandler}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    value={state.username}
                    onChange={changeHandler}
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={state.email.toLowerCase()}
                    onChange={changeHandler}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="phone"
                    type="text"
                    value={state.phone}
                    onChange={changeHandler}
                    autoComplete="phone"
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor=" interests_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Interests
                </label>
                <select
                  id="interests_id"
                  name="interests_id"
                  value={state.interests_id}
                  onChange={changeHandler}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue="Football"
                >
                  <option defaultChecked disabled value="">Select Interest</option>
                  {interests?.map((interest) => (
                    <option key={interest._id} value={interest._id}>
                      {interest.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={state.password}
                    onChange={changeHandler}
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={submitHandler}
                  className="flex w-full disabled:bg-black justify-center text-white rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                  Register {isSubmitting && "...."}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
