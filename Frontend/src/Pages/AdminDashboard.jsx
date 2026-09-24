import React, { useState, useEffect } from 'react';

import ScheduleForm from '../components/ScheduleForm';
import CourseForm from '../components/CourseForm';
import { fetchAllCourses, fetchAllInstructors } from '../services/api';

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const loadAllData = async () => {
    try {
      const [cRes, iRes] = await Promise.all([fetchAllCourses(), fetchAllInstructors()]);
      setCourses(cRes.data.data || []);
      setInstructors(iRes.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

 return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CourseForm onCourseAdded={loadAllData} />
        <ScheduleForm onScheduleAdded={loadAllData} />
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100">All Created Courses</h3>
            <p className="text-xs text-slate-400 mt-0.5">Available courses</p>
          </div>
          <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-medium">
            {courses.length} Total
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course._id} className="border border-slate-800 rounded-xl p-3.5 bg-slate-950/60 hover:border-indigo-500/50 transition-all flex space-x-3.5 items-center">
              <img src={course.image} alt={course.name} className="w-14 h-14 object-cover rounded-lg border border-slate-800 flex-shrink-0" />
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">
                  {course.level}
                </span>
                <h4 className="font-bold text-slate-100 text-sm mt-1">{course.name}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}