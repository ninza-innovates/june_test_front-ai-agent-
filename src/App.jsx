import React, { useState } from 'react';
import axios from 'axios';


const App = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form submission to send query to Flask backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axios.post('http://localhost:5000/query', { query });
      setResponse(res.data.output);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold text-indigo-800 mb-8 tracking-tight">
        June: Smart AI Rental Agent
      </h1>
      
      {/* Query input form */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="query" className="block text-sm font-medium text-gray-800">
            Ask June
          </label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder-gray-400"
            placeholder="e.g., Check departing tenant engagement with days=7"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition duration-200"
        >
          {loading ? 'Processing...' : 'Submit Query'}
        </button>
      </div>

      {/* Response display */}
      {response && (
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Response</h2>
          <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 overflow-auto max-h-96">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="w-full max-w-md bg-red-50 rounded-xl shadow-lg p-6 text-red-800">
          <h2 className="text-xl font-semibold mb-3">Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default App;