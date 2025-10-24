import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
    console.log('🔗 Backend URL:', backendUrl)

    const { user } = useUser()
    const {getToken} = useAuth()

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [isSearched, setIsSearched] = useState(false);

    const [jobs,setJobs] = useState([])

    const[showRecruiterLogin,setShowRecruiterLogin] = useState(false)

    const [companyToken,setCompanyToken] = useState(null)

    const [companyData,setCompanyData] = useState(null)

    const [userData,setUserData] = useState(null)

    const [userApplications,setUserApplications] = useState([])

    // ADD THIS NEW STATE
    const [companyJobs, setCompanyJobs] = useState([])




    // Function to fetch jobs
    const fetchJobs = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/jobs')
            if (data.success) {
                setJobs(data.jobs)
                console.log(data.jobs)
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
        
    }

    // Function to Fetch Company data
    const fetchCompanyData = async () => {
        try {
            
            const {data} = await axios.get(backendUrl+'/api/company/company',{headers:{token:companyToken}})

            if (data.success) {
                setCompanyData(data.company)
                console.log(data)
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    // ADD THIS NEW FUNCTION - Fetch Company Posted Jobs
    const fetchCompanyJobs = async () => {
        try {
            console.log('🔗 Backend URL:', backendUrl)
            console.log('🔑 Company Token:', companyToken ? 'Present' : 'Missing')
            
            const {data} = await axios.get(backendUrl+'/api/company/list-job', {
                headers: { token: companyToken }
            })

            if (data.success) {
                setCompanyJobs(data.jobs || [])
                console.log('✅ Company jobs fetched:', data.jobs)
            } else {
                toast.error(data.message)
            }
            
        } catch (error) {
            console.error('❌ Error fetching company jobs:', error)
            toast.error('Failed to fetch jobs. Please try again later.')
        }
    }

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            const token = await getToken();
            
            console.log('🔑 Token:', token ? 'Present' : 'Missing')
            console.log('🌐 Calling:', backendUrl + '/api/users/user')

            const {data} = await axios.get(backendUrl+'/api/users/user',
                {headers:{Authorization:`Bearer ${token}`}}
            )

            if (data.success) {
                setUserData(data.user)
                console.log('✅ User data fetched successfully')
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error('❌ fetchUserData error:', error)
            console.error('❌ Error response:', error.response)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('companyToken')

        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }

    },[])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
            fetchCompanyJobs() // ADD THIS LINE
        }
    },[companyToken])


    useEffect(() => {
        if(user){
            fetchUserData()
        }
    },[user])

    const value = { 
        setSearchFilter,
        searchFilter,
        isSearched,
        setIsSearched,
        jobs,
        setJobs,
        showRecruiterLogin,
        setShowRecruiterLogin,
        companyToken,
        setCompanyToken,
        companyData,
        setCompanyData,
        backendUrl,
        userData,
        setUserData,
        userApplications,
        setUserApplications,
        companyJobs,          // ADD THIS
        setCompanyJobs,       // ADD THIS
        fetchCompanyJobs      // ADD THIS
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};