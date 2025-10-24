import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js"

// Register a new company
export const registerCompany = async (req, res) => {
  try {
    console.log('📝 === REGISTRATION REQUEST STARTED ===');
    console.log('📦 Body:', req.body);
    console.log('🖼️ File:', req.file);
    
    const { name, email, password } = req.body;
    const imageFile = req.file;

    // Validate all required fields
    if (!name || !email || !password) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ success: false, message: "Name, email, and password are required" });
    }

    if (!imageFile) {
      console.log('❌ No image file uploaded');
      return res.status(400).json({ success: false, message: "Company logo is required" });
    }

    console.log('🔍 Checking if company exists with email:', email);
    
    // Check if company already exists
    const companyExist = await Company.findOne({ email });
    
    if (companyExist) {
      console.log('❌ Company already exists');
      return res.status(400).json({
        success: false,
        message: "Company with this email already exists",
      });
    }

    console.log('✅ Company does not exist, proceeding...');
    console.log('🔐 Hashing password...');
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    
    console.log('✅ Password hashed successfully');
    console.log('☁️ Uploading to Cloudinary...');
    console.log('📂 File path:', imageFile.path);
    console.log('📂 File mimetype:', imageFile.mimetype);
    console.log('📂 File size:', imageFile.size);
    
    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: 'job-portal/companies',
      resource_type: 'auto'
    });
    
    console.log('✅ Cloudinary upload successful');
    console.log('🖼️ Image URL:', imageUpload.secure_url);
    console.log('💾 Creating company in database...');
    
    // Create company
    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });
    
    console.log('✅ Company created successfully');
    console.log('🆔 Company ID:', company._id);
    console.log('🔑 Generating token...');
    
    // Generate token
    const token = generateToken(company._id);
    
    console.log('✅ Token generated');
    console.log('📤 Sending success response');

    res.status(201).json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token,
    });
    
    console.log('✅ === REGISTRATION COMPLETED SUCCESSFULLY ===');
  } catch (error) {
    console.error('❌❌❌ REGISTRATION ERROR ❌❌❌');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error object:', error);
    console.error('❌❌❌ END ERROR ❌❌❌');
    
    res.status(500).json({ success: false, message: error.message });
  }
};

// Company Login
export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Find company by email
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, company.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(company._id);

    // Return success response
    res.status(200).json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token,
    });
  } catch (error) {
    console.error('Login Company Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Company Data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Post a new job
export const postJob = async (req, res) => {
  try {
    const { title, description, location, salary, level, category } = req.body;
    const companyId = req.company._id;

    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });

    await newJob.save();
    res.status(201).json({ success: true, newJob });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Company Job applicants
export const getCompanyJobApplicants = async (req, res) => {
  // Implementation needed
};

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;

    // Fetch all jobs posted by the company
    const jobs = await Job.find({ companyId });

    if (!jobs.length) {
      return res.status(404).json({ success: false, message: "No jobs found" });
    }

    // Map through jobs to attach the number of applicants
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicantCount = await JobApplication.countDocuments({ jobId: job._id });
        return { ...job.toObject(), applicants: applicantCount };
      })
    );

    return res.status(200).json({ success: true, jobsData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Change job application status
export const ChangeJobApplicationStatus = async (req, res) => {
  // Implementation needed
};

// Change job visibility
export const ChangeVisiblity = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
      await job.save();
      return res.json({ success: true, job });
    } else {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};