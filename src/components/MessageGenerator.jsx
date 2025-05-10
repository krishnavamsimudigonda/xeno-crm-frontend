import { useState } from "react";
import axios from "axios";

const MessageGenerator = ({ onSelect }) => {
  const [intent, setIntent] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setSuggestions([]);
    try {
      const res = await axios.post("http://localhost:5000/api/ai/suggest", {
        intent,
      });
      setSuggestions(res.data.suggestions);
    } catch (err) {
      alert("AI generation failed.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 mt-6 rounded shadow">
      <h3 className="font-semibold mb-2">🧠 AI Message Generator</h3>
      <input
        type="text"
        className="border p-2 w-full rounded mb-3"
        placeholder="Enter campaign intent (e.g. bring back inactive users)"
        value={intent}
        onChange={(e) => setIntent(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Suggestions"}
      </button>

      <ul className="mt-4 space-y-2">
        {suggestions.map((msg, i) => (
          <li
            key={i}
            className="bg-gray-100 p-2 rounded hover:bg-gray-200 cursor-pointer"
            onClick={() => onSelect(msg)}
          >
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageGenerator;
