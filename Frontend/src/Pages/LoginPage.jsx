import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchAllInstructors } from '../services/api';

export default function LoginPage() {
  const { login } = useAuth();
  const [role, setRole] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllInstructors()
      .then((res) => {
        setInstructors(res.data.data || []);
        if (res.data.data?.length > 0) {
          setSelectedInstructor(res.data.data[0]._id);
        }
      })
      .catch((err) => console.error('Error fetching instructors:', err));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (role === 'admin') {
      if (adminPassword === 'admin123') {
        login({ name: 'System Admin', role: 'admin' });
      } else {
        setError('Invalid Admin Passcode! (Default: admin123)');
      }
    } else {
      const inst = instructors.find((i) => i._id === selectedInstructor);
      if (inst) {
        login({ id: inst._id, name: inst.name, email: inst.email, role: 'instructor' });
      } else {
        setError('Please select an instructor');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-100 tracking-wide">
            Lecture Scheduling <span className="text-indigo-400 font-normal">Portal</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Online Lecture Scheduling System</p>
        </div>

        {error && (
          <div className="mb-5 p-3 text-xs bg-red-950/50 border border-red-800/60 text-red-300 rounded-xl">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Select Portal Role
            </label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setError('');
              }}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="admin" className="bg-slate-900">Admin Panel</option>
              <option value="instructor" className="bg-slate-900">Instructor Panel</option>
            </select>
          </div>

          {role === 'admin' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Passcode
              </label>
              <input
                type="password"
                placeholder="Enter passcode (admin123)"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <p className="text-[11px] text-slate-500 mt-2">
                Default demo passcode: <code className="bg-slate-950 text-indigo-400 px-1.5 py-0.5 rounded border border-slate-800">admin123</code>
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Select Instructor Account
              </label>
              <select
                value={selectedInstructor}
                onChange={(e) => setSelectedInstructor(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              >
                {instructors.length === 0 && <option value="" className="bg-slate-900">No instructors found</option>}
                {instructors.map((inst) => (
                  <option key={inst._id} value={inst._id} className="bg-slate-900">
                    {inst.name} ({inst.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold text-sm transition shadow-md active:scale-[0.99]"
          >
            Login to {role === 'admin' ? 'Admin' : 'Instructor'} Portal
          </button>
        </form>
      </div>
    </div>
  );
}