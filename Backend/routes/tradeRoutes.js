const express = require("express");
const router = express.Router();
const {
  getTrades,
  createTrade,
  updateTrade,
  deleteTrade,
} = require("../controllers/tradeController");
const { protect } = require("../middleware/authMiddleware");

// Applying protection to ALL routes below
router.use(protect);

router.route("/").get(getTrades).post(createTrade);
router.route("/:id").put(updateTrade).delete(deleteTrade);

module.exports = router;