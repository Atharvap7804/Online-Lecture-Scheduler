import React, { useState } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { authenticator } from '../services/imagekitAuth';
import { addCourse } from '../services/api';

const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

export default function CourseForm({ onCourseAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    level: 'Beginner',
    description: '',
    image: ''
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onError = (err) => {
    console.error('ImageKit Upload Error:', err);
    setUploading(false);
    setMessage('❌ Image upload failed. Please try again.');
  };

  const onSuccess = (res) => {
    setFormData((prev) => ({ ...prev, image: res.url }));
    setUploading(false);
    setMessage('✅ Image successfully uploaded!');
  };

  const onUploadStart = () => {
    setUploading(true);
    setMessage('⏳ Image uploading... Please wait.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      setMessage('⚠️ Please upload a course banner image before submitting.');
      return;
    }

    try {
      await addCourse(formData);
      setMessage('🎉 Course successfully added!');
      setFormData({ name: '', level: 'Beginner', description: '', image: '' });
      if (onCourseAdded) onCourseAdded();
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.message || 'Error adding course. Please try again.'));
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-slate-100">Add New Course</h2>
      
      {message && (
        <div className="mb-4 p-3 text-xs bg-indigo-500/10 text-indigo-300 rounded-lg border border-indigo-500/20">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Course Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. Full Stack Web Development"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="Beginner" className="bg-slate-900">Beginner</option>
              <option value="Intermediate" className="bg-slate-900">Intermediate</option>
              <option value="Advanced" className="bg-slate-900">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Course Banner Image</label>
            <IKContext
              publicKey={publicKey}
              urlEndpoint={urlEndpoint}
              authenticator={authenticator}
            >
              <IKUpload
                fileName="course_banner.png"
                onError={onError}
                onSuccess={onSuccess}
                onUploadStart={onUploadStart}
                className="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 cursor-pointer"
              />
            </IKContext>
          </div>
        </div>

        {formData.image && (
          <div className="mt-2">
            <p className="text-[11px] text-slate-400 mb-1">Uploaded Preview:</p>
            <img src={formData.image} alt="Preview" className="h-20 w-32 object-cover rounded-lg border border-slate-800" />
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="Course overview and syllabus details..."
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl font-semibold transition text-sm disabled:bg-slate-800 disabled:text-slate-500 shadow-md"
        >
          {uploading ? 'Uploading Image...' : 'Add Course'}
        </button>
      </form>
    </div>
  );
}