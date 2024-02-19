import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { loginAction } from "../../redux/Features/auth/authLoginSlice.ts";

function Signin(){

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      localStorage.clear();
      setIsLoggedIn(true);
    }, []);
  
    const initial = {
      email: "",
      password: "",
    };
    const [state, setState] = useState(initial);
    const changeHandler = (e) => {
      const { name, value } = e.target;
      console.log(name, value);
      setState({
        ...state,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      if ( !state.email || !state.password){
        return toast.warn("Please fill in all fields");
      }
      e.preventDefault();
      setIsSubmitting(true);

        dispatch(loginAction({ email:state.email, password:state.password }))
          .then(unwrapResult)
          .then(({user}) => {
            console.log(user, "THE RES")
            if (!user) {
              setIsSubmitting(false);
            }
            localStorage.setItem("token", user.token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("username", JSON.stringify(user?.username));
            localStorage.setItem("email", JSON.stringify(user?.email));
            localStorage.setItem("phone", JSON.stringify(user?.phone));
            localStorage.setItem("id", JSON.stringify(user?._id));
            
            toast.success(`Welcome back ${user.username}`);
            navigate("/discover")
          }).catch((err) => {
            setIsSubmitting(false)
            console.log(err)
          })
 
    };
  

    return (
      <>
        <div className="flex border-3  h-screen  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                Sign in to your account
              </h2>
            </div>
            <div className="text-sm">
            <p className="mt-1 text-center  text-blue-500 text-sm  leading-9 tracking-tight">
              Dont have account yet?
              <a
                href="/register"
                className="font-semibold text-red-500 hover:text-red-300"
              >
                Register
              </a>
            </p>
          </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6"
                  >
                    Email address or Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={state.email}
                      onChange={changeHandler}
                      autoComplete="email"
                      placeholder="Enter email address or phone number"
                      required
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
  
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="/forget-password"
                        className="font-semibold text-red-500 hover:text-red-300"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter password"
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
                    onClick={handleSubmit}
                    className="flex w-full justify-center text-white rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                  >
                    Sign in {isSubmitting && "...."}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
}

export default Signin