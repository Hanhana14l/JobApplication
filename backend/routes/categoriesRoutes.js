const express = require("express");
const { Category } = require("../models");
const router = express.Router();

// Get all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new category
router.post("/categories", async (req, res) => {
    const { name, description } = req.body; // Adjust fields based on your database schema
  
    try {
      const newCategory = await Category.create({ name, description });
      res.status(201).json({ message: "Category created successfully", newCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

// Get a specific category by ID
router.get("/categories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a category
router.put("/categories/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.update(updatedData);
    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;