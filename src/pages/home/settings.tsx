import React, { useState } from "react";
import HomeLayout from "../../components/layout/HomeLayout.tsx";
import userService from "../../redux/Features/user/userService.ts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import {updateUserAction} from "../../redux/Features/user/updateUserSlice.ts"

function Settings() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch: any = useDispatch()
  const initial = {
    email: "",
    username: "",
    phone: "",
  };
  const [state, setState] = useState(initial);
  const username: any = JSON.parse(localStorage.getItem("username") || "{}");
  const email: any = JSON.parse(localStorage.getItem("email") || "{}");
  const phone: any = JSON.parse(localStorage.getItem("phone") || "{}");
  const id: any = JSON.parse(localStorage.getItem("id") || "{}");
  const token: any = localStorage.getItem("token") || "{}"
  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    if ( !state.email && !state.username && !state.phone){
      return toast.warn("Please fill in all fields");
    }
    e.preventDefault();
    setIsSubmitting(true);
      dispatch(updateUserAction({ email:state.email, phone:state.phone, username:state.username, token:token, id:id }))
        .then(unwrapResult)
        .then(({user}) => {
          console.log(user, "THE RES")
          if (!user) {
            setIsSubmitting(false);
          }
          
          toast.success(`Info updated succesfully`);
          navigate("/discover")
        }).catch((err) => {
          setIsSubmitting(false)
          console.log(err)
        })

  };

  return (
    <HomeLayout>
      <main className="px-4  md:px:20 pt-10">
        <div className="mx-auto space-y-16 sm:space-y-20 lg:mx-0">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Username
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="username"
                      value={state.username}
                      onChange={changeHandler}
                      placeholder={username}
                      autoComplete="username"
                      required
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <button
                    type="button"
                    className="font-semibold text-red-600 hover:text-red-500"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Email address
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={state.email}
                    placeholder={email}
                    onChange={changeHandler}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
                  <button
                  onClick={handleSubmit}
                    type="button"
                    className="font-semibold text-red-600 hover:text-red-500"
                  >
                    Update
                  </button>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                  Phone
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    value={state.phone}
                    placeholder={phone}
                    onChange={changeHandler}
                    autoComplete="phone"
                    required
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
                  <button
                    type="button"
                    className="font-semibold text-red-600 hover:text-red-500"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </HomeLayout>
  );
}

export default Settings;
