const express = require("express");
const { Job } = require("../models");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Get all jobs
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new job
router.post("/jobs",authMiddleware, async (req, res) => {
    const { title, description, category, location ,salary} = req.body; 
    const recruiter_id = req.user.id;
    try {
      const newJob = await Job.create({recruiter_id ,title, description, category, location, salary});
      res.status(201).json({ message: "Job created successfully", newJob });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

// Get a specific job by ID
router.get("/jobs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findByPk(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a job
router.put("/jobs/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const job = await Job.findByPk(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.update(updatedData);
    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;