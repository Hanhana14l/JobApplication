const express = require('express');
const router = express.Router();
const { Op } = require('sequelize'); 
const Job = require('../models/Job');

// Search endpoint
router.get('/search', async (req, res) => {
  const { query } = req.query; // Get the search query from the URL parameters

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    // Search the database for jobs matching the query (adjust to your schema)
    const results = await Job.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } }, // Case-insensitive match for title
          { description: { [Op.iLike]: `%${query}%` } } // Case-insensitive match for description
        ]
      }
    });

    // Return search results
    res.status(200).json({ results });
  } catch (error) {
    console.error('Error searching database:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
