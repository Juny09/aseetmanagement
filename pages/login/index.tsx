// import React, { useEffect, useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/router";
// import validateEmail from "../../.lib/utils";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [emailInputError, setEmailInputError] = useState(false);
//   const [passwordInputError, setPasswordInputError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     validate();
//   }, [email, password]);

//   async function handleSubmit(e: { preventDefault: () => void; }) {
//     e.preventDefault();
//     let res = await signIn("credentials", {
//       email,
//       password,
//       callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`,
//       redirect: false,
//     });

//     if (res?.ok) {
//       console.log("success");
//       return;
//     } else {
//       setError("Failed! Check your input and try again.");
//       console.log("Failed", res);
//     }
//     return res;
//   }

//   function validate() {
//     let emailIsValid = validateEmail(email);

//     if (!emailIsValid) {
//       setEmailInputError(true);
//       return;
//     }
//     if (password.length < 6) {
//       setPasswordInputError(true);
//     } else {
//       setEmailInputError(false);
//       setPasswordInputError(false);
//     }
//   }

//   return (
//     <div className="flex justify-center items-center m-auto p-3">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//       >
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="email"
//           >
//             Email
//           </label>
//           <input
//             className={`border-${emailInputError ? "red-500" : ""} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
//             id="email"
//             type="text"
//             placeholder="Email"
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//               setEmail(e.target.value);
//             }}
//           />
//         </div>
//         <div className="mb-6">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="password"
//           >
//             Password
//           </label>
//           <input
//             className={`border-${passwordInputError ? "red-500" : ""} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
//             id="password"
//             type="password"
//             placeholder="******************"
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//               setPassword(e.target.value);
//             }}
//           />
//           <p className="text-red-500 text-xs italic">Please choose a password.</p>
//         </div>
//         <div className="flex items-center justify between">
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             type="submit"
//             disabled={isLoading ? true : false}
//           >
//             {isLoading ? "Loading..." : "Sign In"}
//           </button>
//           <a
//             className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
//             href="#"
//           >
//             Forgot Password?
//           </a>
//         </div>
//       </form>
//     </div>
//   );
// }
