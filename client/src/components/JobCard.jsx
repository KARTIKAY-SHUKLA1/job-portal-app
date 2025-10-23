import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className='group bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden'>
      {/* Gradient overlay on hover */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      
      <div className='relative z-10'>
        <div className='flex justify-between items-start mb-4'> 
          <div className='bg-gray-50 p-3 rounded-xl group-hover:bg-white transition-colors border border-gray-100'>
            <img className='h-10 w-10 object-contain' src={job.companyId.image} alt="Company Logo" />
          </div>
          <span className='bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200'>
            Hiring
          </span>
        </div>
        
        <h4 className='font-bold text-xl mt-4 text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors'>
          {job.title}
        </h4>
        
        <p className='text-gray-500 text-sm mt-1 mb-4'>{job.companyId.name}</p>
        
        <div className='flex items-center flex-wrap gap-2 mb-4'> 
          <span className='bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1'>
            <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
            </svg>
            {job.location}
          </span>
          <span className='bg-purple-50 text-purple-700 border border-purple-100 px-3 py-1.5 rounded-lg text-xs font-semibold'>
            {job.level}
          </span>
          {job.salary && (
            <span className='bg-green-50 text-green-700 border border-green-100 px-3 py-1.5 rounded-lg text-xs font-semibold'>
              {job.salary}
            </span>
          )}
        </div>
      
        <p 
          className='text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6' 
          dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
        ></p>
        
        <div className='flex gap-3'> 
          <button 
            onClick={() => { 
              navigate(`/apply-job/${job._id}`); 
              scrollTo(0, 0);
            }} 
            className='flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 text-sm' 
            type="button"
          >
            Apply Now
          </button>
          
          <button 
            onClick={() => { 
              navigate(`/apply-job/${job._id}`); 
              scrollTo(0, 0); 
            }} 
            className='px-4 py-3 text-gray-700 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 rounded-xl font-semibold transition-all text-sm' 
            type="button"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;