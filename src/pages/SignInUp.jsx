import React, { Suspense } from 'react';
import Header from 'components/Header';
import LoadingSpinner from 'components/Loading';

// 컴포넌트 동적 로드
const Body = React.lazy(() => import('components/SignInUp/Body_signin_up'));

const SignInUp = () => {
  return (
    <div className="w-full h-screen mx-auto bg-[#fff]">
      <Header />

      <div className="mt-[4rem]">
      {/* 로딩 화면 */}
      <Suspense
          fallback={
            <div className="w-full h-screen flex justify-center items-center bg-gray-900">
              <LoadingSpinner />
            </div>
          }
        >
          <Body />
        </Suspense>
      </div>
    </div>
  );
};

export default SignInUp;
