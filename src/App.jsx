import { useState } from "react";
import CampaignForm from "./components/CampaignForm";
import CampaignHistory from "./components/CampaignHistory";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Welcome, {user.displayName} 👋</h1>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>

          {/* Campaign Creation with AI */}
          <CampaignForm />

          {/* Campaign History Table */}
          <CampaignHistory />
        </>
      )}
    </main>
  );
}

export default App;
