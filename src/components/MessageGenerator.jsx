import { useState } from "react";
import axios from "axios";
import { ClipboardCopy, Sparkles } from "lucide-react";

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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
        <Sparkles size={20} className="text-yellow-500" /> AI Message Generator
      </h3>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="e.g. Re-engage inactive users"
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleGenerate}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="space-y-2">
          {suggestions.map((msg, i) => (
            <li
              key={i}
              className="bg-gray-100 p-3 rounded-lg flex justify-between items-center hover:bg-gray-200 cursor-pointer"
              onClick={() => onSelect(msg)}
            >
              <span className="text-gray-800">{msg}</span>
              <ClipboardCopy
                size={18}
                className="text-gray-400 hover:text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(msg);
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageGenerator;
