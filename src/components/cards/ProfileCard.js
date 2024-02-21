import React, { useState, useEffect } from 'react';
import { getUsersAction } from "../../redux/Features/user/getUsersSlice.ts";
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from "@reduxjs/toolkit";

const ProfileCard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()

    const { users, loading, error, success, message } = useSelector((state) => state.getUsers);

    useEffect(() => {
        dispatch(getUsersAction(""));
    }, [dispatch])

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {success && (
                <div className="flex flex-col justify-between">
                    {users.map(user => (
                        <div key={user._id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-end px-4 pt-4">
                            </div>
                            <div className="flex flex-col items-center pb-10">
                                <img
                                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="Bonnie image"
                                />
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user?.username}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Interests: {user?.email}</span>
                                <div className="flex mt-4 md:mt-6">
                                    <a
                                        href="#"
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:outline-none "
                                    >
                                        Add friend
                                    </a>
                                    <a
                                        href="#"
                                        className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        View Profile
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileCard;
