const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); 
const router = express.Router();
require("dotenv").config();
// Get all users
router.get("/users", async (req, res) => {
    try {
      const users = await User.findAll(); // Fetch all users
      console.log('Users found:', users);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Get a specific user by ID
  router.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id); // Fetch user by primary key
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Update a user
router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, profile_picture } = req.body;
  
    try {
      // Find the user by ID
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Optionally hash the password if it's being updated
      let updatedData = { name, email, role, profile_picture };
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedData.password = hashedPassword;
      }
  
      // Update the user
      await user.update(updatedData);
      console.log(updatedData)
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  module.exports = router;