import React, { useState } from "react";
import { Link } from "react-router-dom";
import useCaptainSignupRenderStore from "../stores/captainSignupRenderStore";
import useUserStore from "../stores/userStore";

const CaptainSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [numberPlate, setNumberPLate] = useState("");
  const [color, setColor] = useState("");
  const vehicleTypeEnum = ["Car", "Auto", "Bike"];
  const {
    captainSignupRender,
    setCaptainSignupRender,
    removeCaptainSignupRender,
  } = useCaptainSignupRenderStore();
  const { user, setUser } = useUserStore();

  const nextHandler = () => {
    if (!firstname || !lastname || !email || !password) {
      alert("All Personal Details are required");
      return;
    }

    setUser({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });

    setCaptainSignupRender("Vehicle");
  };

  const goBackHandler = () => {
    setFirstname(user.fullname.firstname);
    setLastname(user.fullname.lastname);
    setEmail(user.email);
    setPassword(user.password);

    setCaptainSignupRender("Personal");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!vehicleType || !capacity || !numberPlate || !color) {
      alert("All Vehicle Details are required");
      return;
    }

    setUser({
      fullname: {
        firstname: user.fullname.firstname,
        lastname: user.fullname.lastname,
      },
      email: user.email,
      password: user.password,
      vehicleType,
      color,
      numberPlate,
      capacity,
    });

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setVehicleType("");
    setCapacity("");
    setNumberPLate("");
    setColor("");

    removeCaptainSignupRender();
  };

  return (
    <div className="h-screen p-7 flex flex-col justify-between">
      <div>
        {/* <img
          className="w-16 mb-10"
          src="https://pngimg.com/d/uber_PNG24.png"
          alt="uber-driver-logo-png"
        /> */}
        <form onSubmit={submitHandler}>
          {captainSignupRender === "Personal" ? (
            <>
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
              <button
                onClick={nextHandler}
                className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base"
              >
                Next
              </button>
            </>
          ) : (
            <>
              <h3 className="text-base mb-2">
                What's your Vehicle Type and Capacity
              </h3>
              <div className="flex gap-4 mb-5">
                <select
                  className="bg-[#eeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                  required
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  name=""
                  id=""
                >
                  <option value="" disabled>
                    Select vehicle type
                  </option>
                  {vehicleTypeEnum.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <input
                  className="bg-[#eeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
                  type="text"
                  required
                  placeholder="Capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </div>
              <h3 className="text-base mb-2">What's your Vehicle Number</h3>
              <input
                className="bg-[#eeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                type="text"
                required
                placeholder="KA-01-AB-1234"
                value={numberPlate}
                onChange={(e) => setNumberPLate(e.target.value)}
              />
              <h3 className="text-base mb-2">What is you Vehicle Color</h3>
              <input
                className="bg-[#eeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                type="text"
                required
                placeholder="Black"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <button
                onClick={goBackHandler}
                className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base"
              >
                Go Back
              </button>
              <button
                type="submit"
                // onClick={() => removeCaptainSignupRender()}
                className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base"
              >
                Sign Up
              </button>
            </>
          )}
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
