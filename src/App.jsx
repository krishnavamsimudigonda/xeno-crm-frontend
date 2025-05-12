import { useState } from "react";
import CampaignForm from "./components/CampaignForm";
import CampaignHistory from "./components/CampaignHistory";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 font-sans text-gray-900 relative overflow-x-hidden">
      {/* Top-right Sign Out */}
      {/* Top-right Sign Out */}
    <div className="fixed top-6 right-6 z-50">
      <button
       onClick={() => setUser(null)}
       className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-lg text-sm font-semibold transition duration-300"
      >
       Sign Out
      </button>
    </div>


      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-12 px-6 animate-fade-in space-y-20">
        
        {/*  Create a Campaign */}
        <section className="bg-white shadow-xl rounded-2xl p-10 border border-purple-200">
          <h2 className="text-3xl font-extrabold text-indigo-700 flex items-center gap-3">
             Create a Campaign
          </h2>
          <p className="mt-2 text-base text-gray-600 max-w-3xl">
            Launch your own CRM campaign by entering the campaign name, targeting rules, and custom message. You can use rules to filter customers and craft messages for your ideal audience.
          </p>
          <div className="mt-6">
            <CampaignForm />
          </div>
        </section>

        {/*  AI Suggestions */}
        <section className="bg-white shadow-xl rounded-2xl p-10 border border-blue-200">
          <h2 className="text-3xl font-extrabold text-indigo-700 flex items-center gap-3">
             AI Message Generator
          </h2>
          <p className="mt-2 text-base text-gray-600 max-w-3xl">
            Don’t know what to write? Use our AI assistant to generate effective, engaging messages based on your campaign goal. It’s quick, context-aware, and designed to convert.
          </p>
          {/* This component is inside CampaignForm */}
        </section>

        {/*  Campaign History */}
        <section className="bg-white shadow-xl rounded-2xl p-10 border border-blue-200">
          <h2 className="text-3xl font-extrabold text-indigo-700 flex items-center gap-3">
             Campaign History
          </h2>
          <p className="mt-2 text-base text-gray-600 max-w-3xl">
            Want to track your progress? View all launched campaigns, how many customers were reached, and whether messages were successfully delivered. Great for auditing performance.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition"
            >
              {showHistory ? "Hide" : "View"} Campaign History
            </button>
            {showHistory && (
              <div className="mt-6 animate-fade-in">
                <CampaignHistory />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
