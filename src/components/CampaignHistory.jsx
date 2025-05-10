import { useEffect, useState } from "react";
import axios from "axios";

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/campaigns")
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error("Failed to fetch campaigns:", err));
  }, []);

  return (
    <div className="mt-8 bg-white p-4 rounded shadow w-full max-w-3xl">
      <h2 className="text-xl font-bold mb-4">📊 Campaign History</h2>
      {campaigns.length === 0 ? (
        <p className="text-gray-500">No campaigns yet.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Created</th>
              <th className="border px-4 py-2">Audience</th>
              <th className="border px-4 py-2">Sent</th>
              <th className="border px-4 py-2">Failed</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((camp) => (
              <tr key={camp._id}>
                <td className="border px-4 py-2">{camp.name}</td>
                <td className="border px-4 py-2">
                  {new Date(camp.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{camp.audienceSize}</td>
                <td className="border px-4 py-2">
                  {Math.round(camp.audienceSize * 0.9)}
                </td>
                <td className="border px-4 py-2">
                  {Math.round(camp.audienceSize * 0.1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CampaignHistory;
