import React, { useState } from 'react';
import { forgetPasswordAction } from '../../redux/Features/auth/authForgetPasswordSlice.ts';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import authService from '../../redux/Features/auth/authService.ts';

function ForgotPasswordForm() {
  const [email, setEmail] = useState<any>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleForgetPassword = async (e: any) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
      return;
    }
    setProcessing(true);  

    const res = await authService.forgetPassword(email);
    console.log(res, "res")
    if (res.status === "success"){
      setProcessing(false);
      toast.success(res.message)
      setTimeout(() => {
        window.location.href = "/";
      }, 3000) 
    }else{
      setProcessing(false);
      toast.error("Something went wrong. Please try again.")
    }
  };
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
              <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Forgot your password?
              </h1>
              <p className="font-light text-gray-500 dark:text-gray-400">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
              <form onSubmit={handleForgetPassword} className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input 
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com" required />
                  </div>
                  <div className="flex items-start">
                  </div>
                  <button type="submit" className="w-full text-white bg-red-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-primary-800">Reset password</button>
              </form>
          </div>
      </div>
    </section>
  );
}

export default ForgotPasswordForm;
