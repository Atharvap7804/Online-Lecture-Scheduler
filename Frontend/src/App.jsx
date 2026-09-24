import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './Pages/LoginPage';
import AdminDashboard from './Pages/AdminDashboard';
import InstructorDashboard from './Pages/InstructorDashboard';

function MainLayout() {
  const { user, logout } = useAuth();

  // Agar user logged in nahi hai, toh Login Page dikhao
  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100">
      {/* Dark Glassmorphic Navbar */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black tracking-wider text-indigo-400">
              Lecture <span className="text-slate-300 font-light">Scheduler</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Logged in as: <span className="font-semibold text-slate-200">{user.name}</span> ({user.role.toUpperCase()})
            </p>
          </div>
          <button
            onClick={logout}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold px-4 py-2 rounded-xl transition border border-slate-700/80 shadow-inner"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Dark Workspace */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {user.role === 'admin' ? (
          <AdminDashboard />
        ) : (
          <InstructorDashboard />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}