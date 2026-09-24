import React, { useState, useEffect } from 'react';
import { fetchAllCourses, fetchAllInstructors, assignLecture } from '../services/api';

export default function ScheduleForm({ onScheduleAdded }) {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    instructorId: '',
    batchName: '',
    date: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadData = async () => {
    try {
      const [cRes, iRes] = await Promise.all([fetchAllCourses(), fetchAllInstructors()]);
      setCourses(cRes.data.data || []);
      setInstructors(iRes.data.data || []);

      if (cRes.data.data?.length > 0) setFormData(prev => ({ ...prev, courseId: cRes.data.data[0]._id }));
      if (iRes.data.data?.length > 0) setFormData(prev => ({ ...prev, instructorId: iRes.data.data[0]._id }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.batchName) {
      setError('Sabhi fields fill karna zaroori hai.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await assignLecture(formData);
      setSuccess(res.data.message || 'Lecture successfully scheduled!');
      setFormData(prev => ({ ...prev, batchName: '', date: '' }));
      if (onScheduleAdded) onScheduleAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Error scheduling lecture. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-slate-100">Schedule New Lecture / Batch</h2>

      {error && (
        <div className="mb-4 p-3 text-xs bg-red-950/50 border border-red-800/60 text-red-300 rounded-xl">
          ⚠️ <strong>Schedule Clash Alert:</strong> {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 text-xs bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 rounded-xl">
          ✅ {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Select Course</label>
            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {courses.map(c => (
                <option key={c._id} value={c._id} className="bg-slate-900">{c.name} ({c.level})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Assign Instructor</label>
            <select
              name="instructorId"
              value={formData.instructorId}
              onChange={handleChange}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {instructors.map(i => (
                <option key={i._id} value={i._id} className="bg-slate-900">{i.name} ({i.email})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Batch / Lecture Name</label>
            <input
              type="text"
              name="batchName"
              value={formData.batchName}
              onChange={handleChange}
              placeholder="e.g. Batch Alpha / Lecture 01"
              required
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Lecture Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-colors scheme-dark"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl font-semibold transition text-sm disabled:bg-slate-800 disabled:text-slate-500 shadow-md"
        >
          {loading ? 'Checking Clash & Assigning...' : 'Assign Lecture'}
        </button>
      </form>
    </div>
  );
}