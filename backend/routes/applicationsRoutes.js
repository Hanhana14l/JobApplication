const express = require("express");
const { Application } = require("../models"); // Adjust the path based on your project structure
const router = express.Router();

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
router.post("/applications", async (req, res) => {
    const { userId, jobId, status } = req.body; // Adjust fields based on your database schema
  
    try {
      const newApplication = await Application.create({ userId, jobId, status });
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