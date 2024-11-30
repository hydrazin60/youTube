import React, { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/userAuthSlice";

export default function SignIn() {
  const [isPasswordWrong, setIsPasswordWrong] = useState(false); // State to track wrong password
  const [isSigninorSignup, setIsSignInOrSignUp] = useState(true);
  const [SignUpformData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userAuth);
 

  const handleChange = (e) => {
    setSignUpFormData({ ...SignUpformData, [e.target.name]: e.target.value });
  };

  const handleChangeSignIn = (e) => {
    setSignInFormData({ ...signInFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/youtube/api/v1/user/register",
        SignUpformData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message || "User created successfully!", {
          position: "top-right",
          autoClose: 3000,
          style: {
            border: "1px solid #f44336",
            background: "#0000ff",
            color: "#ffffff",
          },
        });
        setIsSignInOrSignUp(false);
      } else {
        toast.error(res.data.message || "Registration failed!", {
          position: "top-right",
          autoClose: 3000,
          style: {
            border: "1px solid #f44336",
            background: "#ffebee",
            color: "#f44336",
          },
        });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong on login User!",
        {
          position: "top-right",
          autoClose: 3000,
          style: {
            border: "1px solid #f44336",
            background: "#ffebee",
            color: "#f44336",
          },
        }
      );
    }
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/youtube/api/v1/user/login",
        signInFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setIsLogin(true);
        dispatch(setAuthUser(res.data.userData));
        console.log(res.data.userData);
        toast.success(res.data.message || "Login successful!", {
          position: "top-right",
          autoClose: 3000,
          style: {
            border: "1px solid #f44336",
            background: "#0000ff",
            color: "#ffffff",
          },
        });
        navigate("/");
      } else {
        toast.error(res.data.message || "Login failed!", {
          position: "top-right",
          autoClose: 3000,
          style: {
            border: "1px solid #f44336",
            background: "#ffebee",
            color: "#f44336",
          },
        });
      }
    } catch (error) {
      if (
        error.response?.data?.message ===
        "incorrect password!! please try again"
      ) {
        setIsPasswordWrong(true);
      } else {
        setIsPasswordWrong(false);
      }
      toast.error(error?.response?.data?.message || "Login failed!", {
        position: "top-right",
        autoClose: 3000,
        style: {
          border: "1px solid #f44336",
          background: "#ffebee",
          color: "#f44336",
        },
      });
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/"); // Navigate if logged in successfully
    }
  }, [isLogin, navigate]);

  return (
    <div className="bg-zinc-900 h-screen w-screen flex flex-col gap-1 items-center justify-center">
      <main className="h-[60vh] w-3/4 bg-gray-900 rounded-lg shadow-lg flex">
        <div className="w-[40%] flex flex-col justify-center items-center bg-black rounded-l-lg p-8">
          <div className="flex flex-col items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
              alt="logo"
              className="h-16 mb-6"
            />
            {isSigninorSignup ? (
              <form
                className="flex flex-col gap-5 w-full"
                onSubmit={handleSubmit}
              >
                <Input
                  type="text"
                  placeholder="Enter your Name"
                  name="name"
                  required
                  value={SignUpformData.name}
                  onChange={handleChange}
                />
                <Input
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  required
                  value={SignUpformData.email}
                  onChange={handleChange}
                />
                <Input
                  type="password"
                  placeholder="Enter your Password"
                  className="placeholder:text-white"
                  name="password"
                  required
                  value={SignUpformData.password}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-4"
                >
                  Sign Up
                </button>
              </form>
            ) : (
              <form
                className="flex flex-col gap-5 w-full"
                onSubmit={handleSubmitSignIn}
              >
                <Input
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  required
                  value={signInFormData.email}
                  onChange={handleChangeSignIn}
                />
                <Input
                  type="password"
                  placeholder="Enter your Password"
                  className="placeholder:text-white"
                  name="password"
                  required
                  value={signInFormData.password}
                  onChange={handleChangeSignIn}
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-4"
                >
                  Sign In
                </button>
                {/* Show forgot password only if the password is wrong */}
                <p className="text-sm text-red-600 cursor-pointer">
                  {isPasswordWrong ? "Forgot password?" : ""}
                </p>
              </form>
            )}
          </div>
        </div>
        {/* Right Section */}
        <div className="w-[60%] text-white flex flex-col justify-evenly items-start bg-black rounded-r-lg p-2">
          <div>
            <img src="googlelogo.png" alt="logo" className="h-12 mb-1" />
            <h1 className="text-3xl font-semibold">Verify it’s you</h1>
          </div>
          <div className="flex flex-col items-end gap-4">
            <p className="text-sm text-gray-400">
              We won't post anything without your permission. By signing up, you
              agree to our Terms, Data Policy and Cookies Policy.
            </p>
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white py-1 w-1/2 rounded-3xl flex items-center justify-center gap-2"
            >
              <img src="googlelogo.png" alt="logo" className="h-9" />
              <p>Continue with Google</p>
            </button>
            <p className="text-sm text-gray-400">
              {isSigninorSignup
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
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

// import React from "react";
// import { Input } from "../components/ui/input";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { toast } from "sonner";

// export default function SignIn() {
//   const [isSigninorSignup, setIsSignInOrSignUp] = React.useState(true);
//   const [formData, setFormData] = React.useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [isLogin, setIsLogin] = React.useState(false);
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isSigninorSignup) {
//       try {
//         const res = await axios.post(
//           "http://localhost:4000/youtube/api/v1/user/register",
//           formData,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//             withCredentials: true,
//           }
//         );
//         if (res.data.success) {
//           setIsLogin(true);
//           toast.success(res.data.message || "User created successfully!", {
//             position: "top-right",
//             autoClose: 3000,
//             style: {
//               border: "1px solid #f44336",
//               background: "#ffebee",
//               color: "#f44336",
//             },
//           });
//         } else {
//           toast.error(res.data.message || "Registration failed!", {
//             position: "top-right",
//             autoClose: 3000,
//             style: {
//               border: "1px solid #f44336",
//               background: "#ffebee",
//               color: "#f44336",
//             },
//           });
//         }
//       } catch (error) {
//         console.log(
//           `Something went wrong on login User! err : ${error.message}`
//         );
//         toast.error(
//           error?.response?.data?.message ||
//             "Something went wrong on login User!",
//           {
//             position: "top-right",
//             autoClose: 3000,
//             style: {
//               border: "1px solid #f44336",
//               background: "#ffebee",
//               color: "#f44336",
//             },
//           }
//         );
//       }
//     } else {
//     }
//   };
//   return (
//     <div className="bg-zinc-900 h-screen w-screen flex flex-col gap-1 items-center justify-center">
//       <main className="h-[60vh] w-3/4 bg-gray-900 rounded-lg shadow-lg flex ">
//         <div className="w-[40%] flex flex-col justify-center items-center bg-black rounded-l-lg p-8">
//           <div className="flex flex-col items-center">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
//               alt="logo"
//               className="h-16 mb-6"
//             />
//             {isSigninorSignup ? (
//               <form
//                 className="flex flex-col gap-5 w-full"
//                 onSubmit={handleSubmit}
//               >
//                 <Input
//                   type="text"
//                   placeholder="Enter your Name"
//                   name="name"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//                 <Input
//                   type="email"
//                   placeholder="Enter your Email"
//                   name="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 <Input
//                   type="password"
//                   placeholder="Enter your Password"
//                   className="placeholder:text-white"
//                   name="password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-4"
//                 >
//                   Sign Up
//                 </button>
//               </form>
//             ) : (
//               <form className="flex flex-col gap-5 w-full">
//                 <Input type="email" placeholder="Enter your Email" />
//                 <Input
//                   type="password"
//                   placeholder="Enter your Password"
//                   className="placeholder:text-white"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-4"
//                 >
//                   Sign In
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//         <div className="w-[60%] text-white flex flex-col justify-evenly   items-start  bg-black rounded-r-lg p-2 ">
//           <div>
//             <img src="googlelogo.png" alt="logo" className="h-12 mb-1" />
//             <h1 className="text-3xl font-semibold">Verify it’s you</h1>
//           </div>
//           <div className="flex flex-col items-end gap-4">
//             <p className="text-sm text-gray-400">
//               We won't post anything without your permission. By signing up, you
//               agree to our Terms, Data Policy and Cookies Policy.
//             </p>
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white py-1   w-1/2 rounded-3xl flex items-center justify-center gap-2"
//             >
//               <img src="googlelogo.png" alt="logo" className="h-9" />
//               <p> continusly with google</p>
//             </button>
//             <p className="text-sm text-gray-400">
//               {isSigninorSignup
//                 ? "Already have an account?"
//                 : "Don't have an account?"}{" "}
//               {"  "}
//               <span
//                 className="text-blue-600 cursor-pointer"
//                 onClick={() => setIsSignInOrSignUp(!isSigninorSignup)}
//               >
//                 {isSigninorSignup ? "Sign In" : "Sign Up"}
//               </span>
//             </p>
//           </div>
//         </div>
//       </main>
//       <main className="h-12 w-3/4 flex justify-between ">
//         <div>
//           <p className=" text-sm text-zinc-400  font-semibold">
//             English (United States)
//           </p>
//         </div>
//         <div className="flex gap-4">
//           <span className=" text-sm text-zinc-400  font-semibold">Help</span>
//           <span className=" text-sm text-zinc-400  font-semibold">Privacy</span>
//           <span className=" text-sm text-zinc-400  font-semibold">Terms</span>
//         </div>
//       </main>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { Input } from "../components/ui/input";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom"; // Assuming you're using react-router-dom

// export default function SignIn() {
//   const [isSigninorSignup, setIsSignInOrSignUp] = useState(true);
//   const [SignUpformData, setSignUpFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [signInFormData, setSignInFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [isLogin, setIsLogin] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setSignUpFormData({ ...SignUpformData, [e.target.name]: e.target.value });
//   };

//   const handleChangeSignIn = (e) => {
//     setSignInFormData({ ...signInFormData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:4000/youtube/api/v1/user/register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message || "User created successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//           style: {
//             border: "1px solid #f44336",
//             background: "#0000ff",
//             color: "#ffffff",
//           },
//         });
//       } else {
//         toast.error(res.data.message || "Registration failed!", {
//           position: "top-right",
//           autoClose: 3000,
//           style: {
//             border: "1px solid #f44336",
//             background: "#ffebee",
//             color: "#f44336",
//           },
//         });
//       }
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || "Something went wrong on login User!",
//         {
//           position: "top-right",
//           autoClose: 3000,
//           style: {
//             border: "1px solid #f44336",
//             background: "#ffebee",
//             color: "#f44336",
//           },
//         }
//       );
//     }
//   };
//   const handleSubmitSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:4000/youtube/api/v1/user/login",
//         signInFormData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         navigate("/");
//         toast.success(res.data.message || "Login successful!", {
//           position: "top-right",
//           autoClose: 3000,
//           style: {
//             border: "1px solid #f44336",
//             background: "#0000ff",
//             color: "#ffffff",
//           },
//         });
//       } else {
//         toast.error(res.data.message || "Login failed!", {
//           position: "top-right",
//           autoClose: 3000,
//           style: {
//             border: "1px solid #f44336",
//             background: "#ffebee",
//             color: "#f44336",
//           },
//         });
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Login failed!", {
//         position: "top-right",
//         autoClose: 3000,
//         style: {
//           border: "1px solid #f44336",
//           background: "#ffebee",
//           color: "#f44336",
//         },
//       });
//     }
//   };
//   useEffect(() => {
//     if (isLogin) {
//       navigate("/");
//     }
//   }, [isLogin, navigate]);

//   return (
//     <div className="bg-zinc-900 h-screen w-screen flex flex-col gap-1 items-center justify-center">
//       <main className="h-[60vh] w-3/4 bg-gray-900 rounded-lg shadow-lg flex ">
//         <div className="w-[40%] flex flex-col justify-center items-center bg-black rounded-l-lg p-8">
//           <div className="flex flex-col items-center">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
//               alt="logo"
//               className="h-16 mb-6"
//             />
//             {isSigninorSignup ? (
//               <form
//                 className="flex flex-col gap-5 w-full"
//                 onSubmit={handleSubmit}
//               >
//                 <Input
//                   type="text"
//                   placeholder="Enter your Name"
//                   name="name"
//                   required
//                   value={SignUpformData.name}
//                   onChange={handleChange}
//                 />
//                 <Input
//                   type="email"
//                   placeholder="Enter your Email"
//                   name="email"
//                   required
//                   value={SignUpformData.email}
//                   onChange={handleChange}
//                 />
//                 <Input
//                   type="password"
//                   placeholder="Enter your Password"
//                   className="placeholder:text-white"
//                   name="password"
//                   required
//                   value={SignUpformData.password}
//                   onChange={handleChange}
//                 />
//                 <button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-4"
//                 >
//                   Sign Up
//                 </button>
//               </form>
//             ) : (
//               <form
//                 className="flex flex-col gap-5 w-full"
//                 onSubmit={handleSubmitSignIn}
//               >
//                 <Input
//                   type="email"
//                   placeholder="Enter your Email"
//                   name="email"
//                   required
//                   value={signInFormData.email}
//                   onChange={handleChangeSignIn}
//                 />
//                 <Input
//                   type="password"
//                   placeholder="Enter your Password"
//                   className="placeholder:text-white"
//                   name="password"
//                   required
//                   value={signInFormData.password}
//                   onChange={handleChangeSignIn}
//                 />
//                 <button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-4"
//                 >
//                   Sign In
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//         {/* Right Section */}
//         <div className="w-[60%] text-white flex flex-col justify-evenly   items-start  bg-black rounded-r-lg p-2 ">
//           <div>
//             <img src="googlelogo.png" alt="logo" className="h-12 mb-1" />
//             <h1 className="text-3xl font-semibold">Verify it’s you</h1>
//           </div>
//           <div className="flex flex-col items-end gap-4">
//             <p className="text-sm text-gray-400">
//               We won't post anything without your permission. By signing up, you
//               agree to our Terms, Data Policy and Cookies Policy.
//             </p>
//             <button
//               type="button"
//               className="bg-blue-600 hover:bg-blue-700 text-white py-1 w-1/2 rounded-3xl flex items-center justify-center gap-2"
//             >
//               <img src="googlelogo.png" alt="logo" className="h-9" />
//               <p>Continue with Google</p>
//             </button>
//             <p className="text-sm text-gray-400">
//               {isSigninorSignup
//                 ? "Already have an account?"
//                 : "Don't have an account?"}{" "}
//               <span
//                 className="text-blue-600 cursor-pointer"
//                 onClick={() => setIsSignInOrSignUp(!isSigninorSignup)}
//               >
//                 {isSigninorSignup ? "Sign In" : "Sign Up"}
//               </span>
//             </p>
//           </div>
//         </div>
//       </main>
//       <main className="h-12 w-3/4 flex justify-between ">
//         <div>
//           <p className=" text-sm text-zinc-400  font-semibold">
//             English (United States)
//           </p>
//         </div>
//         <div className="flex gap-4">
//           <span className=" text-sm text-zinc-400  font-semibold">Help</span>
//           <span className=" text-sm text-zinc-400  font-semibold">Privacy</span>
//           <span className=" text-sm text-zinc-400  font-semibold">Terms</span>
//         </div>
//       </main>
//     </div>
//   );
// }
