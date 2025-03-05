import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    };

    console.log(userData);

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen p-7 flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="uber-driver-logo-png"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-base mb-2">What's your name</h3>
          <div className="flex gap-4 mb-5">
            <input
              className="bg-[#eeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              type="text"
              required
              placeholder="First name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              className="bg-[#eeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              type="text"
              required
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <h3 className="text-base mb-2">What's your email</h3>
          <input
            className="bg-[#eeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            required
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-base mb-2">Enter Password</h3>
          <input
            className="bg-[#eeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="password"
            required
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base">
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to={"/user-login"} className="text-blue-600 font-semibold">
            Login
          </Link>{" "}
        </p>
      </div>
      <div>
        <p className="text-center text-[10px] leading-3">
          By proceeding. you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
