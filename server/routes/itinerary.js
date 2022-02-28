const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/Itinerary", async(req, res) => {
    const data = req.body;
    const user_id = req.params;
    return db
      .query(
        `INSERT INTO itinerary (placename, user_id, notes) VALUES ($1, $2, $3) RETURNING *;`,
        [data.placename, user_id, data.notes]
      )
      .then((data) => {
        const itinerary = data.rows;
        res.json({ itinerary });
        console.log(itinerary);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
};
