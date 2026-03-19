const express = require('express');
const Shipment = require('../models/Shipment');

const router = express.Router();

// Admin: create shipment
router.post('/', async (req, res) => {
  try {

    const trackingId = "TRK" + Math.floor(100000 + Math.random() * 900000);

    const shipment = await Shipment.create({
      trackingId: trackingId,
      clientName: req.body.clientName,
      from: req.body.from,
      to: req.body.to,
      status: "Booked",

      timeline: [
        {
          location: req.body.from,
          status: "Shipment Booked"
        }
      ]
    });

    res.status(201).json(shipment);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// GET all shipments
router.get("/", async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Client: track by trackingId
router.get('/track/:id', async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ trackingId: req.params.id });
    if (!shipment) {
      return res.status(404).json({ error: 'Shipment not found' });
    }
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Update shipment status
router.put("/:id", async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        $push: {
          timeline: {
            location: req.body.location,
            status: req.body.status
          }
        }
      },
      { new: true }
    );

    res.json(shipment);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete shipment
router.delete("/:id", async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndDelete(req.params.id);

    res.json({ message: "Shipment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
