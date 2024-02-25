import React, { useEffect, useState } from "react";
import Hero from "../../components/hero/hero.tsx";
import HomeLayout from "../../components/layout/HomeLayout.tsx";
import ProfileCard from "../../components/cards/ProfileCard.js";
import { getUsersAction } from "../../redux/Features/user/getUsersSlice.ts";
import { useDispatch, useSelector } from "react-redux";

function Discover() {
  const dispatch = useDispatch<any>();
  const { users, loading, error, success, message } = useSelector(
    (state: any) => state.getUsers
  );

  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    dispatch(getUsersAction(""));
  }, [dispatch]);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <HomeLayout>
      <Hero />

      <div className="px:5 md:px-20 ">
        <h3 className="font-bold py-5 text-2xl ">Recently Joined</h3>

        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 justify-center items-stretch">
          <ProfileCard />
        </div>
      </div>

      <div className="px:5 md:px-20 mt-10 ">
        <h3 className="font-bold py-5 text-2xl ">You may also Like</h3>

        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 justify-center items-stretch">
          <ProfileCard />
        </div>
      </div>
      <div>
        {isVisible && (
          <button
            className="fixed bottom-8 right-8 bg-blue-500 text-white border-none rounded-md px-4 py-2 cursor-pointer hover:bg-blue-600"
            onClick={scrollToTop}
          >
            Back to Top
          </button>
        )}
      </div>
    </HomeLayout>
  );
}

export default Discover;
