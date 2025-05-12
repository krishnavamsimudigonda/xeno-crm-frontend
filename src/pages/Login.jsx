// src/pages/Login.jsx
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function Login({ onLogin }) {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      onLogin(result.user); // ✅ Pass user up to App
    } catch (err) {
      alert("Login failed. Please check console.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in">
        
        {/* 💡 Left - Intro */}
        <div className="flex-1 p-10 bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold leading-tight mb-4">🚀 Welcome to Xeno CRM</h1>
          <ul className="mt-4 space-y-2 text-lg font-medium">
            <li>🎯 Launch data-driven campaigns</li>
            <li>🤖 Use AI to write powerful messages</li>
            <li>📈 Track performance in real-time</li>
          </ul>
          <p className="mt-6 text-sm text-white/80">Join us in revolutionizing customer engagement.</p>
        </div>

        {/* 🙌 Right - Sign In */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">👋 Hi there</h2>
          <p className="text-gray-600 mb-6">Sign in to launch your CRM campaigns.</p>
          <button
            onClick={handleGoogleSignIn}
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-md font-semibold shadow-md transition"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
