import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchInstructorSchedules } from '../services/api';

export default function InstructorDashboard() {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSchedules = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await fetchInstructorSchedules(user.id);
      setSchedules(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError('Schedules load karne me problem aayi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, [user]);


  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const cleanDate = dateString.split('T')[0];
    const [year, month, day] = cleanDate.split('-');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day} ${months[parseInt(month, 10) - 1] || month} ${year}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex justify-between items-center relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100">Welcome back, {user?.name}! 👋</h2>
          <p className="text-slate-400 text-xs mt-1">
            Instructor Portal • <span className="text-indigo-400">{user?.email}</span>
          </p>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md px-5 py-2.5 rounded-xl border border-slate-700/60 text-right">
          <span className="block text-2xl font-extrabold text-indigo-400">{schedules.length}</span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Assigned Lectures</span>
        </div>
      </div>

      {/* Main Schedule */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100">Your Assigned Schedule</h3>
            <p className="text-xs text-slate-400 mt-0.5">Upcoming lectures and batch details</p>
          </div>
          <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-medium">
            {schedules.length} Active
          </span>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500 text-sm">Loading schedules...</div>
        ) : error ? (
          <div className="p-4 bg-red-950/40 text-red-400 rounded-xl text-sm border border-red-800/50">{error}</div>
        ) : schedules.length === 0 ? (
          <div className="text-center py-12 bg-slate-950/50 rounded-2xl border border-dashed border-slate-800">
            <p className="text-slate-400 font-semibold text-sm">No lectures assigned</p>
            <p className="text-xs text-slate-500 mt-1">Assignments will appear here once available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {schedules.map((item) => (
              <div
                key={item._id}
                className="group border border-slate-800 hover:border-indigo-500/60 rounded-xl p-5 bg-slate-950/60 hover:bg-slate-950 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center space-x-3.5 mb-3.5">
                    <img
                      src={item.course?.image || 'https://via.placeholder.com/100'}
                      alt={item.course?.name}
                      className="w-12 h-12 object-cover rounded-lg border border-slate-800 flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">
                        {item.course?.level || 'Course'}
                      </span>
                      <h4 className="font-bold text-slate-100 text-sm mt-1 leading-snug group-hover:text-indigo-400 transition-colors">
                        {item.course?.name}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {item.course?.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-slate-500 block text-[9px] font-bold uppercase tracking-wider">BATCH</span>
                    <span className="font-bold text-slate-200">{item.batchName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block text-[9px] font-bold uppercase tracking-wider">DATE</span>
                    <span className="font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md inline-block mt-0.5 border border-indigo-500/20">
                      {formatDate(item.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

}