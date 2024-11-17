import React from 'react';
import Header from 'components/Header';
import Body from 'components/404NotFound/Body_404notfound';

const NotFound = () => {
  return (
    <div className="w-full h-screen mx-auto bg-[#fff]">
      <Header />
      <div className="mt-[4rem]">
        <Body />
      </div>
    </div>
  );
};

export default NotFound;