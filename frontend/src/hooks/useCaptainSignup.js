import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../constants";

const useCaptianSignup = () => {
  const [loading, setLoading] = useState(false);

  const captainSignUp = async (captainData) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/captain/create-captain`,
        {
          ...captainData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response: ", response);

      if (response.status !== 201) {
        throw new Error("Error signing up captain");
      }

      const createdCaptainData = response.data.data;
      const token = response.data.token;

      console.log("Captain signed up!: ", createdCaptainData);
      console.log("Token: ", token);
    } catch (error) {
      console.error("Error signing up captain: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, captainSignUp };
};

export default useCaptianSignup;
