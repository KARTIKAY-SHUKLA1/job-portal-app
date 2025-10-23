import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocation((prev) =>
      prev.includes(location) ? prev.filter((c) => c !== location) : [...prev, location]
    );
  };

  useEffect(() => {
    const matchingCategory = (job) =>
      selectedCategories.length === 0 || selectedCategories.includes(job.category);

    const matchingLocation = (job) =>
      selectedLocation.length === 0 || selectedLocation.includes(job.location);

    const matchingTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchingSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchingCategory(job) &&
          matchingLocation(job) &&
          matchingTitle(job) &&
          matchingSearchLocation(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocation, searchFilter]);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-12 gap-8">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 lg:sticky lg:top-20 lg:self-start">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          {/* Search Filter from hero component */}
          {isSearched &&
            (searchFilter.title !== "" || searchFilter.location !== "") && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="font-semibold text-base mb-3 text-gray-900">Active Filters</h3>
                <div className="flex flex-wrap gap-2">
                  {searchFilter.title && (
                    <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg text-sm font-medium">
                      {searchFilter.title}
                      <img
                        onClick={() =>
                          setSearchFilter((prev) => ({ ...prev, title: "" }))
                        }
                        className="cursor-pointer w-3 h-3 opacity-60 hover:opacity-100"
                        src={assets.cross_icon}
                        alt="Remove"
                      />
                    </span>
                  )}
                  {searchFilter.location && (
                    <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg text-sm font-medium">
                      {searchFilter.location}
                      <img
                        onClick={() =>
                          setSearchFilter((prev) => ({ ...prev, location: "" }))
                        }
                        className="cursor-pointer w-3 h-3 opacity-60 hover:opacity-100"
                        src={assets.cross_icon}
                        alt="Remove"
                      />
                    </span>
                  )}
                </div>
              </div>
            )}

          <button
            onClick={(e) => setShowFilter((prev) => !prev)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium text-sm transition-colors lg:hidden mb-4"
          >
            {showFilter ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Category filter */}
          <div className={showFilter ? "" : "max-lg:hidden"}>
            <h4 className="font-semibold text-base mb-4 text-gray-900">Categories</h4>
            <ul className="space-y-3">
              {JobCategories.map((category, index) => (
                <li className="flex gap-3 items-center" key={index}>
                  <input
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                    checked={selectedCategories.includes(category)}
                    id={`category-${index}`}
                  />
                  <label 
                    htmlFor={`category-${index}`}
                    className="text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                  >
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Location filter */}
          <div className={showFilter ? "mt-8" : "max-lg:hidden mt-8"}>
            <h4 className="font-semibold text-base mb-4 text-gray-900">Locations</h4>
            <ul className="space-y-3">
              {JobLocations.map((location, index) => (
                <li className="flex gap-3 items-center" key={index}>
                  <input
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    type="checkbox"
                    onChange={() => handleLocationChange(location)}
                    checked={selectedLocation.includes(location)}
                    id={`location-${index}`}
                  />
                  <label
                    htmlFor={`location-${index}`}
                    className="text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                  >
                    {location}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Job listing */}
      <section className="w-full lg:w-3/4 max-lg:px-4">
        <div className="mb-8">
          <h3 className="font-bold text-3xl mb-2 text-gray-900" id="job-list">
            Latest Jobs
          </h3>
          <p className="text-gray-600">
            Discover {filteredJobs.length} opportunities from top companies
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredJobs.slice((CurrentPage - 1) * 6, CurrentPage * 6).map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>

        {/* No results message */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your filters or search criteria</p>
          </div>
        )}

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <a href="#job-list">
              <button
                onClick={() => setCurrentPage(Math.max(CurrentPage - 1, 1))}
                disabled={CurrentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <img className="w-5 h-5" src={assets.left_arrow_icon} alt="Previous" />
              </button>
            </a>

            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
              <a key={index} href="#job-list">
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border font-medium text-sm transition-colors ${
                    CurrentPage === index + 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              </a>
            ))}

            <a href="#job-list">
              <button
                onClick={() =>
                  setCurrentPage(Math.min(CurrentPage + 1, Math.ceil(filteredJobs.length / 6)))
                }
                disabled={CurrentPage === Math.ceil(filteredJobs.length / 6)}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <img className="w-5 h-5" src={assets.right_arrow_icon} alt="Next" />
              </button>
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;