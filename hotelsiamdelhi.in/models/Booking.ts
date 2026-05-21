import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    name: String,

    email: String,

    checkIn: String,

    checkOut: String,

    room: String,

    payment: String,

    status: {
      type: String,
      default: "pending",
    },
  },

  {
    timestamps: true,
  }
);

const Booking =
  mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);

export default Booking;