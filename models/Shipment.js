const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema(
  {
    trackingId: { type: String, required: true, unique: true },
    clientName: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    status: {
      type: String,
      enum: ['Booked', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'],
      default: 'Booked',
    },
    weightKg: Number,
    price: Number,

    timeline: [
      {
        location: String,
        status: String,
        time: {
          type: Date,
          default: Date.now
        }
       }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Shipment', shipmentSchema);
