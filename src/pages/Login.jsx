import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useState } from "react";

const Login = ({ onLogin }) => {
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      onLogin(result.user);
    } catch (err) {
      setError("Login failed: " + err.message);
    }
  };

  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl mb-4 font-semibold">Xeno CRM Login</h2>
      <button
        onClick={handleLogin}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
      >
        Sign in with Google
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Login;
