import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'

const Applications = () => {
  const [isEdit, setIsedit] = useState(false)
  const [resume, setResume] = useState(null)

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-12">
        <div className="container px-4 2xl:px-20 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
            <p className="text-gray-600">Track and manage your job applications</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Resume</h2>
                <p className="text-sm text-gray-500">Upload or update your resume</p>
              </div>
            </div>

            {isEdit ? (
              <div className="flex flex-wrap gap-3">
                <label
                  className="flex items-center gap-3 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 px-6 py-3 rounded-xl cursor-pointer transition-all"
                  htmlFor="resumeUpload"
                >
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="font-semibold text-blue-600">
                    {resume ? resume.name : 'Select Resume'}
                  </span>
                  <input
                    id="resumeUpload"
                    onChange={(e) => setResume(e.target.files[0])}
                    accept="application/pdf"
                    type="file"
                    hidden
                  />
                </label>

                <button
                  onClick={() => setIsedit(false)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Save Resume
                </button>

                <button
                  onClick={() => setIsedit(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <a
                  className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold px-6 py-3 rounded-xl transition-all border-2 border-blue-200"
                  href="#"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  View Resume
                </a>

                <button
                  onClick={() => setIsedit(true)}
                  className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all border-2 border-gray-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Applied Jobs</h2>
              <p className="text-sm text-gray-500 mt-1">{jobsApplied.length} applications</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Company</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Job Title</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 max-sm:hidden">Location</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 max-sm:hidden">Applied On</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobsApplied.map((job, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg p-2 flex-shrink-0">
                            <img className="w-full h-full object-contain" src={job.logo} alt="" />
                          </div>
                          <span className="font-medium text-gray-900">{job.company}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-700">{job.title}</td>
                      <td className="py-4 px-6 text-gray-600 max-sm:hidden">{job.location}</td>
                      <td className="py-4 px-6 text-gray-600 max-sm:hidden">{moment(job.date).format('ll')}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            job.status === 'Accepted'
                              ? 'bg-green-100 text-green-700 border border-green-200'
                              : job.status === 'Rejected'
                              ? 'bg-red-100 text-red-700 border border-red-200'
                              : 'bg-blue-100 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Applications
