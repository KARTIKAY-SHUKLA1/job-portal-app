import React, { useContext, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const description = quillRef.current?.root.innerHTML || '';

      const { data } = await axios.post(
        `${backendUrl}/api/company/post-job`,
        { title, description, salary, location, category, level },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setTitle('');
        setSalary(0);
        if (quillRef.current) quillRef.current.root.innerHTML = '';
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred!');
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      const quillInstance = new Quill(editorRef.current, { 
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link'],
            ['clean']
          ]
        }
      });
      quillRef.current = quillInstance;
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
        <p className="text-gray-600">Fill in the details to create a new job posting</p>
      </div>

      <form onSubmit={onSubmitHandler} className="bg-white rounded-2xl shadow-lg p-8">
        {/* Job Title */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Job Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Senior Frontend Developer"
            type="text"
            value={title}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Job Description
          </label>
          <div 
            ref={editorRef} 
            className="border-2 border-gray-200 rounded-xl min-h-[250px] focus-within:border-blue-500 transition-all"
          ></div>
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Category */}
          <div>
            <label className="text-gray-700 font-semibold mb-3 block">
              Category
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                {JobCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-gray-700 font-semibold mb-3 block">
              Location
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              >
                {JobLocations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Level */}
          <div>
            <label className="text-gray-700 font-semibold mb-3 block">
              Experience Level
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
                onChange={(e) => setLevel(e.target.value)}
                value={level}
              >
                <option value="Beginner level">Beginner</option>
                <option value="Intermediate level">Intermediate</option>
                <option value="Senior level">Senior</option>
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Salary */}
          <div>
            <label className="text-gray-700 font-semibold mb-3 block">
              Salary (₹/year)
            </label>
            <input
              min={0}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              onChange={(e) => setSalary(Number(e.target.value))}
              type="number"
              placeholder="500000"
              value={salary}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Post Job
          </button>
          <button
            type="button"
            onClick={() => {
              setTitle('');
              setSalary(0);
              if (quillRef.current) quillRef.current.root.innerHTML = '';
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-xl transition-all"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;