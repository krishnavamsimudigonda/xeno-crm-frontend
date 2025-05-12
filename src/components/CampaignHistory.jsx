import { useEffect, useState } from "react";
import axios from "axios";

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/campaigns")
      .then((res) => setCampaigns(res.data.reverse()))
      .catch((err) => console.error("Error fetching campaigns:", err));
  }, []);

  return (
    <div className="overflow-x-auto animate-fade-in">
      {campaigns.length === 0 ? (
        <p className="text-gray-500">No campaign history available.</p>
      ) : (
        <table className="min-w-full border-separate border-spacing-y-2 text-sm">
          <thead>
            <tr className="text-left text-gray-600 uppercase text-xs tracking-wider">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Audience</th>
              <th className="px-4 py-2">Sent</th>
              <th className="px-4 py-2">Failed</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr
                key={c._id}
                className="bg-white hover:bg-indigo-50 transition rounded-lg shadow-sm"
              >
                <td className="px-4 py-2 font-medium">{c.name}</td>
                <td className="px-4 py-2">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{c.audienceSize}</td>
                <td className="px-4 py-2 text-green-600 font-semibold">
                  {Math.floor(c.audienceSize * 0.9)}
                </td>
                <td className="px-4 py-2 text-red-500 font-semibold">
                  {Math.ceil(c.audienceSize * 0.1)}
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
