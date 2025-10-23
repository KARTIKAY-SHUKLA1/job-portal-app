import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";

const Applyjob = () => {
  const { id } = useParams();
  const [JobData, setJobData] = useState(null);
  const { jobs, backendUrl, userData, userApplications } = useContext(AppContext);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`);
      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error('Login to apply for jobs');
      }
      if (!userData.resume) {
        return toast.error('Upload Resume to apply');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  return JobData ? (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-12">
        <div className="container px-4 2xl:px-20 mx-auto">
          {/* Hero Job Header */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-8 md:p-12 mb-8 shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className='absolute inset-0 overflow-hidden opacity-10'>
              <div className='absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl'></div>
              <div className='absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl'></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 flex-1">
                {/* Company Logo */}
                <div className="bg-white p-4 rounded-2xl shadow-xl">
                  <img
                    className="h-20 w-20 object-contain"
                    src={JobData.companyId.image}
                    alt={JobData.companyId.name}
                  />
                </div>

                {/* Job Info */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    {JobData.title}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-blue-100">
                    <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <img className="w-4 h-4 invert" src={assets.suitcase_icon} alt="" />
                      {JobData.companyId.name}
                    </span>
                    <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <img className="w-4 h-4 invert" src={assets.location_icon} alt="" />
                      {JobData.location}
                    </span>
                    <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <img className="w-4 h-4 invert" src={assets.person_icon} alt="" />
                      {JobData.level}
                    </span>
                    <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <img className="w-4 h-4 invert" src={assets.money_icon} alt="" />
                      ₹{kconvert.convertTo(JobData.salary)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex flex-col items-start md:items-end gap-3">
                <button
                  onClick={applyHandler}
                  className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Apply Now
                </button>
                <p className="text-blue-100 text-sm">
                  Posted {moment(JobData.date).fromNow()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                  <span className="w-1 h-8 bg-blue-600 rounded-full"></span>
                  Job Description
                </h2>
                <div
                  className="rich-text prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: JobData.description }}
                ></div>
                <button
                  onClick={applyHandler}
                  className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Apply for this position
                </button>
              </div>
            </div>

            {/* Sidebar - More Jobs */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6 text-gray-900">
                  More from {JobData?.companyId?.name}
                </h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {Array.isArray(jobs) &&
                  jobs.filter(
                    (job) =>
                      job._id !== JobData?._id &&
                      job?.companyId?._id === JobData?.companyId?._id
                  ).length > 0 ? (
                    jobs
                      .filter(
                        (job) =>
                          job._id !== JobData?._id &&
                          job?.companyId?._id === JobData?.companyId?._id
                      )
                      .slice(0, 4)
                      .map((job, index) => <JobCard key={job._id || index} job={job} />)
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 font-medium">No other openings</p>
                      <p className="text-gray-400 text-sm mt-1">Check back later for more opportunities</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Applyjob;