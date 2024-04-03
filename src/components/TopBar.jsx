import React from "react";

const TopBar = ({ name = "NCC" }) => {
  return (
    <nav className="relative flex w-full flex-wrap items-center justify-between bg-[#001529] py-2 shadow-dark-mild  lg:py-2">
      <div className="flex w-full flex-wrap items-center justify-between ">
        <div className="ms-2">
          <div className="text-2xl font-poppins font-semibold text-black dark:text-white">
            {name.toLocaleUpperCase()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
