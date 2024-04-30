import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");
    const verificationCode = searchParams.get("verificationCode");
    if (email && verificationCode) {
      verifyEmail(email, verificationCode);
    }
  }, [location.search]);

  const verifyEmail = async (email, verificationCode) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:6969/api/verifyEmail",
        { email, verificationCode }
      );
      console.log(response.data); // Handle success response
      navigate("/login"); // Redirect to success page
    } catch (error) {
      setError(error.response.data); // Handle error response
    }
  };

  return (
    <div>
      <h1>Verify Email</h1>
      <p>Please wait while we verify your email...</p>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default VerifyEmailPage;
