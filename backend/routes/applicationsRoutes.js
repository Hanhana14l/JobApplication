const express = require("express");
const { Application } = require("../models"); // Adjust the path based on your project structure
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const authMiddleware = require('../middleware/authMiddleware');

// Get all applications
router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.findAll();
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new application
router.post("/applications", upload.fields([{ name: 'resume' }, { name: 'cover_letter' }]), authMiddleware, async (req, res) => {
    const { applicantId, jobId, status } = req.body; 
    const parsedApplicantId = req.user.id;
    const parsedJobId = parseInt(jobId, 10);

    if (isNaN(parsedApplicantId) || isNaN(parsedJobId)) {
      return res.status(400).json({ message: "Invalid applicantId or jobId" });
  }

  const jobExists = await Job.findByPk(parsedJobId);
  if (!jobExists) {
      return res.status(400).json({ message: "Job ID does not exist" });
  }

    const resumePath = req.files?.resume ? req.files.resume[0].path : null;
    const coverLetterPath = req.files?.cover_letter ? req.files.cover_letter[0].path : null;

  
    try {
      const newApplication = await Application.create({ 
        applicantId: parsedApplicantId, 
        jobId: parsedJobId,
        resume: resumePath, 
        status, 
        cover_letter: coverLetterPath});
      res.status(201).json({ message: "Application created successfully", newApplication });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

// Get a specific application by ID
router.get("/applications/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findByPk(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update an application
router.put("/applications/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const application = await Application.findByPk(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    await application.update(updatedData);
    res.status(200).json({ message: "Application updated successfully", application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;