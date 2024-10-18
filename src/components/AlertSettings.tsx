import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AlertSettings: React.FC = () => {
  const [threshold, setThreshold] = useState('1.5');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Alert set for opportunities above ${threshold}%`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Alert Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="threshold" className="block mb-1">
            Profit Threshold (%)
          </label>
          <input
            type="number"
            id="threshold"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="w-full p-2 border rounded"
            step="0.1"
            min="0"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Set Alert
        </button>
      </form>
    </div>
  );
};

export default AlertSettings;