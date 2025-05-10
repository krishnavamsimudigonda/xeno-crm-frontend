import { useState } from "react";
import axios from "axios";
import MessageGenerator from "./MessageGenerator"; // ✅ Make sure this import is here

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
    <div className="bg-white p-4 shadow-md rounded-md w-full max-w-xl">
      <h2 className="text-xl font-semibold mb-4">📢 Create Campaign</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Campaign Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          placeholder='Rule (e.g. { "totalSpend": { "$gt": 5000 } })'
          value={rule}
          onChange={(e) => setRule(e.target.value)}
          rows={3}
          className="border p-2 w-full rounded font-mono"
          required
        />

        <textarea
          placeholder="Message to send"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          className="border p-2 w-full rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🚀 Launch Campaign
        </button>
      </form>

      {/* ✅ AI Message Suggestions */}
      <MessageGenerator onSelect={(msg) => setMessage(msg)} />

      {result && (
        <div className="mt-4 bg-green-100 p-3 rounded border border-green-400">
          <p><strong>✅ Campaign created!</strong></p>
          <p><b>Audience:</b> {result.campaign.audienceSize}</p>
          <p><b>Sent:</b> {result.sent}</p>
          <p><b>Failed:</b> {result.failed}</p>
        </div>
      )}
    </div>
  );
};

export default CampaignForm;
