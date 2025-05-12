import { useState } from "react";
import axios from "axios";
import MessageGenerator from "./MessageGenerator";

const CampaignForm = () => {
  const [name, setName] = useState("");
  const [rule, setRule] = useState(`{ "totalSpend": { "$gt": 5000 } }`);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedRule = JSON.parse(rule);
      const res = await axios.post("http://localhost:5000/api/campaigns", {
        name,
        rule: parsedRule,
        message,
      });
      setResult(res.data);
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 animate-slide-up"
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Campaign Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg"
            placeholder="E.g. High Value Customers"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Audience Rule (JSON)
          </label>
          <textarea
            value={rule}
            onChange={(e) => setRule(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-sm"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md font-semibold transition"
        >
          🚀 Launch Campaign
        </button>
      </form>

      {/* AI Suggestions */}
      <div>
        <MessageGenerator onSelect={(msg) => setMessage(msg)} />
      </div>

      {result && (
        <div className="bg-green-100 border border-green-400 text-green-800 p-4 rounded-md shadow-sm animate-fade-in mt-4">
          <strong>✅ Campaign Created!</strong>
          <p><b>Audience:</b> {result.campaign.audienceSize}</p>
          <p><b>Sent:</b> {result.sent}</p>
          <p><b>Failed:</b> {result.failed}</p>
        </div>
      )}
    </div>
  );
};

export default CampaignForm;
