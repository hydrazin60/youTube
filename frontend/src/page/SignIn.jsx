import React from "react";
import { Input } from "../components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const [isSigninorSignup, setIsSignInOrSignUp] = React.useState(true);
  return (
    <div className="bg-zinc-900 h-screen w-screen flex flex-col gap-1 items-center justify-center">
      <main className="h-[60vh] w-3/4 bg-gray-900 rounded-lg shadow-lg flex ">
        <div className="w-[40%] flex flex-col justify-center items-center bg-black rounded-l-lg p-8">
          <div className="flex flex-col items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
              alt="logo"
              className="h-16 mb-6"
            />
            {isSigninorSignup ? (
              <form className="flex flex-col gap-5 w-full">
                <Input type="text" placeholder="Enter your Name" />
                <Input type="email" placeholder="Enter your Email" />
                <Input
                  type="password"
                  placeholder="Enter your Password"
                  className="placeholder:text-white"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-4"
                >
                  Sign Up
                </button>
              </form>
            ) : (
              <form className="flex flex-col gap-5 w-full">
                <Input type="email" placeholder="Enter your Email" />
                <Input
                  type="password"
                  placeholder="Enter your Password"
                  className="placeholder:text-white"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-4"
                >
                  Sign In
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="w-[60%] text-white flex flex-col justify-evenly   items-start  bg-black rounded-r-lg p-2 ">
          <div>
            <img
              src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0"
              alt="logo"
              className="h-12 mb-1"
            />
            <h1 className="text-3xl font-semibold">Verify it’s you</h1>
          </div>
          <div className="flex flex-col items-end gap-4">
            <p className="text-sm text-gray-400">
              We won't post anything without your permission. By signing up, you
              agree to our Terms, Data Policy and Cookies Policy.
            </p>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-1   w-1/2 rounded-3xl flex items-center justify-center gap-2"
            >
              <img
                src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0"
                alt="logo"
                className="h-9"
              />
              <p> continusly with google</p>
            </button>
            <p className="text-sm text-gray-400">
              {isSigninorSignup
                ? "Already have an account?"
                : "Don't have an account?"} {"  "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsSignInOrSignUp(!isSigninorSignup)}
              >
                {isSigninorSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </main>
      <main className="h-12 w-3/4 flex justify-between ">
        <div>
          <p className=" text-sm text-zinc-400  font-semibold">
            English (United States)
          </p>
        </div>
        <div className="flex gap-4">
          <span className=" text-sm text-zinc-400  font-semibold">Help</span>
          <span className=" text-sm text-zinc-400  font-semibold">Privacy</span>
          <span className=" text-sm text-zinc-400  font-semibold">Terms</span>
        </div>
      </main>
    </div>
  );
}
