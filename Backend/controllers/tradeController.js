const Trade = require("../models/Trade");

// @desc    Get all trades for the logged-in user
// @route   GET /api/trades
exports.getTrades = async (req, res) => {
  try {
    const trades = await Trade.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new trade
// @route   POST /api/trades
exports.createTrade = async (req, res) => {
  try {
    const trade = await Trade.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(trade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a trade
// @route   PUT /api/trades/:id
exports.updateTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);

    if (!trade) return res.status(404).json({ message: "Trade not found" });

    if (trade.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedTrade = await Trade.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTrade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a trade
// @route   DELETE /api/trades/:id
exports.deleteTrade = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);

    if (!trade) return res.status(404).json({ message: "Trade not found" });

    if (trade.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await trade.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};