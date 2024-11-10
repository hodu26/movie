import React from 'react';
import Header from '../component/Header';
import Body from '../component/Body_home';

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
