import React from 'react';
import Header from 'components/Header';
import Body from 'components/Home/Body_home';

const Home = () => {
  return (
    <div className="w-full h-screen mx-auto bg-[#fff]">
      <Header />
      <div className="mt-[4rem]">
        <Body />
      </div>
    </div>
  );
};

export default Home;
