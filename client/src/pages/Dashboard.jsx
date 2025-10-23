import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem('companyToken');
    setCompanyData(null);
    navigate('/');
  };

  useEffect(() => {
    if (companyData) {
      navigate('/dashboard/manage-jobs');
    }
  }, [companyData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Premium Navbar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              onClick={() => navigate('/')}
              className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
              src={assets.logo}
              alt="Hyrify"
            />
            <span className="hidden sm:block w-px h-8 bg-gray-300"></span>
            <span className="hidden sm:block text-gray-600 font-medium">Recruiter Dashboard</span>
          </div>

          {companyData && (
            <div className="flex items-center gap-4">
              <p className="max-sm:hidden text-gray-700 font-medium">
                Welcome, <span className="text-blue-600">{companyData.name}</span>
              </p>
              <div className="relative group">
                <div className="w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden cursor-pointer ring-2 ring-blue-100">
                  <img className="w-full h-full object-cover" src={companyData.image} alt="" />
                </div>
                <div className="absolute hidden group-hover:block top-12 right-0 z-10 min-w-[160px]">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden mt-2">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 py-3 px-4 hover:bg-red-50 text-red-600 font-medium transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Premium Sidebar */}
        <div className="w-64 max-sm:w-20 bg-white border-r border-gray-200 min-h-screen sticky top-16">
          <nav className="p-4">
            <ul className="space-y-2">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                to="/dashboard/add-job"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="max-sm:hidden">Add Job</span>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                to="/dashboard/manage-jobs"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="max-sm:hidden">Manage Jobs</span>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                to="/dashboard/view-applications"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="max-sm:hidden">Applications</span>
              </NavLink>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;