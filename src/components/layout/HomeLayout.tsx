import { Fragment, useEffect, useState } from "react";
import React from "react";
import { logOutAction } from "../../redux/Features/auth/authLoginSlice.ts";
const navigation = [
  { name: "Home", href: "/discover", current: true },
  { name: "Discover", href: "/discover", current: false },
  { name: "Buddies", href: "#", current: false },
  { name: "Profile", href: "#", current: false},
  { name: "Settings ", href: "/settings", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Header component
function Header() {
  const [username, setUsername] = useState("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const user: any = JSON.parse(localStorage.getItem("username") || "{}");

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("username", user);
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div className="mx-auto sm:px-6 z-50 lg:px-8 bg-black text-white w-full overflow-x-hidden fixed md:block hidden ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center"></div>
            <div className=" sm:ml-6 block">
              <div className="flex space-x-1 md:space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="h-6 w-6 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <p className="text-sm">{user}</p>
            <p className="cursor-pointer text-sm text-red-500 font-bold" onClick={()=>logOutAction()}>Log Out</p>
          </div>
        </div>
      </div>

      {/* mobile responsive here */}

      <div className="relative  z-50">
        <div className="absolute top-[93vh]">
          <div className="mx-auto sm:px-6 lg:px-8 bg-black text-white w-full overflow-x-hidden md:hidden block fixed ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center"></div>
                <div className=" sm:ml-6 block">
                  <div className="flex space-x-1 md:space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function HomeLayout({ children }: any) {
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="overflow-y-auto max-h-full md:pb-0 pb-20 md:pt-20">
        {children}
        {/* Your content goes here */}
      </div>
    </div>
  );
}
